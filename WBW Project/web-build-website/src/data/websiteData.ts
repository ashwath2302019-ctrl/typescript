import type {
  PortfolioProject,
  PricingPlan,
  Review,
  Template,
} from '../types'

export const templates: Template[] = [
  {
    id: 1,
    title: 'Business Website',
    description: 'A simple website for small businesses.',
     image: '/images/business.jpg'
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A personal website for students and freelancers.',
     image: '/images/portfolio.jpg'
  },
  {
    id: 3,
    title: 'Online Store',
    description: 'A basic shopping website for selling products.',
    image: '/images/ecommerce.jpg'
  },
]

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: 'Starter',
    price: '₹8,000',
    features: ['3 Pages', 'Contact Form', 'Mobile Responsive'],
  },
  {
    id: 2,
    name: 'Pro',
    price: '₹15,000',
    features: ['6 Pages', 'WhatsApp Button', 'Basic SEO'],
  },
  {
    id: 3,
    name: 'Growth',
    price: '₹25,000',
    features: ['10 Pages', 'Booking Form', 'Online Store'],
  },
]

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Food Shop Website',
    description: 'A simple website created for a local food shop.',
     image: '/images/food.jpg'
  },
  {
    id: 2,
    title: 'Student Portfolio',
    description: 'A personal portfolio website for a college student.',
     image: '/images/student.jpg'
  },
  {
    id: 3,
    title: 'Training Centre Website',
    description: 'A website showing courses and contact information.',
     image: '/images/training.jpg'
  },
]

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Arun',
    review: 'The website was simple and easy to use.',
  },
  {
    id: 2,
    name: 'Sneha',
    review: 'The team completed our website on time.',
  },
  {
    id: 3,
    name: 'Karthik',
    review: 'Good design and friendly support.',
  },
]