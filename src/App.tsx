import logoUrl from './assets/logo.png'
import fireResistLogo from './assets/fire resist/fs-logo_4a9e1624-324d-4046-927d-e76524f2d2f2_1200x.webp'
import { useEffect, useState } from 'react'
import './App.css'

const targetMarkets = [
  {
    title: 'Restaurants',
    icon: '🍽',
    body: 'Dining chairs, bar stools, booths, banquettes, and custom lounge seating.',
  },
  {
    title: 'Commercial Transportation',
    icon: '🚌',
    body: 'Airplane and helicopter seats, limousines, party buses, and golf cart seating.',
  },
  {
    title: 'Hotels',
    icon: '🏨',
    body: 'Banquet halls, hotel rooms, conference rooms, lobbies, and shared spaces.',
  },
  {
    title: 'Churches',
    icon: '⛪',
    body: 'Pew upholstery, reupholstery, pew cushions, and sanctuary seating restoration.',
  },
  {
    title: 'Offices',
    icon: '🏢',
    body: 'Waiting areas, lobbies, cushions, club chairs, and custom seating upgrades.',
  },
  {
    title: 'Schools',
    icon: '🏫',
    body: 'Library chairs, dorm furniture, dining room furniture, and student spaces.',
  },
  {
    title: 'Hospitals',
    icon: '🏥',
    body: "Hospital chairs and beds, doctors' offices, exam tables, and clinical seating.",
  },
  {
    title: 'Gyms',
    icon: '🏋',
    body: 'Pads, benches, seats, custom gym walls, and performance mats.',
  },
  {
    title: 'Yachts',
    icon: '🛥',
    body: 'Yachts, ferries, tugs, marine seating, and canvas or vinyl bimini tops.',
  },
]

