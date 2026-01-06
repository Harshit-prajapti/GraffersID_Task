# Tailwind CSS v4 - Configuration Notes

## Important: Tailwind v4 Changes

The project uses **Tailwind CSS v4**, which has significant changes from v3:

### Key Differences

1. **No `tailwind.config.js` needed** - Configuration is done via CSS
2. **Import syntax changed** - Use `@import "tailwindcss"` instead of `@tailwind` directives
3. **No PostCSS config needed** - Tailwind v4 handles this automatically

### Current Setup

**File: `src/index.css`**
```css
@import "tailwindcss";

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

/* Custom component classes */
.btn-primary { ... }
.btn-secondary { ... }
.card { ... }
.input-field { ... }
```

### If Styles Don't Apply

1. **Restart the dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Verify import in main.jsx:**
   ```javascript
   import './index.css'  // Must be present
   ```

### Customization (Tailwind v4 Style)

Add custom theme values directly in CSS:

```css
@import "tailwindcss";

@theme {
  --color-primary: #0ea5e9;
  --font-family-display: 'Inter', sans-serif;
}
```

### Documentation

- [Tailwind v4 Docs](https://tailwindcss.com/docs/v4-beta)
- Migration from v3 to v4 requires syntax updates
