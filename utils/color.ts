import phData from "@/ph_data.json";

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

// Find the closest item in a list of indicators by pH
const findClosestByPh = (list: any[], targetPh: number) => {
  let closest = list[0];
  let minDiff = Math.abs(closest.pH - targetPh);
  for (let i = 1; i < list.length; i++) {
    const diff = Math.abs(list[i].pH - targetPh);
    if (diff < minDiff) {
      minDiff = diff;
      closest = list[i];
    }
  }
  return closest;
};

export interface MatchResult {
  ph: number;
  classification: string;
  soilCondition: string;
  soilHealthScore: number;
  confidence: number;
  nutrients: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
  };
  recommendedCrops: string[];
  fertilizerRecommendation: string;
  waterRetention: string;
  aiInsights: string[];
  colorMatched: {
    scanned: {
      universal_indicator: string;
      methyl_red: string;
      thymol_blue: string;
    };
    reference: {
      universal_indicator: string;
      methyl_red: string;
      thymol_blue: string;
    };
  };
}

// Matching logic against the full ph_data.json
export const matchTripleIndicator = (scannedHexes: {
  universal_indicator: string;
  methyl_red: string;
  thymol_blue: string;
}): MatchResult => {
  const scannedUv = hexToRgb(scannedHexes.universal_indicator);
  const scannedMr = hexToRgb(scannedHexes.methyl_red);
  const scannedTb = hexToRgb(scannedHexes.thymol_blue);

  if (!scannedUv || !scannedMr || !scannedTb) {
    throw new Error("Invalid hex color format in one of the indicators");
  }

  // All 29 possible pH values from ph_data.json (0.0 to 14.0 in steps of 0.5)
  const pHs = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14
  ];

  let bestPh = 7.0;
  let minWeightedDistance = Infinity;
  let bestUiEntry = phData.universalIndicator[14]; // neutral
  let bestMrEntry = phData.methylRed[13];
  let bestTbEntry = phData.thymolBlue[12];

  pHs.forEach((testPh) => {
    const uiEntry = findClosestByPh(phData.universalIndicator, testPh);
    const mrEntry = findClosestByPh(phData.methylRed, testPh);
    const tbEntry = findClosestByPh(phData.thymolBlue, testPh);

    const refUv = hexToRgb(uiEntry.hex);
    const refMr = hexToRgb(mrEntry.hex);
    const refTb = hexToRgb(tbEntry.hex);

    if (refUv && refMr && refTb) {
      const distUv = colorDistance(scannedUv, refUv);
      const distMr = colorDistance(scannedMr, refMr);
      const distTb = colorDistance(scannedTb, refTb);

      // Determine weights based on the pH range of the current level we are checking against
      // Using values from ph_data.json:
      // veryAcidic: 0-3 (UI 40%, MR 10%, TB 50%) -> UI: 0.4, MR: 0.1, TB: 0.5
      // agricultural: 4-7 (UI 40%, MR 50%, TB 10%) -> UI: 0.4, MR: 0.5, TB: 0.1
      // alkaline: 8-14 (UI 40%, MR 10%, TB 50%) -> UI: 0.4, MR: 0.1, TB: 0.5
      let wUI = 0.40, wMR = 0.50, wTB = 0.10; // agricultural defaults
      if (testPh <= 3.5) {
        wUI = 0.40; wMR = 0.10; wTB = 0.50; // veryAcidic
      } else if (testPh >= 7.5) {
        wUI = 0.40; wMR = 0.10; wTB = 0.50; // alkaline
      }

      const weightedDistance =
        (distUv * wUI) +
        (distMr * wMR) +
        (distTb * wTB);

      if (weightedDistance < minWeightedDistance) {
        minWeightedDistance = weightedDistance;
        bestPh = testPh;
        bestUiEntry = uiEntry;
        bestMrEntry = mrEntry;
        bestTbEntry = tbEntry;
      }
    }
  });

  // Calculate confidence score (0-100) based on distance
  const maxDistance = 441.67; // max distance in RGB space
  const confidence = Math.max(70, Math.min(99, Math.round(99 - (minWeightedDistance / maxDistance) * 100 * 1.5)));

  // Map to crop recommendations categories in ph_data.json:
  // veryAcidic (pH 4.0 - 5.5) -> let's map < 5.5
  // slightlyAcidic (pH 5.5 - 6.5) -> let's map 5.5 to 6.4
  // neutral (pH 6.5 - 7.5) -> let's map 6.5 to 7.5
  // slightlyAlkaline (pH 7.5 - 8.5) -> let's map 7.6 to 8.5
  // alkaline (pH 8.5 - 14) -> let's map > 8.5
  let category: "veryAcidic" | "slightlyAcidic" | "neutral" | "slightlyAlkaline" | "alkaline" = "neutral";
  if (bestPh < 5.5) category = "veryAcidic";
  else if (bestPh >= 5.5 && bestPh < 6.5) category = "slightlyAcidic";
  else if (bestPh >= 6.5 && bestPh <= 7.5) category = "neutral";
  else if (bestPh > 7.5 && bestPh <= 8.5) category = "slightlyAlkaline";
  else if (bestPh > 8.5) category = "alkaline";

  const rec = phData.cropRecommendations[category];

  // Dynamic soil health score calculation
  let soilHealthScore = 98;
  let soilCondition = "Excellent";
  if (bestPh === 7.0) {
    soilHealthScore = 98;
    soilCondition = "Excellent";
  } else if (bestPh === 6.5 || bestPh === 7.5) {
    soilHealthScore = 94;
    soilCondition = "Optimal";
  } else if (bestPh === 6.0 || bestPh === 8.0) {
    soilHealthScore = 86;
    soilCondition = "Good";
  } else if (bestPh === 5.5 || bestPh === 8.5) {
    soilHealthScore = 76;
    soilCondition = "Moderate";
  } else if (bestPh === 5.0 || bestPh === 9.0) {
    soilHealthScore = 58;
    soilCondition = "Slightly Stressed";
  } else if (bestPh === 4.5 || bestPh === 9.5) {
    soilHealthScore = 48;
    soilCondition = "Stressed";
  } else if (bestPh === 4.0 || bestPh === 10.0) {
    soilHealthScore = 32;
    soilCondition = "Poor";
  } else {
    // Critical acidic/alkaline extremes
    soilHealthScore = Math.max(4, Math.round(30 - Math.abs(bestPh - 7.0) * 4));
    soilCondition = "Critical";
  }

  // Dynamic nutrients mapping
  let nutrients = { nitrogen: "Optimal", phosphorus: "Optimal", potassium: "Optimal" };
  if (category === "veryAcidic") {
    nutrients = { nitrogen: "Low", phosphorus: "Locked", potassium: "Low" };
  } else if (category === "slightlyAcidic") {
    nutrients = { nitrogen: "Moderate", phosphorus: "Good", potassium: "Balanced" };
  } else if (category === "neutral") {
    nutrients = { nitrogen: "Optimal", phosphorus: "Optimal", potassium: "Optimal" };
  } else if (category === "slightlyAlkaline") {
    nutrients = { nitrogen: "Medium", phosphorus: "Low", potassium: "Moderate" };
  } else {
    nutrients = { nitrogen: "Very Low", phosphorus: "Locked", potassium: "Low" };
  }

  // Water retention mapping
  let waterRetention = "Optimal";
  if (bestPh < 5.0 || bestPh > 9.0) waterRetention = "Poor";
  else if (bestPh < 6.0 || bestPh > 8.0) waterRetention = "Moderate";
  else waterRetention = "Optimal";

  // Fertilizer recommendations
  const fertilizerRecommendation = rec.amendments.join(" & ") + ". Focus on NPK balancing.";

  // Dynamic AI insights
  const aiInsights = [
    `Matched pH ${bestPh.toFixed(1)}: classified as ${bestUiEntry.description || "Soil sample"}.`,
    rec.amendments[0] ? `Recommendation: ${rec.amendments[0]}.` : "Monitor soil status regularly.",
    `Optimal crop compatibility: ${rec.suitableCrops.slice(0, 3).join(", ")}.`,
    rec.issues[0] ? `Risk warning: ${rec.issues[0]}.` : "No immediate nutrient lockout threats detected."
  ];

  return {
    ph: bestPh,
    classification: bestUiEntry.description || "Soil pH Result",
    soilCondition,
    soilHealthScore,
    confidence,
    nutrients,
    recommendedCrops: rec.suitableCrops,
    fertilizerRecommendation,
    waterRetention,
    aiInsights,
    colorMatched: {
      scanned: {
        universal_indicator: scannedHexes.universal_indicator,
        methyl_red: scannedHexes.methyl_red,
        thymol_blue: scannedHexes.thymol_blue,
      },
      reference: {
        universal_indicator: bestUiEntry.hex,
        methyl_red: bestMrEntry.hex,
        thymol_blue: bestTbEntry.hex,
      }
    }
  };
};
