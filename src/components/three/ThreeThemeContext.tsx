"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ThreeTheme {
  isDark: boolean;
  colors: {
    primary: string;
    primaryLight: string;
    accent: string;
    background: string;
    particleA: string;
    particleB: string;
  };
}

const darkTheme: ThreeTheme = {
  isDark: true,
  colors: {
    primary: "#1a5276",
    primaryLight: "#2980b9",
    accent: "#0ea5e9",
    background: "#080e1a",
    particleA: "#0ea5e9",
    particleB: "#d4e6f1",
  },
};

const lightTheme: ThreeTheme = {
  isDark: false,
  colors: {
    primary: "#1a5276",
    primaryLight: "#2980b9",
    accent: "#0ea5e9",
    background: "#f8fbfe",
    particleA: "#2980b9",
    particleB: "#1a5276",
  },
};

const ThreeThemeContext = createContext<ThreeTheme>(darkTheme);

export function ThreeThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThreeTheme>(darkTheme);

  useEffect(() => {
    const update = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? darkTheme : lightTheme);
    };

    update();

    // Watch for class changes on <html>
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThreeThemeContext.Provider value={theme}>
      {children}
    </ThreeThemeContext.Provider>
  );
}

export function useThreeTheme(): ThreeTheme {
  return useContext(ThreeThemeContext);
}
