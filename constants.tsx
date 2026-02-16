
import React from 'react';
import { Service } from './types';

export interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Marketing & Advertising",
    description: "Data-driven strategies designed to maximize ROI. We handle everything from high-level strategic planning to granular media buying and campaign performance tracking across all major digital ad platforms.",
    icon: "📈",
    features: [
      "Omni-channel Ad Strategy",
      "Media Buying & Optimization",
      "Retargeting Campaigns",
      "Performance Analytics"
    ]
  },
  {
    id: 2,
    title: "Social Media & Digital Content",
    description: "More than just posting—we build digital ecosystems. Our team manages your entire social presence, creating engaging content strategies that foster community and drive brand loyalty.",
    icon: "📱",
    features: [
      "Community Management",
      "Content Calendar Planning",
      "Viral Content Creation",
      "Engagement Reporting"
    ]
  },
  {
    id: 3,
    title: "Branding & Creative Consultancy",
    description: "Crafting the soul of your business. We develop comprehensive brand identities, messaging frameworks, and visual guidelines that ensure your brand resonates with your target audience.",
    icon: "🎨",
    features: [
      "Visual Identity Design",
      "Messaging & Tone of Voice",
      "Brand Positioning",
      "Comprehensive Guidelines"
    ]
  },
  {
    id: 4,
    title: "Business Development & Growth",
    description: "Accelerate your market entry and expansion. We support clients with go-to-market strategies, strategic partnership development, and scalable customer acquisition frameworks.",
    icon: "🚀",
    features: [
      "GTM Strategy Formulation",
      "Partnership Scoping",
      "Market Expansion Planning",
      "Growth Audits"
    ]
  },
  {
    id: 5,
    title: "Media Production Coordination",
    description: "Bridging the gap between idea and execution. We coordinate the production of high-quality digital assets, promotional materials, and advertising creative without the typical production friction.",
    icon: "🎬",
    features: [
      "Asset Production Pipeline",
      "Creative Brief Development",
      "Vendor Coordination",
      "Quality Control Management"
    ]
  }
];

export const PACKAGES: Package[] = [
  {
    name: "Foundation",
    price: "Custom",
    description: "Perfect for startups needing a professional digital presence and basic growth roadmap.",
    features: [
      "Core Brand Strategy",
      "Social Media Setup",
      "1 Campaign Strategy",
      "Basic Performance Report",
      "Monthly Consultant Call"
    ]
  },
  {
    name: "Growth",
    price: "Custom",
    description: "Our most popular choice for businesses ready to scale their reach and content output.",
    isPopular: true,
    features: [
      "Full Social Media Management",
      "Ad Campaign Management",
      "Content Creation Coordination",
      "Bi-Weekly Strategy Updates",
      "GTM Execution Support"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Complete growth outsourcing including creative production and market expansion.",
    features: [
      "Dedicated Account Team",
      "End-to-End Media Production",
      "Global Partnership Support",
      "Omni-channel Ad Management",
      "Real-time Data Dashboard"
    ]
  }
];
