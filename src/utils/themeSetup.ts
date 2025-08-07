import { createTheme, ThemeSettings } from '@/lib/pocketbase';

/**
 * Creates the default warm brown theme in PocketBase
 * Run this function once to set up your initial theme
 */
export async function setupWarmBrownTheme(): Promise<ThemeSettings | null> {
  try {
    // Create the warm brown theme
    const warmBrownTheme = {
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
    };
    
    const result = await createTheme(warmBrownTheme);
    console.log('Warm Brown theme created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating warm brown theme:', error);
    return null;
  }
}

/**
 * Creates the previous teal theme in PocketBase
 * This is useful if you want to switch back to the original theme
 */
export async function setupTealTheme(): Promise<ThemeSettings | null> {
  try {
    // Create the teal theme
    const tealTheme = {
      name: 'Teal',
      is_active: false, // Set to false since we're using warm brown as default
      primary_color: '#32a1a1',
      primary_color_hover: '#1a7a7a',
      primary_color_hsl: '180 69% 35%',
      accent_color: '#7cc0c0',
      accent_color_hsl: '180 27% 65%',
      text_on_primary: '#ffffff',
      dark_mode_primary_color_hsl: '180 27% 35%',
      dark_mode_accent_color_hsl: '180 27% 25%'
    };
    
    const result = await createTheme(tealTheme);
    console.log('Teal theme created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating teal theme:', error);
    return null;
  }
}
