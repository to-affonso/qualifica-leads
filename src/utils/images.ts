/**
 * Image utilities and constants for the Qualifica Leads platform
 */

// Base paths for different image types
export const IMAGE_PATHS = {
  logos: '/images/logos',
  icons: '/images/icons',
  avatars: '/images/avatars',
  illustrations: '/images/illustrations',
} as const;

// Helper function to get image path
export const getImagePath = (category: keyof typeof IMAGE_PATHS, filename: string): string => {
  return `${IMAGE_PATHS[category]}/${filename}`;
};

// Common image assets
export const IMAGES = {
  // Logos
  LOGO_MAIN: getImagePath('logos', 'qualificaleadsBrand.svg'),
  LOGO_ICON: getImagePath('logos', 'logo-icon.svg'),
  
  // Icons
  ICON_NOTIFICATION: getImagePath('icons', 'notification.svg'),
  ICON_APPS: getImagePath('icons', 'iconApps.svg'),
  ICON_KEY: getImagePath('icons', 'iconKey.svg'),
  ICON_SEARCH: getImagePath('icons', 'search.svg'),
  LOGO_LOFT: getImagePath('icons', 'logoLoft.svg'),
  
  // Avatars
  AVATAR_PLACEHOLDER: getImagePath('avatars', 'placeholder.png'),
  AVATAR_DEFAULT: getImagePath('avatars', 'default.svg'),
  
  // Illustrations
  EMPTY_STATE: getImagePath('illustrations', 'empty-state.svg'),
  LOADING: getImagePath('illustrations', 'loading.svg'),
} as const;

// Avatar sizes
export const AVATAR_SIZES = {
  small: 24,
  medium: 32,
  large: 48,
  xlarge: 64,
} as const;

// Icon sizes
export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;