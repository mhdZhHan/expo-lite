import { Platform } from "react-native";

export const COLORS = {
  // primary: "#4ADE80", // Green (Main accent color)
  // secondary: "#2DD4BF", // Teal (Secondary accent color)
  primary: "#CC5500", // Burnt Orange (Main accent color)
  secondary: "#FFAB40", // Warm Orange-Yellow - Bright, fiery pop
  background: "#000000", // Black (Main background color)
  surface: "#1A1A1A", // Dark Gray (Card or container background)
  surfaceLight: "#2A2A2A", // Lighter Dark Gray (Alternative surface color)
  text: "#E8ECEF", // Off-White - Readable on dark backgrounds
  white: "#FFFFFF", // White (Text or icons on dark background)
  grey: "#9CA3AF", // Gray (Muted text or secondary elements)
} as const;

export const SIZES = {
  sm: 8, // Equivalent to Tailwind's `p-2` (8px)
  md: 16, // Equivalent to Tailwind's `p-4` (16px)
  lg: 24, // Equivalent to Tailwind's `p-6` (24px)
  xl: 32, // Equivalent to Tailwind's `p-8` (32px)
  "2xl": 40, // Equivalent to Tailwind's `p-10` (40px)
  "3xl": 48, // Equivalent to Tailwind's `p-12` (48px)
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  md: {
    shadowColor: "#000",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: { elevation: 5 },
    }),
  },
  lg: {
    shadowColor: "#000",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: { elevation: 8 },
    }),
  },
} as const;
