export interface Template {
  id: number
  title: string
  description: string
  image: string
}

export interface PricingPlan {
  id: number
  name: string
  price: string
  features: string[]
}

export interface PortfolioProject {
  id: number
  title: string
  description: string
  image:string
}

export interface Review {
  id: number
  name: string
  review: string
}

export interface WebsitePlanForm {
  name: string
  email: string
  phone: string
  pages: string
  websiteType: string
  features: string[]
  budget: string
}

export interface BookingForm {
  name: string
  email: string
  company : string
  budget:string
  phone: string
  date: string
  time: string
  timeSlot:string
  consent: boolean
}