import { PhDatabase, PhLevel } from "@/types";
import phDataJson from "@/data/ph-reference.json";

const phDatabase: PhDatabase = phDataJson;

// Convert HEX to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Calculate Euclidean distance between two RGB colors
export const colorDistance = (color1: { r: number; g: number; b: number }, color2: { r: number; g: number; b: number }) => {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
  );
};

// Smart triple-indicator matching logic
export const matchTripleIndicator = (scannedHexes: {
  universal_indicator: string;
  methyl_red: string;
  thymol_blue: string;
}): { result: PhLevel; confidence: number } => {
  
  const scannedUv = hexToRgb(scannedHexes.universal_indicator);
  const scannedMr = hexToRgb(scannedHexes.methyl_red);
  const scannedTb = hexToRgb(scannedHexes.thymol_blue);
  
  if (!scannedUv || !scannedMr || !scannedTb) {
    throw new Error("Invalid hex color format in one of the indicators");
  }

  let bestMatch: PhLevel | null = null;
  let minWeightedDistance = Infinity;

  phDatabase.phLevels.forEach((level) => {
    const refUv = hexToRgb(level.indicators.universal_indicator.hex);
    const refMr = hexToRgb(level.indicators.methyl_red.hex);
    const refTb = hexToRgb(level.indicators.thymol_blue.hex);

    if (refUv && refMr && refTb) {
      const distUv = colorDistance(scannedUv, refUv);
      const distMr = colorDistance(scannedMr, refMr);
      const distTb = colorDistance(scannedTb, refTb);

      // Determine weights based on the pH range of the current level we are checking against
      let weights = phDatabase.weighting.agriculture;
      if (level.ph <= 3) weights = phDatabase.weighting.acidic;
      if (level.ph >= 8) weights = phDatabase.weighting.alkaline;

      const weightedDistance = 
        (distUv * weights.universal_indicator) + 
        (distMr * weights.methyl_red) + 
        (distTb * weights.thymol_blue);

      if (weightedDistance < minWeightedDistance) {
        minWeightedDistance = weightedDistance;
        bestMatch = level;
      }
    }
  });

  // Calculate a fake confidence score (0-100)
  // Max distance in RGB space is ~441.67, so max weighted distance is also around 441.67
  const maxDistance = 441.67;
  const confidence = Math.max(0, Math.min(100, Math.round(100 - (minWeightedDistance / maxDistance) * 100 * 2.5)));

  if (!bestMatch) {
    bestMatch = phDatabase.phLevels[4]; // Default to neutral if somehow it fails
  }

  return { result: bestMatch, confidence };
};
