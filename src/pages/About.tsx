import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import FadeIn from "../components/FadeIn"
import LazyImage from "../components/LazyImage"

function About() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      <Helmet>
        <title>
          About Refenti Realty Group - Institutional Real Estate Platform
        </title>
        <meta
          name="description"
          content="Refenti Realty Group is an institutional real estate platform operating under Solstice Ventures Holding, focused on development, investment, and management of urban real estate assets."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16 md:min-h-[90vh] md:pb-32">
        <img
          src="/about/about-hero.webp"
          alt="About Hero"
          fetchPriority="high"
          className="absolute top-[-5%] left-0 h-[110%] w-full object-cover"
          style={{
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-8">
          <FadeIn direction="none" duration={1000}>
            <div className="space-y-3 md:space-y-6">
              <h1 className="font-display text-6xl leading-none font-light text-refenti-charcoal uppercase md:text-9xl">
                About
              </h1>
              <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
                Institutional Real Estate Platform
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Company Overview */}
      <section className="px-4 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl space-y-12">
          <FadeIn direction="up" duration={800}>
            <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
              Who We <span className="text-refenti-gold italic">Are</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" duration={800} delay={100}>
            <p className="leading-relaxed font-light text-refenti-charcoal md:text-lg">
              Refenti Realty Group is a real estate investment and development
              platform operating under the governance framework of Solstice
              Ventures Holding. We are focused on the development, investment,
              and management of urban real estate assets across residential,
              mixed-use, and select commercial and serviced real estate sectors.
            </p>
          </FadeIn>
          <FadeIn direction="up" duration={800} delay={200}>
            <h3 className="font-display text-3xl leading-tight font-light text-refenti-charcoal uppercase md:text-5xl">
              What We{" "}
              <span className="text-refenti-gold italic">Stand For</span>
            </h3>
          </FadeIn>
          <FadeIn direction="up" duration={800} delay={300}>
            <ul className="space-y-4 leading-relaxed font-light text-refenti-charcoal md:text-lg">
              <li>• Institutional-grade delivery and operational standards</li>
              <li>
                • Design and quality-led approach to real estate development
              </li>
              <li>• Mixed-use and integrated assets that serve communities</li>
              <li>• Active operations and asset management</li>
              <li>• Long-term value creation and strategic positioning</li>
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Our Approach */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <FadeIn direction="up" duration={800}>
              <div className="group overflow-hidden rounded-[2rem]">
                <LazyImage
                  src="/about/about-decor-1.webp"
                  alt="Mixed-use building architecture"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                  Our <span className="text-refenti-gold italic">Approach</span>
                </h2>
                <ul className="space-y-4 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  <li>
                    • Institutional-grade delivery and operational standards
                  </li>
                  <li>
                    • Design and quality-led approach to real estate development
                  </li>
                  <li>
                    • Mixed-use and integrated assets that serve communities
                  </li>
                  <li>• Active operations and asset management</li>
                  <li>• Long-term value creation and strategic positioning</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Governance & SVH Alignment */}
      <section className="px-4 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn direction="none" duration={1000}>
            <div className="space-y-8 rounded-[2rem] border border-gray-100 bg-white px-8 py-12 shadow-lg md:px-16 md:py-20">
              <p className="text-xs font-bold tracking-wider text-refenti-gold uppercase">
                GOVERNANCE
              </p>
              <h2 className="font-display text-3xl leading-tight font-light text-refenti-charcoal uppercase md:text-5xl">
                Refenti Realty Group operates under the governance framework of{" "}
                <span className="text-refenti-gold italic">
                  Solstice Ventures Holding
                </span>
              </h2>
              <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                <p>
                  This governance structure provides access to institutional
                  capital allocation frameworks, governance structures that
                  support long-term asset positioning, and platform continuity
                  across market cycles.
                </p>
                <p>
                  Operating under SVH enables Refenti to maintain alignment with
                  institutional standards while pursuing measured growth in
                  select markets.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-4 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FadeIn direction="up" duration={800}>
            <div className="space-y-8 text-center">
              <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                Our <span className="text-refenti-gold italic">Philosophy</span>
              </h2>
              <p className="leading-relaxed font-light text-refenti-charcoal italic md:text-xl">
                "We believe real estate assets should be conceived with
                durability, designed with care, and operated with institutional
                discipline. Value is created through deliberate positioning,
                quality execution, and long-term stewardship."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Visual Portfolio Showcase */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/about/about-decor-2.webp", alt: "Architectural detail" },
              { src: "/about/about-decor-3.webp", alt: "Building exterior" },
              { src: "/about/about-decor-4.webp", alt: "Modern interior" },
              { src: "/about/about-decor-5.webp", alt: "Urban development" },
            ].map((image, idx) => (
              <FadeIn key={idx} direction="up" duration={800} delay={idx * 150}>
                <div className="group overflow-hidden rounded-[2rem]">
                  <LazyImage
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[4/3] w-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0"
                    transition="transition-all duration-500"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-4 pt-8 pb-12 md:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-light text-refenti-charcoal">
            Refenti Realty Group is a real estate investment and development
            platform operating under{" "}
            <a
              href="https://solsticeventures.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-refenti-gold italic transition-opacity hover:opacity-70"
            >
              Solstice Ventures Holding
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}

export default About
