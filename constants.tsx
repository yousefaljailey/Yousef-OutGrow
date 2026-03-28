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
    title: "Advertising, PR & Brand Management",
    description: "Full-spectrum marketing and brand management consultancy. We create, place, and design advertising across print, broadcast, and digital media — ensuring your brand reaches the right audience through the right channels with maximum impact.",
    icon: "📣",
    features: [
      "Marketing & Brand Consultancy",
      "Advertising Design & Placement",
      "Print, Broadcast & Digital Media",
      "PR & Distribution of Ad Materials"
    ]
  },
  {
    id: 2,
    title: "Event Management Services",
    description: "End-to-end organization, promotion, and management of business events — from trade shows and conventions to conferences and corporate meetings. We handle everything from venue selection and permits to on-site contractor staff management.",
    icon: "🎯",
    features: [
      "Trade Shows & Conventions",
      "Conferences & Corporate Meetings",
      "Venue Selection & Permitting",
      "Budgeting & Timeline Management"
    ]
  }
];

export const PACKAGES: Package[] = [
  {
    name: "Brand Essentials",
    price: "Custom",
    description: "Ideal for businesses establishing their brand presence and launching their first advertising campaigns.",
    features: [
      "Brand Management Consultancy",
      "Ad Design & Creative Development",
      "Media Placement (Digital & Print)",
      "PR & Advertising Distribution",
      "Monthly Strategy Review"
    ]
  },
  {
    name: "Full-Scale Marketing",
    price: "Custom",
    description: "Comprehensive advertising and brand management across all media channels.",
    isPopular: true,
    features: [
      "Multi-Channel Ad Campaign Management",
      "TV, Radio & Internet Advertising",
      "Brand Positioning & Messaging",
      "Advertising Material Distribution",
      "Bi-Weekly Performance Reports"
    ]
  },
  {
    name: "Event + Brand",
    price: "Custom",
    description: "Combined advertising and event management for businesses running activations, trade shows, or conferences.",
    features: [
      "Dedicated Account Team",
      "Full Event Organization & Management",
      "Venue Selection & Permit Acquisition",
      "On-Site Contractor Staff Management",
      "Integrated Marketing & PR Campaign"
    ]
  }
];
