export interface PackageSettings {
  badge_text: string;
  title: string;
  description: string;
  meta_title: string;
  meta_description: string;
}

export interface PricingDetail {
  external: number;
  internal: number;
}

export interface PackagePricing {
  monthly_washes_count: number;
  monthly_discount_text: string;
  single: PricingDetail;
  package: PricingDetail;
}

export interface PackageFeature {
  id: number;
  name: string;
  is_external: boolean;
  both: boolean;
}

export interface PackageItem {
  id: number;
  name: string;
  duration: string;
  image: string;
  is_popular: boolean;
  pricing: PackagePricing;
  features: PackageFeature[];
  order: number;
}

export interface PackagesData {
  settings: PackageSettings;
  items: PackageItem[];
}

export interface PackagesResponse {
  status: string;
  message: string;
  data: PackagesData;
}