// lib/types.ts

export interface Product {
  id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  woodType: string;
  finish: string;
  dimensions: string;
  usage: string;
  customization: string;
  images: string[];
  featured: boolean;
  createdAt: Date | string;
}

export interface GalleryItem {
  id?: string;
  image: string;
  title: string;
  category: string;
  createdAt: Date | string;
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  order: number;
}

export interface Enquiry {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  product?: string;
  read: boolean;
  createdAt: Date | string;
}

export interface SiteSettings {
  heroHeading: string;
  heroSubheading: string;
  aboutTitle: string;
  aboutText: string;
  seoTitle: string;
  seoDescription: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  showMap?: boolean;
  heroImage?: string;
  craftLeftImage?: string;
  craftRightImage?: string;
  enquiryImage?: string;
  productBannerImage?: string;
  homeGalleryImage?: string;
  aboutImage?: string;
  ownerName?: string;
  gstNumber?: string;
  seoKeywords?: string;
  googleReviewUrl?: string;
}

export const CATEGORIES = [
  'Wooden Mouldings',
  'Door Chaukat',
  'Raw Wooden Doors',
  'Decorative Profiles',
  'Wall Panels',
] as const;

export type Category = typeof CATEGORIES[number];
