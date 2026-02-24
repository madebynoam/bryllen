// Landing Page tokens — shared across all 5 LP directions

export const LP = {
  // Shared values
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  mono: '"SF Mono", "Fira Code", "Fira Mono", Menlo, monospace',
  maxWidth: 1200,
  sectionPadding: 80,
  cardRadius: 16,
  pillRadius: 100,

  // Spacing (4px grid)
  s4: 4,
  s8: 8,
  s12: 12,
  s16: 16,
  s20: 20,
  s24: 24,
  s32: 32,
  s40: 40,
  s48: 48,
  s64: 64,
  s80: 80,

  // Type scale
  heroSize: 72,
  h1Size: 48,
  h2Size: 36,
  h3Size: 24,
  bodySize: 17,
  captionSize: 14,
  labelSize: 12,
}

// Dark palette (Noir, Aurora, Shift hero)
// Rule: no pure white (#FFFFFF) or pure black (#000000)
export const Dark = {
  bg: '#0B0B0B',
  bgSubtle: '#121212',
  surface: '#1A1A1A',
  surfaceHover: '#222222',
  border: '#2A2A2A',
  borderSubtle: '#1F1F1F',
  text: '#F5F4F3',
  textSecondary: '#888888',
  textTertiary: '#555555',
  accent: '#E8590C',
  accentHover: '#FF6B1A',
  accentMuted: 'rgba(232, 89, 12, 0.15)',
}

// Light palette (Canvas, Shift content, Bento mix)
// Rule: no pure white (#FFFFFF) or pure black (#000000)
export const Light = {
  bg: '#FAFAF9',
  bgSubtle: '#F5F5F4',
  surface: '#FAFAF9',
  surfaceHover: '#F0F0EF',
  border: '#E5E4E1',
  borderSubtle: '#EEEDEB',
  text: '#1A1918',
  textSecondary: '#6B6966',
  textTertiary: '#9C9A97',
  accent: '#E8590C',
  accentHover: '#CF4F0B',
  accentMuted: 'rgba(232, 89, 12, 0.1)',
}

// Spring easing CSS approximation
export const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
export const springGentle = 'cubic-bezier(0.22, 1.0, 0.36, 1)'
