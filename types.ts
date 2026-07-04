export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface GrowthStrategy {
  /** True when this is a generated sample (no live AI key configured). */
  demo?: boolean;
  headline: string;
  summary: string;
  recommendations: {
    title: string;
    action: string;
    category: string;
  }[];
}

export interface UserInput {
  businessName: string;
  industry: string;
  mainChallenge: string;
}
