import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import FadeIn from "../components/FadeIn"
import LazyImage from "../components/LazyImage"
import { priorityManager } from "../lib/priorityManager"
import { usePageContent } from "../lib/usePageContent"
import type { InvestmentContent } from "../types"

function Investment() {
  const [scrollY, setScrollY] = useState(0)

  const defaults: InvestmentContent = {
    heroImage: "/i.jpg",
    heroTitle: "Investment",
    heroSubtitle: "Institutional Real Estate Platform",
    approachLabel: "INVESTMENT APPROACH",
    approachHeading: "Institutional-Grade Real Estate",
    approachBody:
      "RRG originates, develops, and manages real estate assets that meet institutional standards of quality, risk management, and long-term value creation. The platform focuses on assets with durable demand, clear governance, and long-term income stability.\n\nInvestment decisions are made with a long-term perspective, emphasizing disciplined governance, execution certainty, conservative underwriting, and resilience across market cycles.",
    developHeading: "How We Develop",
    developImage: "/replacement.jpg",
    developBody:
      "RRG operates as an integrated development platform, retaining strategic control over concept definition, asset strategy, structuring, and delivery oversight.",
    developBullets: [
      "Core development leadership, design coordination, asset stewardship, and investment structuring are managed in-house.",
      "Construction and specialized services are delivered through vetted partners under defined performance and risk frameworks.",
      "Delivery follows phased execution, disciplined cost control, and conservative assumptions.",
    ],
    riskLabel: "RISK MANAGEMENT",
    riskHeading: "Disciplined Risk Framework",
    riskCategories: [
      {
        title: "Execution",
        description:
          "Integrated oversight, experienced partners, phased construction",
      },
      {
        title: "Financing",
        description:
          "Conservative structuring, diversified funding, aligned timelines",
      },
      {
        title: "Market",
        description:
          "Demand-driven asset selection, disciplined positioning, phased releases",
      },
    ],
    qualityHeading: "Quality & Governance",
    qualityImage: "/governance.jpg",
    qualityBody:
      "RRG operates to institutional-grade standards across governance, delivery, and asset quality:",
    qualityBullets: [
      "Strong governance, transparency, and reporting discipline",
      "Disciplined capital and cost management",
      "High design, engineering, and construction standards",
      "Reliable delivery through phased execution",
      "Assets designed for long-term operational performance",
    ],
    assetClassesHeading: "Asset Classes",
    assetClassesIntro:
      "RRG focuses on asset classes with resilient demand and long-term income potential:",
    assetClasses: [
      { name: "Residential", image: "/resident.jpg" },
      { name: "Mixed-Use", image: "/mixed-use.jpg" },
      { name: "Commercial & Serviced", image: "/commercial.jpg" },
      { name: "Serviced Apartments", image: "/serviced-apartements.jpg" },
      { name: "Hospitality", image: "/hospitality.jpg" },
    ],
    structuresHeading: "Investment Structures",
    structuresBody:
      "Investment structures are tailored to project context and partner alignment, including:",
    structuresBullets: [
      "Joint ventures and co-development",
      "Own-balance-sheet development",
      "EPC+F or other structured delivery models",
    ],
  }
  const { content } = usePageContent("investment", defaults)

  useEffect(() => {
    // Set viewport priority
    priorityManager.setViewport("investment")

    // Preload critical hero image immediately
    priorityManager.preloadImage(content.heroImage, "critical")

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [content.heroImage])

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Investment Approach - Refenti Realty Group</title>
        <meta
          name="description"
          content="Institutional real estate investment platform. RRG's disciplined approach to development, risk management, and governance across residential, commercial, and mixed-use assets."
        />
        <link
          rel="preload"
          as="image"
          href={content.heroImage}
          fetchpriority="high"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full items-end justify-center overflow-hidden pb-6 md:pb-10">
        <img
          src={content.heroImage}
          alt="Investment Hero"
          fetchPriority="high"
          className="absolute top-[-5%] left-0 h-[110%] w-full animate-fade-in object-cover"
          style={{
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: "transform",
            animationDuration: "1200ms",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 text-center md:space-y-8">
          <div className="space-y-3 md:space-y-6">
            <FadeIn direction="none" duration={1000} delay={1000}>
              <h1 className="font-display text-6xl leading-none font-semibold text-white uppercase md:text-9xl">
                {content.heroTitle}
              </h1>
            </FadeIn>
            <FadeIn direction="none" duration={1000} delay={1300}>
              <p className="font-sans text-lg font-bold text-refenti-gold uppercase">
                {content.heroSubtitle}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Investment Approach */}
      <section className="px-4 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl space-y-12">
          <FadeIn direction="up" duration={800}>
            <p className="text-xs font-bold tracking-wider text-refenti-gold uppercase">
              {content.approachLabel}
            </p>
          </FadeIn>
          <FadeIn direction="up" duration={800} delay={100}>
            <h2 className="font-display text-4xl leading-tight font-light text-black uppercase md:text-6xl">
              {content.approachHeading}
            </h2>
          </FadeIn>
          <FadeIn direction="up" duration={800} delay={200}>
            <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
              {content.approachBody.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How We Develop */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <FadeIn direction="up" duration={800}>
              <div className="group overflow-hidden">
                <LazyImage
                  src={content.developImage}
                  alt="Development process"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl leading-tight font-light text-black uppercase md:text-6xl">
                  {content.developHeading}
                </h2>
                <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  <p>{content.developBody}</p>
                  <ul className="space-y-4">
                    {content.developBullets.map((bullet, idx) => (
                      <li key={idx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Managing Risk */}
      <section className="px-4 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn direction="none" duration={1000}>
            <div className="space-y-12 border border-gray-100 bg-white px-8 py-12 shadow-lg md:px-16 md:py-20">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-wider text-refenti-gold uppercase">
                  {content.riskLabel}
                </p>
                <h2 className="font-display text-3xl leading-tight font-light text-black uppercase md:text-5xl">
                  {content.riskHeading}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {content.riskCategories.map((category, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="font-display text-xl font-bold text-black uppercase">
                      {category.title}
                    </h3>
                    <p className="leading-relaxed font-light text-refenti-charcoal">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quality & Governance */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <FadeIn direction="up" duration={800}>
              <div className="space-y-8">
                <h2 className="font-display text-4xl leading-tight font-light text-black uppercase md:text-6xl">
                  {content.qualityHeading}
                </h2>
                <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  <p>{content.qualityBody}</p>
                  <ul className="space-y-4">
                    {content.qualityBullets.map((bullet, idx) => (
                      <li key={idx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="group overflow-hidden">
                <LazyImage
                  src={content.qualityImage}
                  alt="Quality and governance"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Assets & Structures */}
      <section className="px-4 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Asset Classes */}
          <div className="space-y-12">
            <FadeIn direction="up" duration={800}>
              <h2 className="font-display text-4xl leading-tight font-light text-black uppercase md:text-6xl">
                {content.assetClassesHeading}
              </h2>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <p className="leading-relaxed font-light text-refenti-charcoal md:text-lg">
                {content.assetClassesIntro}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              {content.assetClasses.map((asset, idx) => (
                <FadeIn
                  key={idx}
                  direction="up"
                  duration={800}
                  delay={idx * 100}
                  className="h-full"
                >
                  <div className="group flex h-full flex-col overflow-hidden border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                    <div className="aspect-[16/27] overflow-hidden">
                      <LazyImage
                        src={asset.image}
                        alt={asset.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-light text-black uppercase md:text-2xl">
                        {asset.name}
                      </h3>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Investment Structures */}
          <div className="space-y-8">
            <FadeIn direction="up" duration={800}>
              <h2 className="font-display text-4xl leading-tight font-light text-black uppercase md:text-6xl">
                {content.structuresHeading}
              </h2>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-6 border border-gray-100 bg-white px-8 py-10 shadow-sm md:px-12">
                <p className="leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  {content.structuresBody}
                </p>
                <ul className="space-y-4 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  {content.structuresBullets.map((bullet, idx) => (
                    <li key={idx}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Investment
