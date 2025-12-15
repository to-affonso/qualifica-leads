# Images Directory Structure

This directory contains all static images and assets for the Qualifica Leads platform.

## Directory Structure

```
public/images/
├── logos/          # Platform logos and brand assets
├── icons/          # Custom icons and SVG files
├── avatars/        # User avatar images and placeholders
└── illustrations/  # Illustrations and graphics
```

## Usage Guidelines

### Logos (`/logos/`)
- Main platform logo
- Logo variations (light/dark themes)
- Partner/company logos
- Favicon assets

### Icons (`/icons/`)
- Custom SVG icons
- Menu icons
- Status indicators
- Action buttons icons

### Avatars (`/avatars/`)
- Default user avatars
- Placeholder images
- Profile pictures

### Illustrations (`/illustrations/`)
- Empty states
- Onboarding graphics
- Marketing materials
- Background images

## File Naming Convention

Use descriptive, lowercase names with hyphens:
- `logo-main.svg`
- `icon-notification.svg`
- `avatar-placeholder.png`
- `illustration-empty-state.svg`

## Recommended Formats

- **Logos**: SVG (preferred) or PNG with transparent background
- **Icons**: SVG for scalability
- **Avatars**: JPG or PNG (32x32, 64x64, 128x128)
- **Illustrations**: SVG or PNG

## Usage in Components

```tsx
// Import from public directory
<img src="/images/logos/logo-main.svg" alt="Qualifica Leads" />

// Or using Next.js Image component
import Image from 'next/image';
<Image src="/images/icons/notification.svg" width={24} height={24} alt="Notifications" />
```