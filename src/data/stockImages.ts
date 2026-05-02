/**
 * Unsplash stock photography (hotlink via images.unsplash.com).
 * https://unsplash.com/license
 */
export function stockPhoto(pathId: string, width = 900): string {
  return `https://images.unsplash.com/${pathId}?auto=format&fit=crop&w=${width}&q=82`
}

export const STOCK = {
  project: {
    midCenturySofa: stockPhoto('photo-1555041469-a586c61ea9bc', 1000),
    victorianWingback: stockPhoto('photo-1586023492125-27b2c045efd7', 1000),
    eamesChairs: stockPhoto('photo-1503602642458-232111445657', 1000),
    chesterfield: stockPhoto('photo-1567538096630-e0c55bd6374c', 1000),
  },
  ritual: [
    stockPhoto('photo-1616486338812-3dadae4b4ace', 960),
    stockPhoto('photo-1504148455323-c917a4e57029', 960),
    stockPhoto('photo-1583496661160-fb5886a13d8a', 960),
    stockPhoto('photo-1631679706909-1844bbd07221', 960),
  ],
  /** Scroll story “chair” silhouette on /experience */
  experienceChair: stockPhoto('photo-1586023492125-27b2c045efd7', 1000),
  beforeAfter: {
    before: stockPhoto('photo-1493663284031-b7e3aefcfeb8', 1400),
    after: stockPhoto('photo-1555041469-a586c61ea9bc', 1400),
  },
  flame: {
    untreated: stockPhoto('photo-1615873968403-89e068629bc9', 1200),
    protected: stockPhoto('photo-1541123603109-5bc862646a29', 1200),
  },
  industry: {
    hospitality: stockPhoto('photo-1566073771259-6a8506099945', 1000),
    restaurants: stockPhoto('photo-1517248135467-4c7edcad34c4', 1000),
    healthcare: stockPhoto('photo-1579684385127-1ef15d5081de', 1000),
    transportation: stockPhoto('photo-1544620347-c4fd4a3d5957', 1000),
  },
  fabric: {
    italianLeather: stockPhoto('photo-1553062407-98eeb64c6a62', 800),
    scottishWool: stockPhoto('photo-1620799140408-ed53412cd629', 800),
    linenBlend: stockPhoto('photo-1517142089942-ba376ce32a56', 800),
    silkVelvet: stockPhoto('photo-1615529182904-14819c35db37', 800),
    linenCotton: stockPhoto('photo-1585218333786-6152fddb162b', 800),
    mohair: stockPhoto('photo-1609768519084-6f69a9fcb72a', 800),
    crypton: stockPhoto('photo-1578662996442-bc48f006f3ca', 800),
    vinylContract: stockPhoto('photo-1582719478250-c89cae4dc85b', 800),
  },
} as const
