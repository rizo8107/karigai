import React, { createContext, useContext, useEffect, useState } from 'react';
import { type ThemeSettings, type ThemeData, getActiveThemeData } from '@/lib/pocketbase';

type ThemeContextType = {
  theme: ThemeSettings | null;
  themeData: ThemeData | null;
  loading: boolean;
  error: string | null;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  themeData: null,
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
  const [themeData, setThemeData] = useState<ThemeData | null>(null);
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
      const toHsl = (v: string | undefined | null) => {
        if (!v) return '0 0% 100%';
        if (v.startsWith('#')) {
          // Convert hex to HSL string "H S% L%"
          const r = parseInt(v.slice(1, 3), 16) / 255;
          const g = parseInt(v.slice(3, 5), 16) / 255;
          const b = parseInt(v.slice(5, 7), 16) / 255;
          const max = Math.max(r, g, b), min = Math.min(r, g, b);
          let h = 0, s = 0, l = (max + min) / 2;
          if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
          }
          return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
        }
        return v; // Assume already HSL
      };
      root.style.setProperty('--primary-foreground', toHsl(theme.text_on_primary));
      root.style.setProperty('--accent', theme.accent_color_hsl);
      // Apply radius from local preference if any
      const savedRadius = localStorage.getItem('theme_radius');
      if (savedRadius) {
        root.style.setProperty('--radius', savedRadius);
      }
      
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

  // Fetch theme on component mount and on 'theme:reload'
  useEffect(() => {
    const fetchAndApply = async () => {
      try {
        setLoading(true);
        console.log('Fetching active theme data...');
        const data = await getActiveThemeData();
        console.log('Retrieved theme data:', data);
        if (data) {
          setThemeData(data);
          applyTheme({
            id: 'active', created: '', updated: '', collectionId: '', collectionName: '',
            name: 'Active', is_active: true,
            primary_color: data.primary?.hex || '#15803d',
            primary_color_hover: data.primary?.hoverHex || '#8a6549',
            primary_color_hsl: data.primary?.hsl || '142 72% 28%',
            accent_color: data.accent?.hex || '#86efac',
            accent_color_hsl: data.accent?.hsl || '142 71% 80%',
            text_on_primary: data.textOnPrimary || '#ffffff',
            dark_mode_primary_color_hsl: data.dark?.primaryHsl || '142 50% 24%',
            dark_mode_accent_color_hsl: data.dark?.accentHsl || '142 40% 30%',
          } as unknown as ThemeSettings);
        } else {
          console.log('No theme data found, using green defaults');
          // Set default green theme data when no data is found
          const defaultGreenTheme = {
            primary: { hex: '#15803d', hsl: '142 72% 28%', hoverHex: '#8a6549' },
            accent: { hex: '#86efac', hsl: '142 71% 80%' },
            textOnPrimary: '#ffffff',
            dark: { primaryHsl: '142 50% 24%', accentHsl: '142 40% 30%' },
            radiusRem: '0.5rem',
            productCard: {
              corner: 'rounded', shadow: 'soft', showWishlist: true,
              showTags: true, showDescription: true, ctaLabel: 'Add to Cart',
              ctaStyle: 'pill', imageRatio: 'portrait', titleSize: 'md',
              descSize: 'sm', ctaSize: 'md', spacing: 'compact'
            }
          };
          setThemeData(defaultGreenTheme);
        }
      } catch (err) {
        console.error('Error fetching theme:', err);
        setError('Failed to load theme settings');
      } finally {
        setLoading(false);
      }
    };

    fetchAndApply();
    const handler = () => {
      console.log('Theme reload event triggered');
      fetchAndApply();
    };
    window.addEventListener('theme:reload', handler);
    return () => window.removeEventListener('theme:reload', handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeData, loading, error }}>
      {children}
    </ThemeContext.Provider>
  );
};
