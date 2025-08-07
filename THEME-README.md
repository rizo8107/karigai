# Dynamic Theme System for Karigai

This document explains how to set up and use the dynamic theme system that allows you to change your website's color scheme from PocketBase without modifying code.

## Overview

The dynamic theme system allows you to:
- Store theme colors in PocketBase
- Switch between different themes (e.g., Warm Brown, Teal)
- Apply theme changes site-wide without code modifications
- Maintain compatibility with light/dark mode

## Setup Instructions

### 1. Create the Theme Collection in PocketBase

Run the setup script to create the `theme_settings` collection and add default themes:

```bash
npm run setup:theme
```

This will:
- Create a `theme_settings` collection in PocketBase
- Add the Warm Brown theme (active)
- Add the Teal theme (inactive)

### 2. Verify in PocketBase Admin

1. Log in to your PocketBase admin panel
2. Navigate to the `theme_settings` collection
3. You should see two themes: "Warm Brown" (active) and "Teal" (inactive)

## Managing Themes in PocketBase

### Viewing Themes
- Open the PocketBase admin panel
- Navigate to the `theme_settings` collection
- View all available themes

### Creating a New Theme
1. In the PocketBase admin panel, click "Create new record" in the `theme_settings` collection
2. Fill in the following fields:
   - `name`: A descriptive name for your theme
   - `is_active`: Set to true to activate this theme (will deactivate all others)
   - `primary_color`: Hex color code (e.g., #a67b5c)
   - `primary_color_hover`: Slightly darker hex color for hover states
   - `primary_color_hsl`: HSL format for Tailwind (e.g., "26 29% 51%")
   - `accent_color`: Secondary color hex code
   - `accent_color_hsl`: HSL format for the accent color
   - `text_on_primary`: Text color on primary backgrounds (usually #ffffff)
   - `dark_mode_primary_color_hsl`: HSL value for dark mode
   - `dark_mode_accent_color_hsl`: HSL value for dark mode accent

### Activating a Theme
1. Edit the theme you want to activate
2. Set `is_active` to true
3. Save the record
4. The system will automatically deactivate all other themes

## How It Works

1. The `DynamicThemeProvider` in `src/contexts/ThemeContext.tsx` fetches the active theme from PocketBase
2. It applies the theme colors to CSS variables
3. All components using these CSS variables will automatically update
4. The theme provider works alongside the existing light/dark mode system

## HSL Color Format

For the HSL color fields, use the format: `"H S% L%"` where:
- H is the hue (0-360)
- S is the saturation percentage (0-100)
- L is the lightness percentage (0-100)

Example: `"26 29% 51%"`

## Troubleshooting

If theme changes aren't appearing:
1. Check that the theme is set to active in PocketBase
2. Clear your browser cache
3. Verify the application is using the latest theme data by checking the console logs
4. Ensure your components are using the CSS variables and not hardcoded colors

## Need Help?

If you need to modify the theme system or have questions, refer to:
- `src/contexts/ThemeContext.tsx` - The main theme provider
- `src/lib/pocketbase.ts` - Theme API functions
- `scripts/setupTheme.js` - Theme setup script
