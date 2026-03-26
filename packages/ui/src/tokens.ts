// ============================================================
// @hub-starter/ui — Design Token Source of Truth
// ============================================================
// All colors stored as raw HSL values: "H S% L%"
// Consumers wrap these in hsl() as needed.
// ============================================================

export const tokens = {
  light: {
    background: "0 0% 99.2157%",
    foreground: "0 0% 0%",
    card: "0 0% 99.2157%",
    cardForeground: "0 0% 0%",
    popover: "0 0% 98.8235%",
    popoverForeground: "0 0% 0%",
    primary: "96 16.129% 69.6078%",
    primaryForeground: "0 0% 0%",
    secondary: "214.2857 24.1379% 94.3137%",
    secondaryForeground: "0 0% 3.1373%",
    muted: "0 0% 96.0784%",
    mutedForeground: "0 0% 52.9412%",
    accent: "98.4 16.3399% 30%",
    accentForeground: "0 0% 100%",
    destructive: "357.6623 75.4902% 40%",
    destructiveForeground: "0 0% 100%",
    border: "240 17.0732% 91.9608%",
    input: "0 0% 92.1569%",
    ring: "96 16.129% 69.6078%",
    chart1: "148.0952 53.3898% 53.7255%",
    chart2: "257.9412 100% 60%",
    chart3: "24.8571 98.1308% 58.0392%",
    chart4: "217.0787 76.7241% 54.5098%",
    chart5: "0 0% 45.4902%",
    sidebar: "210 42.8571% 97.2549%",
    sidebarForeground: "0 0% 0%",
    sidebarPrimary: "0 0% 0%",
    sidebarPrimaryForeground: "0 0% 100%",
    sidebarAccent: "100 17.6471% 90%",
    sidebarAccentForeground: "0 0% 0%",
    sidebarBorder: "0 0% 92.1569%",
    sidebarRing: "96 16.129% 69.6078%",
  },

  dark: {
    background: "30 40% 1.9608%",
    foreground: "30 14.2857% 97.2549%",
    card: "37.5 33.3333% 4.7059%",
    cardForeground: "30 14.2857% 97.2549%",
    popover: "40 37.5% 3.1373%",
    popoverForeground: "30 14.2857% 97.2549%",
    primary: "96 16.129% 69.6078%",
    primaryForeground: "30 33.3333% 1.1765%",
    secondary: "35 18.75% 12.549%",
    secondaryForeground: "37.5 14.2857% 89.0196%",
    muted: "36 20% 9.8039%",
    mutedForeground: "37.5 3.5398% 55.6863%",
    accent: "98.4 16.3399% 30%",
    accentForeground: "0 0% 100%",
    destructive: "357.6623 75.4902% 40%",
    destructiveForeground: "30 14.2857% 97.2549%",
    border: "39 27.027% 14.5098%",
    input: "35 30% 7.8431%",
    ring: "96 16.129% 69.6078%",
    chart1: "96.0976 80.3922% 30%",
    chart2: "96.0938 62.7451% 40%",
    chart3: "96.0976 48.2353% 50%",
    chart4: "95.8763 63.3987% 70%",
    chart5: "96 16.129% 69.6078%",
    sidebar: "30 33.3333% 1.1765%",
    sidebarForeground: "36 14.2857% 93.1373%",
    sidebarPrimary: "96 16.129% 69.6078%",
    sidebarPrimaryForeground: "30 33.3333% 1.1765%",
    sidebarAccent: "98.4 16.3399% 30%",
    sidebarAccentForeground: "0 0% 100%",
    sidebarBorder: "37.5 25.8065% 12.1569%",
    sidebarRing: "96 16.129% 69.6078%",
  },
} as const;

// ============================================================
// Non-color tokens
// ============================================================

export const fonts = {
  sans: "Plus Jakarta Sans, sans-serif",
  serif: "Lora, serif",
  mono: "IBM Plex Mono, monospace",
} as const;

export const radius = "0.6rem";
export const spacing = "0.27rem";
export const trackingNormal = "-0.025em";

export const shadows = {
  "2xs": "0.5px 0.5px 0px 0px hsl(0 0% 0% / 0.03)",
  xs: "0.5px 0.5px 0px 0px hsl(0 0% 0% / 0.03)",
  sm: "0.5px 0.5px 0px 0px hsl(0 0% 0% / 0.06), 0.5px 1px 2px -1px hsl(0 0% 0% / 0.06)",
  DEFAULT: "0.5px 0.5px 0px 0px hsl(0 0% 0% / 0.06), 0.5px 1px 2px -1px hsl(0 0% 0% / 0.06)",
  md: "0.5px 0.5px 0px 0px hsl(0 0% 0% / 0.06), 0.5px 2px 4px -1px hsl(0 0% 0% / 0.06)",
  lg: "0.5px 0.5px 0px 0px hsl(0 0% 0% / 0.06), 0.5px 4px 6px -1px hsl(0 0% 0% / 0.06)",
  xl: "0.5px 0.5px 0px 0px hsl(0 0% 0% / 0.06), 0.5px 8px 10px -1px hsl(0 0% 0% / 0.06)",
  "2xl": "0.5px 0.5px 0px 0px hsl(0 0% 0% / 0.15)",
} as const;

// ============================================================
// Token key → CSS variable name mapping
// ============================================================

/** Converts camelCase token keys to kebab-case CSS variable names */
export function tokenKeyToCSS(key: string): string {
  return key.replace(/([A-Z0-9])/g, (match, char, index) => {
    // Check if it's a digit following a letter (e.g. chart1 → chart-1)
    if (/[0-9]/.test(char) && index > 0 && /[a-zA-Z]/.test(key[index - 1])) {
      return `-${char}`;
    }
    return `-${char.toLowerCase()}`;
  });
}
