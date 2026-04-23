// packages types
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

// hero and about types
export interface HeroResponse {
  status: string;
  message: string;
  data: HeroData;
}

export interface HeroData {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  background_image: string;
  background_images: string[];
  logo: string | null;
  stats: Stat[];
  features:[]|null;
  seo: Seo;
  about: About;
  created_at: string;
  updated_at: string;
}

export interface Stat {
  count: string;
  label: string;
  image: string | null;
}

export interface Seo {
  meta_title: string;
  meta_description: string;
}

export interface About {
  title: string;
  description: string;
  video_url: string;
  features: AboutFeature[];
}

export interface AboutFeature {
  label: string;
  image: string;
}

// portfolio types
export interface PortfolioResponse {
  status: string;
  message: string;
  data: PortfolioData;
}

export interface PortfolioData {
  settings: PortfolioSettings;
  items: PortfolioItem[];
}

export interface PortfolioSettings {
  title: string;
  subtitle: string;
  gallery: string[];
  seo: Seo;
}

export interface PortfolioItem {
  id: number;
  title: string;
  customer_name: string;
  location: string;
  rating: number;
  content: string;
  category: string;
  is_before_after: boolean;
  images: PortfolioImages;
  order: number;
  created_at: string;
}

export interface PortfolioImages {
  before_image: string;
  after_image: string;
  customer_avatar: string;
}

// testimonials types
export interface TestimonialResponse {
  status: string;
  message: string;
  data: PortfolioItem[];
}

// steps types
export interface WorkStepsResponse {
  status: string;
  message: string;
  data: WorkStepsData;
}

export interface WorkStepsData {
  id: number;
  title: string;
  subtitle: string;
  steps: Step[];
  seo: Seo;
  created_at: string;
  updated_at: string;
}

export interface Step {
  title: string;
  description: string;
  image: string;
}

// why choose
export interface WhyChooseUsResponse {
  status: string;
  message: string;
  data: WhyChooseUsData;
}

export interface WhyChooseUsData {
  id: number;
  title: string;
  subtitle: string;
  items: WhyChooseUsItem[];
  seo: Seo;
  created_at: string;
  updated_at: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  image: string;
}

export interface Seo {
  meta_title: string;
  meta_description: string;
}