const carouselImageModules = import.meta.glob('./assets/carousel/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const credLogoModules = import.meta.glob('./assets/credlogos/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const allCarouselImages = Object.keys(carouselImageModules)
  .sort((a, b) => a.localeCompare(b))
  .map((key) => carouselImageModules[key])

const credLogos = Object.keys(credLogoModules)
  .sort((a, b) => a.localeCompare(b))
  .map((key) => credLogoModules[key])

const serviceCarouselImages = allCarouselImages

function formatCredLogoName(src: string) {
  const file = src.split('/').pop() ?? 'Client logo'
  const clean = file.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim()
  return clean.length > 0 ? clean : 'Client logo'
}

function ImageCarousel({ images, label }: { images: string[]; label: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length))
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, images.length])

  if (images.length === 0) {
    return <p className="carousel-empty">Add images to `src/assets/carousel` to populate this carousel.</p>
  }
  const looped = [...images, ...images]

  const closeLightbox = () => setActiveIndex(null)
  const showPrev = () => setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length))
  const showNext = () => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length))

  return (
    <>
      <div className="floating-wheel" aria-label={label}>
        <div className="floating-wheel-track">
          {looped.map((src, idx) => {
            const imageIndex = idx % images.length
            return (
              <button
                type="button"
                className="floating-card"
                key={`${src}-${idx}`}
                onClick={() => setActiveIndex(imageIndex)}
                aria-label={`Open image ${imageIndex + 1}`}
              >
                <img className="floating-image" src={src} alt={`${label} ${imageIndex + 1}`} loading="lazy" />
              </button>
            )
          })}
        </div>
      </div>
      {activeIndex !== null ? (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} expanded view`}
          onClick={closeLightbox}
        >
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close image viewer">
            ×
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(event) => {
              event.stopPropagation()
              showPrev()
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img
            className="lightbox-image"
            src={images[activeIndex]}
            alt={`${label} ${activeIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  )
}

function App() {
  return (
    <div className="site">
      <header className="utility-bar">
        <div className="container utility-row">
          <a href="tel:+18134934640">813-493-4640</a>
          <a href="mailto:info@sfug.pro">info@sfug.pro</a>
          <p>15805 Knollview Dr, Tampa FL 33624</p>
        </div>
      </header>

      <header className="topbar">
        <div className="container nav-row" id="home">
          <a className="brand" href="#home">
            <img className="brand-logo" src={logoUrl} alt="San Francisco Upholstery Group" width={200} height={48} />
          </a>
          <nav className="main-nav" aria-label="Primary">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#fireproofing">Fireproofing</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="btn btn-primary nav-cta" href="#contact">
            Contact Us
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container hero-shell">
            <img
              className="hero-bg"
              src="/hero-green-sofa.png"
              alt="Modern green commercial seating lounge"
            />
            <div className="hero-overlay">
              <p className="eyebrow">Established 1994 • Tampa, FL</p>
              <h1>Commercial Upholstery That Elevates High-Traffic Spaces</h1>
              <p className="lead">
                Custom upholstery and reupholstery for restaurants, hotels, healthcare, offices, schools, and
                transportation across Tampa Bay.
              </p>
              <div className="cta-row">
                <a className="btn btn-primary" href="#contact">
                  Get A Quote
                </a>
                <a className="btn btn-ghost" href="tel:+18134934640">
                  Call Now
                </a>
              </div>
              <div className="hero-tags" aria-label="key strengths">
                <span>Fast Turnaround</span>
                <span>Commercial Specialists</span>
                <span>Fireproofing Available</span>
              </div>
            </div>
            <aside className="hero-card hero-float-card">
              <h2>Customer service is our #1 priority</h2>
              <p>
                We help you restore and upgrade existing furniture with commercial-grade materials and one-on-one
                service from estimate through install.
              </p>
            </aside>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <p className="eyebrow">Industries we serve</p>
            <h2>Commercial upholstery for Tampa Bay industries</h2>
            <p className="section-lead">
              From local restaurants to hospitals and marine applications, we build durable upholstery solutions for
              high-traffic environments.
            </p>
            <div className="target-grid">
              {targetMarkets.map((item) => (
                <article className="target-card" key={item.title}>
                  <div className="target-icon" aria-hidden>
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <ImageCarousel images={serviceCarouselImages} label="Commercial upholstery project gallery" />
          </div>
        </section>

        <section id="fireproofing" className="section fireproof-section">
          <div className="container split">
            <div>
              <p className="eyebrow">Fire retardant services</p>
              <h2>Reliable fire protection for commercial spaces</h2>
              <p>
                Flame Stop fire protective coatings use intumescent, self-extinguishing chemistry to help slow flame
                spread and buy critical response time for occupants and first responders.
              </p>
              <p>
                These products are often ready to use and can typically be applied with low-pressure spray equipment,
                reducing labor compared to systems that require multiple high-pressure coats.
              </p>
              <ul className="fire-list">
                <li>Suitable for interior and exterior woods, foams, and most fabric types</li>
                <li>Can be applied as a top coat for 30-minute ratings on many wood applications</li>
                <li>Designed for longer protection, fewer applications, and better project economics</li>
              </ul>
              <img
                className="section-image fire-image"
                src={fireResistLogo}
                alt="Commercial interior with fire safety planning"
                loading="lazy"
              />
            </div>
            <div className="stats">
              <div>
                <strong>Used across high-traffic properties</strong>
                <span>Hotels, restaurants, theaters, churches, assisted living, parks, and office facilities.</span>
              </div>
              <div>
                <strong>Inspector-friendly fire protection</strong>
                <span>Fire retardants, caulks, and putties that support code-conscious project workflows.</span>
              </div>
              <div>
                <strong>Longer Protection</strong>
                <span>Penetrating formulations are designed to bond with substrate structure for longer service life.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-founder">
              <p className="eyebrow">Founder</p>
              <h2>Lamar Dula</h2>
              <p className="about-founder-tag">San Francisco Upholstery Group</p>
              <ul className="about-trust">
                <li>Family owned &amp; fully insured</li>
                <li>25+ years in reupholstery, refinishing &amp; redesign</li>
                <li>Tampa Bay, Florida &amp; Georgia</li>
              </ul>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                We focus on craftsmanship you can see and durability you can feel, from cushions to full seating
                programs, so your space stays comfortable and welcoming for clients and guests.
              </p>
              <p>
                Our designers help you choose fabrics, colors, and finishes that fit how the piece is used and what
                you want to spend. Every project is supervised from start to finish so the result matches your vision.
              </p>
              <p>
                Whether you need a single piece refreshed or commercial-scale work, you get clear communication,
                reliable timelines, and pricing that respects your budget.
              </p>
              <a className="btn btn-primary about-cta" href="#contact">
                Request a quote
              </a>
            </div>
          </div>
          {credLogos.length > 0 ? (
            <div className="cred-strip" aria-label="Client and partner credibility logos">
              {credLogos.map((src, idx) => (
                <div className="cred-logo-card" key={`${src}-${idx}`}>
                  <img className="cred-logo" src={src} alt={formatCredLogoName(src)} loading="lazy" />
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <section id="faq" className="section">
          <div className="container">
            <p className="eyebrow">FAQ</p>
            <h2>Tampa upholstery FAQ</h2>
            <div className="faq-list">
              <article>
                <h3>Do I need an appointment for upholstery in Tampa, and do you help with fabric selection?</h3>
                <p>
                  Yes, an appointment is highly recommended if you want pricing from an upholstery expert and guidance
                  on fabric choices. Our team helps Tampa clients choose colors, textures, finishes, and material
                  performance options that fit both function and budget.
                </p>
              </article>
              <article>
                <h3>How long does upholstery take, and what affects lead time?</h3>
                <p>
                  Lead times change weekly, but most projects run about 3 to 5 weeks after your fabric is received.
                  Final timing depends on project scope and workshop queue order, and we keep you updated throughout
                  your Tampa upholstery project.
                </p>
              </article>
              <article>
                <h3>Is my furniture worth reupholstering, and should old fabric be removed first?</h3>
                <p>
                  In most cases, yes, especially when the piece has a solid wood frame, remains sturdy, and has served
                  you well for years. We remove old fabric rather than covering over it, which helps prevent sliding,
                  premature wear, and visible soiling from bleeding through to new upholstery.
                </p>
              </article>
              <article>
                <h3>How do I get a labor-only quote for reupholstery in Tampa Bay?</h3>
                <p>
                  The fastest method is to email photos, dimensions, and a short work description to
                  info@sfug.pro. We provide free project estimates and can quote labor-only work quickly from clear
                  images and measurements.
                </p>
              </article>
              <article>
                <h3>What areas do you service, do you offer pickup and delivery, and how does payment work?</h3>
                <p>
                  We service Florida and Georgia, with Tampa-area pickup and delivery available locally at no extra
                  charge. For payment, we accept cash, check, Visa, MasterCard, and Discover, with half down and the
                  remaining balance due upon installation for cash or check orders.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section section-accent">
          <div className="container contact-block">
            <h2>Get a Tampa upholstery quote today</h2>
            <p>
              Tell us your industry, quantity, timeline, and if fireproofing is required. We will recommend the most
              practical path for budget, durability, and compliance.
            </p>
            <div className="contact-links">
              <a href="tel:+18134934640">813-493-4640</a>
              <a href="mailto:info@sfug.pro">info@sfug.pro</a>
            </div>
            <p className="address">15805 Knollview Dr, Tampa FL 33624</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
