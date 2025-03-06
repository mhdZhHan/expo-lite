import { Dimensions } from "react-native";

// Get the initial dimensions of the window
const { height, width } = Dimensions.get("window");

/**
 * Calculate the height as a percentage of the window's height.
 *
 * @param {number} h - The percentage of the window's height.
 * @returns {number} - The calculated height in pixels.
 *
 * @example
 * const viewHeight = setHeight(50); // 50% of the window's height
 */
const setHeight = (h: number) => (height / 100) * h;

/**
 * Calculate the width as a percentage of the window's width.
 *
 * @param {number} w - The percentage of the window's width.
 * @returns {number} - The calculated width in pixels.
 *
 * @example
 * const viewWidth = setWidth(50); // 50% of the window's width
 */
const setWidth = (w: number) => (width / 100) * w;

export default { setHeight, setWidth };
