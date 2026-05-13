export interface Indicator {
  hex: string;
  label: string;
}

export interface Indicators {
  universal_indicator: Indicator;
  methyl_red: Indicator;
  thymol_blue: Indicator;
}

export interface Nutrients {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
}

export interface PhLevel {
  ph: number;
  classification: string;
  soilCondition: string;
  soilHealthScore: number;
  recommendedAction: string;
  cropCompatibility: string[];
  waterRetention: string;
  organicMatter: string;
  fertilizerRecommendation: string;
  nutrients: Nutrients;
  indicators: Indicators;
}

export interface Weighting {
  range: string;
  thymol_blue: number;
  universal_indicator: number;
  methyl_red: number;
}

export interface PhDatabase {
  metadata: any;
  weighting: {
    acidic: Weighting;
    agriculture: Weighting;
    alkaline: Weighting;
  };
  phLevels: PhLevel[];
}

export interface ScanResult {
  ph: number;
  classification: string;
  confidence: number;
  soilHealthScore: number;
  condition: string;
}

export interface SoilReport {
  id: string;
  farmerName?: string;
  location?: string;
  date: string;
  scanResult: ScanResult;
  nutrients: Nutrients;
  recommendedCrops: string[];
  fertilizerRecommendation: string;
  waterRetention: string;
  aiInsights: string[];
  colorMatched?: {
    universal_indicator: string;
    methyl_red: string;
    thymol_blue: string;
  };
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isGuest?: boolean;
}
