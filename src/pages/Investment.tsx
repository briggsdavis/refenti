import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import FadeIn from "../components/FadeIn"
import LazyImage from "../components/LazyImage"

function Investment() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const assetClasses = [
    {
      title: "Residential",
      image: "/investment/investment-decor-1.webp",
      alt: "Residential development",
    },
    {
      title: "Mixed-Use",
      image: "/investment/investment-decor-2.webp",
      alt: "Mixed-use development",
    },
    {
      title: "Commercial & Serviced",
      image: "/investment/investment-decor-3.webp",
      alt: "Commercial development",
    },
  ]

  const developmentSteps = [
    {
      number: "01",
      title: "Opportunity Origination and Site Selection",
      description:
        "Identification of development sites and investment opportunities through market analysis and strategic positioning.",
      image: "/investment/vision.webp",
    },
    {
      number: "02",
      title: "Design, Structuring, and Feasibility",
      description:
        "Architectural development, financial structuring, and comprehensive feasibility assessment.",
      image: "/investment/clear-outlook.webp",
    },
    {
      number: "03",
      title: "Development and Construction Delivery",
      description:
        "Project execution with institutional-grade construction management and quality oversight.",
      image: "/investment/development.webp",
    },
    {
      number: "04",
      title: "Asset Stabilization and Optimization",
      description:
        "Lease-up, operational optimization, and positioning for long-term performance.",
      image: "/investment/management.webp",
    },
    {
      number: "05",
      title: "Long-term Management or Strategic Exit",
      description:
        "Active asset management and strategic capital allocation decisions aligned with market conditions.",
      image: "/investment/regional-presence.webp",
    },
  ]

  return (
    <div className="min-h-screen bg-refenti-offwhite">
      <Helmet>
        <title>Investment Opportunities - Refenti Group</title>
        <meta
          name="description"
          content="Explore precision-driven real estate investment opportunities with Refenti Group. Development, management, and strategic vision across residential, commercial, and mixed-use projects."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16 md:min-h-[90vh] md:pb-32">
        <img
          src="/investment/investment-hero.webp"
          alt="Investment Hero"
          fetchPriority="high"
          className="absolute top-[-5%] left-0 h-[110%] w-full object-cover"
          style={{
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-8">
          <div className="space-y-3 md:space-y-6">
            <h1 className="font-display text-6xl leading-none font-light text-refenti-charcoal uppercase md:text-9xl">
              Investment
            </h1>
            <p className="font-sans text-xs font-bold text-refenti-gold uppercase">
              Precision in Real Estate
            </p>
          </div>
        </div>
      </section>

      {/* Investment Mandate */}
      <section className="px-4 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl space-y-12">
          <FadeIn direction="up" duration={800}>
            <p className="text-xs font-bold tracking-wider text-refenti-gold uppercase">
              INVESTMENT MANDATE
            </p>
          </FadeIn>
          <FadeIn direction="up" duration={800} delay={100}>
            <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
              Investment & Development{" "}
              <span className="text-refenti-gold italic">Mandate</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" duration={800} delay={200}>
            <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
              <p>
                Refenti focuses on three core areas within urban real estate:
              </p>
              <ul className="space-y-4">
                <li>
                  • Urban residential developments positioned for long-term
                  demand
                </li>
                <li>
                  • Mixed-use and integrated assets that combine residential,
                  commercial, and community functions
                </li>
                <li>
                  • Select commercial and serviced real estate assets aligned
                  with operational capabilities
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Development Focus */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <FadeIn direction="up" duration={800}>
              <div className="group overflow-hidden rounded-[2rem]">
                <LazyImage
                  src="/investment/development.webp"
                  alt="Construction site development"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
                  Development{" "}
                  <span className="text-refenti-gold italic">Focus</span>
                </h2>
                <ul className="space-y-4 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  <li>
                    • Ground-up development and strategic repositioning of
                    existing assets
                  </li>
                  <li>
                    • Design-led approach with emphasis on architectural quality
                    and urban integration
                  </li>
                  <li>
                    • Institutional construction management and delivery
                    standards
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Asset Classes */}
      <section className="px-4 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn direction="up" duration={800}>
            <h2 className="mb-12 font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
              Asset <span className="text-refenti-gold italic">Classes</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {assetClasses.map((asset, idx) => (
              <FadeIn key={idx} direction="up" duration={800} delay={idx * 100}>
                <div className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <div className="aspect-[4/3] overflow-hidden">
                    <LazyImage
                      src={asset.image}
                      alt={asset.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-light text-refenti-charcoal uppercase">
                      {asset.title}
                    </h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Development Model */}
      <section className="px-4 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn direction="up" duration={800}>
            <h2 className="mb-16 font-display text-4xl leading-tight font-light text-refenti-charcoal uppercase md:text-6xl">
              Development{" "}
              <span className="text-refenti-gold italic">Model</span>
            </h2>
          </FadeIn>
          <div className="space-y-12">
            {developmentSteps.map((step, idx) => (
              <FadeIn
                key={idx}
                direction="right"
                duration={800}
                delay={idx * 100}
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                  <div className="md:col-span-7">
                    <div className="space-y-4">
                      <div className="text-3xl font-light text-refenti-gold">
                        {step.number}
                      </div>
                      <h3 className="font-display text-2xl font-light text-refenti-charcoal uppercase md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="leading-relaxed font-light text-refenti-charcoal md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <div className="group overflow-hidden rounded-[2rem]">
                      <LazyImage
                        src={step.image}
                        alt={step.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Presence */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="relative h-[60vh] md:h-[70vh]">
          {/* <img
            src="/investment/regional-presence.webp"
            alt="Regional urban development"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: `translateY(${-scrollY * 0.05}px)`,
              willChange: "transform",
            }}
          /> */}
          <div className="absolute inset-0 bg-refenti-charcoal/30" />
          <div className="relative z-10 flex h-full items-center justify-center px-4">
            <FadeIn direction="none" duration={1000}>
              <div className="max-w-3xl text-center">
                <h2 className="mb-6 font-display text-4xl leading-tight font-light text-white uppercase md:text-6xl">
                  Regional{" "}
                  <span className="text-refenti-gold italic">Presence</span>
                </h2>
                <p className="leading-relaxed font-light text-white md:text-xl">
                  Refenti maintains a selective approach to geographic
                  expansion, focusing on markets with strong fundamentals and
                  alignment with institutional investment criteria.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-8 pb-12 md:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-light text-refenti-charcoal">
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

export default Investment
