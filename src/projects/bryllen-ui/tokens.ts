function oklch(l: number, c: number, h: number): string {
  return `oklch(${l} ${c} ${h})`
}

export const N = {
  chrome:     oklch(0.985, 0.000, 90),
  chromeSub:  oklch(0.955, 0.003, 80),
  canvas:     oklch(0.972, 0.001, 197),
  card:       oklch(0.993, 0.003, 80),
  border:     oklch(0.895, 0.005, 80),
  borderSoft: oklch(0.925, 0.003, 80),
  txtPri:     oklch(0.180, 0.005, 80),
  txtSec:     oklch(0.380, 0.005, 80),
  txtTer:     oklch(0.540, 0.005, 80),
  txtFaint:   oklch(0.660, 0.003, 80),
}

export const A = {
  accent:  oklch(0.300, 0.005, 80),
  hover:   oklch(0.400, 0.005, 80),
  muted:   oklch(0.920, 0.003, 80),
  strong:  oklch(0.220, 0.005, 80),
}

export const S = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 24,
}

export const R = {
  control:  4,
  card:     8,
  panel:   12,
  pill:    20,
}

export const T = {
  label:   9,
  pill:   10,
  caption: 11,
  body:   12,
  title:  13,
}

export const ICON = {
  sm:  12,
  md:  14,
  lg:  16,
}

export const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
