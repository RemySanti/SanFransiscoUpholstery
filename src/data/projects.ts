import { STOCK } from './stockImages'

export type Project = {
  year: number
  title: string
  description: string
  image: string
  tags: string[]
  industry: string
  problem: string
  process: string
  result: string
}

export const projects: Project[] = [
  {
    year: 2024,
    title: 'Mid-Century Sofa',
    description: '1960s Danish framework restored to original geometry.',
    image: STOCK.project.midCenturySofa,
    tags: ['Residential', 'Teak'],
    industry: 'Residential',
    problem: 'Sun-faded cushions and sagging suspension in a family room anchor piece.',
    process: 'Frame tune-up, new webbing, and Italian leather cut to original pattern.',
    result: 'A quiet, gallery-level silhouette with daily-use durability.',
  },
  {
    year: 2024,
    title: 'Victorian Wingback',
    description: 'Family heirloom through three generations preserved.',
    image: STOCK.project.victorianWingback,
    tags: ['Heirloom', 'Hand-tufted'],
    industry: 'Residential',
    problem: 'Brittle horsehair and torn silk threatened the chair’s structure.',
    process: 'Conservation-first teardown, hand-tied springs, heritage wool.',
    result: 'Heirloom integrity restored without erasing its history.',
  },
  {
    year: 2023,
    title: 'Eames Shell Chairs',
    description: 'Set of 4 with precision-cut Italian leather.',
    image: STOCK.project.eamesChairs,
    tags: ['Commercial', 'Leather'],
    industry: 'Hospitality',
    problem: 'High-traffic seating showing wear inconsistent with brand standards.',
    process: 'Commercial-grade foam, leather matched to spec, batch consistency.',
    result: 'Uniform luxury across a full dining floor.',
  },
  {
    year: 2023,
    title: 'Chesterfield',
    description: '1920s British classic with original nailhead studding.',
    image: STOCK.project.chesterfield,
    tags: ['Heritage', 'Studded'],
    industry: 'Hospitality',
    problem: 'Collapsed arms and compromised deck in a lobby signature piece.',
    process: 'Structural rebuild, stud-by-stud documentation, full re-stuff.',
    result: 'Statement presence returned for another generation of guests.',
  },
]
