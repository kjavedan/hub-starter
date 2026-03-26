// ============================================================
// Generates src/generated/web.css from tokens.ts
// Run: pnpm build (or tsx scripts/generate-css.ts)
// ============================================================

import * as fs from "node:fs";
import * as path from "node:path";

import {
  fonts,
  radius,
  shadows,
  spacing,
  tokenKeyToCSS,
  tokens,
  trackingNormal,
} from "../src/tokens";

type ColorTokens = Record<string, string>;

function buildColorVars(mode: ColorTokens): string {
  return Object.entries(mode)
    .map(([key, value]) => `  --${tokenKeyToCSS(key)}: hsl(${value});`)
    .join("\n");
}

function buildShadowVars(): string {
  const lines: string[] = [
    `  --shadow-x: 0.5px;`,
    `  --shadow-y: 0.5px;`,
    `  --shadow-blur: 0px;`,
    `  --shadow-spread: 0px;`,
    `  --shadow-opacity: 0.06;`,
    `  --shadow-color: #000000;`,
  ];

  for (const [key, value] of Object.entries(shadows)) {
    const varName = key === "DEFAULT" ? "--shadow" : `--shadow-${key}`;
    lines.push(`  ${varName}: ${value};`);
  }

  return lines.join("\n");
}

const css = `/* ============================================================
 * AUTO-GENERATED — Do not edit manually!
 * Source: packages/ui/src/tokens.ts
 * Run "pnpm build" in packages/ui to regenerate.
 * ============================================================ */

:root {
${buildColorVars(tokens.light)}
  --font-sans: ${fonts.sans};
  --font-serif: ${fonts.serif};
  --font-mono: ${fonts.mono};
  --radius: ${radius};
  --spacing: ${spacing};
  --tracking-normal: ${trackingNormal};
${buildShadowVars()}
}

.dark {
${buildColorVars(tokens.dark)}
  --font-sans: ${fonts.sans};
  --font-serif: ${fonts.serif};
  --font-mono: ${fonts.mono};
  --radius: ${radius};
${buildShadowVars()}
}
`;

// Write to src/generated/web.css
const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const outDir = path.resolve(scriptDir, "../src/generated");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "web.css"), css);

console.log("✅ Generated src/generated/web.css from tokens.ts");
