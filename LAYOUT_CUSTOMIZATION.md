# Layout Customization Guide

## Header Customization

### Using a Logo Instead of Text Title

To use a logo image instead of the text title in the header:

1. **Add your logo file** to the `quartz/static/` folder (e.g., `logo.png`)

2. **Update `quartz.layout.ts`** to use the logo:

```typescript
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle({ logo: "static/logo.png" }), // Add logo option
    Component.Search(),
    Component.Darkmode(),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/webplusangels/dumb-tech-blogger",
    },
  }),
}
```

### Logo Specifications

- **Recommended height**: 40-50px (will auto-scale to max-height: 2.5rem)
- **Recommended max width**: 200px
- **Supported formats**: PNG, SVG, JPG, WEBP
- **Best practice**: Use a transparent PNG or SVG for best results

## Header Layout

The header now uses a centered layout:

- **Logo/Title**: Centered in the header
- **Dark mode toggle**: Positioned on the right side
- **Search**: Moved to the left sidebar for better access

### Responsive Behavior

- **Desktop**: Horizontal layout with logo centered
- **Mobile**: Logo at center with darkmode on the right

## Grid Layout

The page now uses a proper grid layout:

```
┌─────────────────────────────────────┐
│           HEADER (centered)          │
├──────────┬────────────┬──────────────┤
│          │            │              │
│  LEFT    │   CENTER   │    RIGHT     │
│ SIDEBAR  │  CONTENT   │   SIDEBAR    │
│ [Search] │            │              │
│ [Explorer]            │              │
│          │            │              │
├──────────┴────────────┴──────────────┤
│          FOOTER (centered)           │
└─────────────────────────────────────┘
```

### Key Improvements

1. Header and footer are now part of the grid system
2. They don't overlap with sidebar content
3. Search moved to left sidebar for full-width access
4. Footer is properly nested with `<footer>` tag inside `.page-footer`
5. Footer content (p and ul) are well-organized and centered

## Custom Styling

All custom styles are in `quartz/styles/custom.scss`:

- Header styling with centered logo (2D or 3D)
- Search in left sidebar with full width
- Improved search modal positioning
- Better responsive breakpoints
- Enhanced footer styling with proper nesting

## Example: Adding Your Logo

### 2D Image Logo

1. Save your logo as `quartz/static/logo.png`
2. Update `quartz.layout.ts`:

   ```typescript
   Component.PageTitle({ logo: "static/logo.png" })
   ```

3. Rebuild: `npx quartz build`

### 3D Model Logo

1. Save your 3D model as `quartz/static/logo.glb`
2. Update `quartz.layout.ts`:

   ```typescript
   Component.PageTitle({
     logo3d: "static/logo.glb",
     rotationSpeed: 15,
   })
   ```

3. Rebuild: `npx quartz build`

### Example Models to Try

- **Spinning cube**: Simple geometric shape
- **Logo extrusion**: Your 2D logo extruded to 3D
- **Icon model**: Small optimized 3D icon

## Reverting to Text Title

To go back to using text instead of a logo, simply remove the logo option:

```typescript
Component.PageTitle() // No logo parameter
```

The page title from `quartz.config.ts` (`pageTitle: "Dumb Tech Blogger"`) will be used instead.
