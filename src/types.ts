export interface ProjectDetailSection {
  title: string
  text: string
  image: string
}

export interface Project {
  id: string
  name: string
  assetClass: "Residential" | "Mixed-Use" | "Commercial" | "Hospitality"
  location: string
  image: string
  description: string
  status?: string
  brochureUrl?: string
  introTitle?: string
  introText?: string
  introImage?: string
  projectFeatures?: string[]
  detailSections?: ProjectDetailSection[]
}

export interface EventItem {
  id: string
  title: string
  date: string
  location: string
  image: string
  details?: string
  isFeatured?: boolean
}

export interface NewsItem {
  id: string
  category: string
  title: string
  date: string
  excerpt: string
  image: string
  content?: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  type: string
  message: string
  date: string
}

// Page content types

export interface PageContent {
  id: string
  pageSlug: string
  content: Record<string, unknown>
  updatedAt: string
}

export interface HomeContent {
  heroImage: string
  heroTagline: string
  philosophyHeading: string
  philosophyBody: string
  philosophyImage: string
  platformHeading: string
  platformBody: string
  portfolioBadge: string
  portfolioTitle: string
  portfolioBody: string
  portfolioCta: string
  portfolioSubtext: string
  updatesHeading: string
  updatesSubheading: string
  updatesCta: string
}

export interface AboutContent {
  heroImage: string
  heroTitle: string
  heroSubtitle: string
  visionHeading: string
  visionText: string
  missionHeading: string
  missionText: string
  valuesHeading: string
  values: { title: string; description: string }[]
  originHeading: string
  originImage: string
  originBody: string
  governanceLabel: string
  governanceHeading: string
  governanceBody: string
}

export interface InvestmentContent {
  heroImage: string
  heroTitle: string
  heroSubtitle: string
  approachLabel: string
  approachHeading: string
  approachBody: string
  developHeading: string
  developImage: string
  developBody: string
  developBullets: string[]
  riskLabel: string
  riskHeading: string
  riskCategories: { title: string; description: string }[]
  qualityHeading: string
  qualityImage: string
  qualityBody: string
  qualityBullets: string[]
  assetClassesHeading: string
  assetClassesIntro: string
  assetClasses: { name: string; image: string }[]
  structuresHeading: string
  structuresBody: string
  structuresBullets: string[]
}

export interface ProjectsContent {
  heroImage: string
  heroTitle: string
  heroSubtitle: string
  overviewLabel: string
  overviewBody: string
}

export interface ContactContent {
  heading: string
  subheading: string
  contactItems: { label: string; value: string }[]
}

export interface EventsNewsContent {
  subheading: string
  heading: string
  newsLabel: string
  newsHeading: string
  eventsLabel: string
  eventsHeading: string
  showInNavbar: boolean
  showFeaturedUpdates: boolean
}
