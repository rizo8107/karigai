import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeSettings, getActiveTheme } from '@/lib/pocketbase';

type ThemeContextType = {
  theme: ThemeSettings | null;
  loading: boolean;
  error: string | null;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  loading: true,
  error: null,
});

export const useDynamicTheme = () => useContext(ThemeContext);

/**
 * DynamicThemeProvider fetches color theme settings from PocketBase
 * and applies them to CSS variables while working alongside the existing
 * light/dark mode theme system
 */
export const DynamicThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to check if theme is already applied
  const isThemeAlreadyApplied = (theme: ThemeSettings): boolean => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const currentPrimary = styles.getPropertyValue('--primary').trim();
    
    // Compare current CSS variables with theme values
    return currentPrimary === theme.primary_color_hsl.trim();
  };
  
  // Function to apply theme to CSS variables
  const applyTheme = (theme: ThemeSettings) => {
    // Check if theme is already applied to avoid unnecessary updates
    if (isThemeAlreadyApplied(theme)) {
      console.log('Theme already applied:', theme.name);
      setTheme(theme);
      return;
    }
    
    const root = document.documentElement;
    
    // Store the original CSS variables for logging
    const originalStyles = getComputedStyle(root);
    const originalPrimary = originalStyles.getPropertyValue('--primary').trim();
    
    console.log('Applying theme:', theme.name, 
      { from: originalPrimary, to: theme.primary_color_hsl });
    
    // Only override CSS variables if they don't match the theme
    if (originalPrimary !== theme.primary_color_hsl.trim()) {
      // Apply theme colors to CSS variables
      root.style.setProperty('--primary', theme.primary_color_hsl);
      root.style.setProperty('--primary-foreground', theme.text_on_primary);
      root.style.setProperty('--accent', theme.accent_color_hsl);
      
      // Apply dark mode variables via CSS class
      const darkModeStyle = document.createElement('style');
      darkModeStyle.innerHTML = `
        .dark {
          --primary: ${theme.dark_mode_primary_color_hsl};
          --accent: ${theme.dark_mode_accent_color_hsl};
        }
      `;
      
      // Remove any previous dynamic theme styles
      const existingStyle = document.getElementById('dynamic-theme-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Add the new style element
      darkModeStyle.id = 'dynamic-theme-styles';
      document.head.appendChild(darkModeStyle);
    }
    
    setTheme(theme);
  };

  // Fetch theme on component mount
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        setLoading(true);
        console.log('Fetching theme from PocketBase...');
        const activeTheme = await getActiveTheme();
        
        if (activeTheme) {
          console.log('Found active theme in PocketBase:', activeTheme.name);
          applyTheme(activeTheme);
        } else {
          console.log('No active theme found in PocketBase, using default');
          // If no active theme, use default warm brown that matches CSS variables
          const defaultTheme: ThemeSettings = {
            id: 'default',
            created: '',
            updated: '',
            collectionId: '',
            collectionName: '',
            name: 'Warm Brown',
            is_active: true,
            primary_color: '#a67b5c',
            primary_color_hover: '#8a6549',
            primary_color_hsl: '26 29% 51%', // Exactly matches CSS variable in index.css
            accent_color: '#c4a992',
            accent_color_hsl: '26 29% 65%', // Exactly matches CSS variable in index.css
            text_on_primary: '#ffffff',
            dark_mode_primary_color_hsl: '26 29% 35%', // Exactly matches CSS variable in index.css
            dark_mode_accent_color_hsl: '26 29% 25%' // Exactly matches CSS variable in index.css
          };
          applyTheme(defaultTheme);
        }
      } catch (err) {
        console.error('Error fetching theme:', err);
        setError('Failed to load theme settings');
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, loading, error }}>
      {children}
    </ThemeContext.Provider>
  );
};
