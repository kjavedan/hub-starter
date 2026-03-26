// ============================================================
// @hub-starter/ui — React Native / NativeWind Adapter
// ============================================================
// Transforms raw HSL tokens into hsl() strings for NativeWind.
// ============================================================

import { fonts, radius, spacing, tokens } from "./tokens";

type ColorTokens = Record<string, string>;

function hsl(value: string): string {
  return `hsl(${value})`;
}

function buildColorMap(mode: ColorTokens) {
  return {
    background: hsl(mode.background),
    foreground: hsl(mode.foreground),
    card: { DEFAULT: hsl(mode.card), foreground: hsl(mode.cardForeground) },
    popover: {
      DEFAULT: hsl(mode.popover),
      foreground: hsl(mode.popoverForeground),
    },
    primary: {
      DEFAULT: hsl(mode.primary),
      foreground: hsl(mode.primaryForeground),
    },
    secondary: {
      DEFAULT: hsl(mode.secondary),
      foreground: hsl(mode.secondaryForeground),
    },
    muted: {
      DEFAULT: hsl(mode.muted),
      foreground: hsl(mode.mutedForeground),
    },
    accent: {
      DEFAULT: hsl(mode.accent),
      foreground: hsl(mode.accentForeground),
    },
    destructive: {
      DEFAULT: hsl(mode.destructive),
      foreground: hsl(mode.destructiveForeground),
    },
    border: hsl(mode.border),
    input: hsl(mode.input),
    ring: hsl(mode.ring),
    sidebar: {
      DEFAULT: hsl(mode.sidebar),
      foreground: hsl(mode.sidebarForeground),
      primary: hsl(mode.sidebarPrimary),
      "primary-foreground": hsl(mode.sidebarPrimaryForeground),
      accent: hsl(mode.sidebarAccent),
      "accent-foreground": hsl(mode.sidebarAccentForeground),
      border: hsl(mode.sidebarBorder),
      ring: hsl(mode.sidebarRing),
    },
  };
}

export const lightColors = buildColorMap(tokens.light);
export const darkColors = buildColorMap(tokens.dark);

export { fonts, radius, spacing };
