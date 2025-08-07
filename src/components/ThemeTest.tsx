import { useDynamicTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

/**
 * A simple component to test that the theme system is working correctly
 * This displays the current theme information and CSS variables
 */
export const ThemeTest = () => {
  const { theme, loading, error } = useDynamicTheme();
  
  // Get the current CSS variables from the document root
  const getCssVariables = () => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    
    return {
      primary: styles.getPropertyValue('--primary').trim(),
      primaryForeground: styles.getPropertyValue('--primary-foreground').trim(),
      accent: styles.getPropertyValue('--accent').trim(),
    };
  };
  
  const cssVars = getCssVariables();
  
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Theme System Test</h2>
      
      {loading ? (
        <p>Loading theme...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Active Theme:</h3>
            <p>{theme?.name || 'No theme active'}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Theme Colors:</h3>
            {theme ? (
              <ul className="space-y-1">
                <li>Primary: {theme.primary_color} (HSL: {theme.primary_color_hsl})</li>
                <li>Accent: {theme.accent_color} (HSL: {theme.accent_color_hsl})</li>
                <li>Text on Primary: {theme.text_on_primary}</li>
              </ul>
            ) : (
              <p>No theme data available</p>
            )}
          </div>
          
          <div>
            <h3 className="font-medium">Current CSS Variables:</h3>
            <ul className="space-y-1">
              <li>--primary: {cssVars.primary}</li>
              <li>--primary-foreground: {cssVars.primaryForeground}</li>
              <li>--accent: {cssVars.accent}</li>
            </ul>
          </div>
          
          <div className="pt-4 space-y-2">
            <h3 className="font-medium">UI Elements with Theme Colors:</h3>
            <div className="flex flex-wrap gap-2">
              <Button>Primary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <div className="p-4 bg-primary text-primary-foreground rounded">
                Primary Background
              </div>
              <div className="p-4 bg-accent text-accent-foreground rounded">
                Accent Background
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeTest;
