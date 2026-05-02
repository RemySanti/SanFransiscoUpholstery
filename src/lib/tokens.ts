/** Aligns with `src/design-system/tokens.css` (Dark Systems · Glass Editorial). */
export const tokens = {
  colors: {
    ink: '#0a0a09',
    foreground: '#ede8df',
    cream: '#f5f0e8',
    sage: '#8a9e7e',
    sageLight: '#a8be9a',
  },
  typography: {
    sizeXL: 'clamp(2.25rem, 9vw, 5rem)',
    sizeLG: 'clamp(1.55rem, 5.5vw, 3rem)',
    sizeMD: '1.4rem',
    sizeSM: '1rem',
    lineHeightTight: '1.1',
    lineHeightRelaxed: '1.8',
    letterSpacing: '0.02em',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
} as const
