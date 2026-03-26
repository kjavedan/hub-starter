"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const activeTheme = mounted ? (resolvedTheme ?? theme) : undefined;
  const isDark = activeTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="outline"
      size="sm"
      type="button"
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
    </Button>
  );
}
