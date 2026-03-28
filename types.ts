export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface GrowthStrategy {
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
