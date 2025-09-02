export function toRGBA(hex: string, alpha = 1) {
    const { r, g, b } = hexToRgb(hex)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  
  export function hexToRgb(hex: string) {
    const clean = hex.replace("#", "")
    const full =
      clean.length === 3
        ? clean
            .split("")
            .map((c) => c + c)
            .join("")
        : clean
    const num = Number.parseInt(full || "000000", 16)
    const r = (num >> 16) & 255
    const g = (num >> 8) & 255
    const b = num & 255
    return { r, g, b }
  }
  
  export function mix(hex1: string, hex2: string, amount = 0.5) {
    const a = hexToRgb(hex1)
    const b = hexToRgb(hex2)
    const r = Math.round(a.r + (b.r - a.r) * amount)
    const g = Math.round(a.g + (b.g - a.g) * amount)
    const b2 = Math.round(a.b + (b.b - a.b) * amount)
    return `#${((1 << 24) + (r << 16) + (g << 8) + b2).toString(16).slice(1)}`
  }
  
  export function isDark(hex: string) {
    const { r, g, b } = hexToRgb(hex)
    // relative luminance approximation
    const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    return l < 0.5
  }
  