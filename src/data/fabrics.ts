import { STOCK } from './stockImages'

/** Swatch tint: color-mix of global palette only (primary, cream, sage). */
export type Fabric = {
  name: string
  type: string
  swatch: string
  image: string
  tags: string[]
  durability: number
  stain: number
  environment: 'commercial' | 'residential' | 'both'
}

export const fabrics: Fabric[] = [
  {
    name: 'Italian Leather',
    type: 'Vegetable-tanned, heirloom quality',
    swatch: 'color-mix(in srgb, var(--color-sage) 72%, var(--color-primary) 28%)',
    image: STOCK.fabric.italianLeather,
    tags: ['leather', 'premium'],
    durability: 5,
    stain: 4,
    environment: 'both',
  },
  {
    name: 'Scottish Wool',
    type: 'Heritage mill, naturally durable',
    swatch: 'color-mix(in srgb, var(--color-sage) 55%, var(--color-cream) 45%)',
    image: STOCK.fabric.scottishWool,
    tags: ['wool', 'heritage'],
    durability: 4,
    stain: 3,
    environment: 'both',
  },
  {
    name: 'Linen Blend',
    type: 'Sustainable, lived-in elegance',
    swatch: 'color-mix(in srgb, var(--color-cream) 82%, var(--color-sage) 18%)',
    image: STOCK.fabric.linenBlend,
    tags: ['sustainable', 'linen'],
    durability: 3,
    stain: 2,
    environment: 'residential',
  },
  {
    name: 'Silk Velvet',
    type: 'Luxe finish, subtle sheen',
    swatch: 'color-mix(in srgb, var(--color-primary) 48%, var(--color-sage) 52%)',
    image: STOCK.fabric.silkVelvet,
    tags: ['velvet', 'luxury'],
    durability: 3,
    stain: 2,
    environment: 'residential',
  },
  {
    name: 'Linen-Cotton',
    type: 'Versatile, deadstock rescue',
    swatch: 'color-mix(in srgb, var(--color-cream) 70%, var(--color-sage) 30%)',
    image: STOCK.fabric.linenCotton,
    tags: ['sustainable', 'cotton'],
    durability: 3,
    stain: 3,
    environment: 'both',
  },
  {
    name: 'Mohair',
    type: 'Dramatic texture, timeless appeal',
    swatch: 'color-mix(in srgb, var(--color-sage) 62%, var(--color-primary) 38%)',
    image: STOCK.fabric.mohair,
    tags: ['mohair', 'luxury'],
    durability: 4,
    stain: 3,
    environment: 'both',
  },
  {
    name: 'Crypton Performance',
    type: 'Commercial-grade, cleanable',
    swatch: 'color-mix(in srgb, var(--color-primary) 35%, var(--color-sage) 65%)',
    image: STOCK.fabric.crypton,
    tags: ['commercial', 'performance'],
    durability: 5,
    stain: 5,
    environment: 'commercial',
  },
  {
    name: 'Vinyl Contract',
    type: 'High-traffic, healthcare-ready',
    swatch: 'color-mix(in srgb, var(--color-primary) 52%, var(--color-cream) 48%)',
    image: STOCK.fabric.vinylContract,
    tags: ['commercial', 'healthcare'],
    durability: 5,
    stain: 5,
    environment: 'commercial',
  },
]
