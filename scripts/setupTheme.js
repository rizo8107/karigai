// Theme setup script for PocketBase
// Run with: node scripts/setupTheme.js

const PocketBase = require('pocketbase/cjs');
require('dotenv').config();

// Get PocketBase URL from environment or use default
const pocketbaseUrl = process.env.VITE_POCKETBASE_URL || 'http://localhost:8090';
console.log(`Connecting to PocketBase at: ${pocketbaseUrl}`);

// Initialize PocketBase client
const pb = new PocketBase(pocketbaseUrl);

// Collection name
const COLLECTION_NAME = 'theme_settings';

async function setupThemeCollection() {
  try {
    console.log('Checking if theme_settings collection exists...');
    
    // Check if collection exists
    try {
      await pb.collections.getOne(COLLECTION_NAME);
      console.log('Collection already exists.');
    } catch (error) {
      // Create collection if it doesn't exist
      if (error.status === 404) {
        console.log('Creating theme_settings collection...');
        
        await pb.collections.create({
          name: COLLECTION_NAME,
          type: 'base',
          schema: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'is_active',
              type: 'bool',
              required: true,
              default: false,
            },
            {
              name: 'primary_color',
              type: 'text',
              required: true,
            },
            {
              name: 'primary_color_hover',
              type: 'text',
              required: true,
            },
            {
              name: 'primary_color_hsl',
              type: 'text',
              required: true,
            },
            {
              name: 'accent_color',
              type: 'text',
              required: true,
            },
            {
              name: 'accent_color_hsl',
              type: 'text',
              required: true,
            },
            {
              name: 'text_on_primary',
              type: 'text',
              required: true,
            },
            {
              name: 'dark_mode_primary_color_hsl',
              type: 'text',
              required: true,
            },
            {
              name: 'dark_mode_accent_color_hsl',
              type: 'text',
              required: true,
            }
          ]
        });
        console.log('Collection created successfully!');
      } else {
        throw error;
      }
    }

    // Create themes
    await createThemes();
    
    console.log('Theme setup completed successfully!');
  } catch (error) {
    console.error('Error setting up theme collection:', error);
  }
}

async function createThemes() {
  try {
    // Check if we already have themes
    const existingThemes = await pb.collection(COLLECTION_NAME).getList(1, 10);
    
    if (existingThemes.items.length > 0) {
      console.log(`Found ${existingThemes.items.length} existing themes.`);
      return;
    }
    
    console.log('Creating default themes...');
    
    // Create warm brown theme (active)
    await pb.collection(COLLECTION_NAME).create({
      name: 'Warm Brown',
      is_active: true,
      primary_color: '#a67b5c',
      primary_color_hover: '#8a6549',
      primary_color_hsl: '26 29% 51%',
      accent_color: '#c4a992',
      accent_color_hsl: '26 29% 65%',
      text_on_primary: '#ffffff',
      dark_mode_primary_color_hsl: '26 29% 35%',
      dark_mode_accent_color_hsl: '26 29% 25%'
    });
    console.log('Created Warm Brown theme (active)');
    
    // Create teal theme (inactive)
    await pb.collection(COLLECTION_NAME).create({
      name: 'Teal',
      is_active: false,
      primary_color: '#32a1a1',
      primary_color_hover: '#1a7a7a',
      primary_color_hsl: '180 69% 35%',
      accent_color: '#7cc0c0',
      accent_color_hsl: '180 27% 65%',
      text_on_primary: '#ffffff',
      dark_mode_primary_color_hsl: '180 27% 35%',
      dark_mode_accent_color_hsl: '180 27% 25%'
    });
    console.log('Created Teal theme (inactive)');
    
  } catch (error) {
    console.error('Error creating themes:', error);
    throw error;
  }
}

// Run the setup
setupThemeCollection();
