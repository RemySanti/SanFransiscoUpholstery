import { STOCK, stockPhoto } from './stockImages'

export type Industry = {
  slug: string
  title: string
  tagline: string
  coverImage: string
  heroImage: string
  problemBullets: string[]
  solutionBullets: string[]
  proof: string
}

export const industries: Industry[] = [
  {
    slug: 'hospitality',
    title: 'Hospitality',
    tagline: 'Designed for high-traffic environments',
    coverImage: STOCK.industry.hospitality,
    heroImage: stockPhoto('photo-1566073771259-6a8506099945', 1600),
    problemBullets: ['Accelerated wear in lobbies and lounges', 'Brand inconsistency across properties', 'Downtime that disrupts guest experience'],
    solutionBullets: ['Custom upholstery matched to brand standards', 'Performance materials selected for cycles of use', 'Phased install planning'],
    proof: 'Nationwide hotel and boutique properties trust SFUG for durable, beautiful seating programs.',
  },
  {
    slug: 'restaurants',
    title: 'Restaurants',
    tagline: 'Seating that survives the rush',
    coverImage: STOCK.industry.restaurants,
    heroImage: stockPhoto('photo-1517248135467-4c7edcad34c4', 1600),
    problemBullets: ['Stains and tears in banquettes', 'Noise and comfort imbalance', 'Short replacement cycles'],
    solutionBullets: ['Cleanable performance fabrics and leathers', 'Comfort engineering for long sits', 'Detail that photographs well'],
    proof: 'From independent dining rooms to multi-location groups, we rebuild the pieces guests remember.',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    tagline: 'Calm, cleanable, compliant',
    coverImage: STOCK.industry.healthcare,
    heroImage: stockPhoto('photo-1579684385127-1ef15d5081de', 1600),
    problemBullets: ['Infection-control expectations', 'Vinyl fatigue and seam failure', 'Wayfinding through texture and tone'],
    solutionBullets: ['Healthcare-grade options and seam strategies', 'Color planning for calming environments', 'Maintenance-aware specifications'],
    proof: 'Waiting areas and clinical lounges regain warmth without sacrificing protocol.',
  },
  {
    slug: 'transportation',
    title: 'Transportation',
    tagline: 'Movement-ready durability',
    coverImage: STOCK.industry.transportation,
    heroImage: stockPhoto('photo-1544620347-c4fd4a3d5957', 1600),
    problemBullets: ['Abrasion in terminals and lounges', 'Frequent cleaning cycles', 'Brand refresh under pressure'],
    solutionBullets: ['Heavy-duty substrates and tailored upholstery', 'Batch production for fleet consistency', 'Rapid turnaround planning'],
    proof: 'Public spaces see thousands of touches—our work is built for that math.',
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}
