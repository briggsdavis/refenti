import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import FadeIn from "../components/FadeIn"
import LazyImage from "../components/LazyImage"
import { priorityManager } from "../lib/priorityManager"
import { usePageContent } from "../lib/usePageContent"
import type { AboutContent } from "../types"

function About() {
  const [scrollY, setScrollY] = useState(0)

  const defaults: AboutContent = {
    heroImage: "/a.jpg",
    heroTitle: "About",
    heroSubtitle: "Institutional Real Estate Platform",
    visionHeading: "Vision",
    visionText:
      "To operate as a disciplined, scalable real estate investment and development platform aligned with long-term capital and institutional stakeholders.",
    missionHeading: "Mission",
    missionText:
      "To develop and steward real estate assets with a primary focus on long-term capital appreciation, applying institutional standards of governance, quality, and discipline in structurally undersupplied markets.",
    valuesHeading: "Values",
    values: [
      {
        title: "Governance discipline",
        description: "Institutional standards and oversight frameworks",
      },
      {
        title: "Execution certainty",
        description: "Reliable delivery on commitments and timelines",
      },
      {
        title: "Structured risk management",
        description:
          "Systematic approach to identifying and mitigating risk",
      },
      {
        title: "Long-term orientation",
        description: "Focus on sustained capital appreciation",
      },
    ],
    originHeading: "Origin & Philosophy",
    originImage: "/drone.jpg",
    originBody:
      "Refenti Realty Group was established as a platform-led real estate investment and development entity, intentionally structured to support long-term capital appreciation.\n\nThe platform prioritizes governance discipline, repeatability, and institutional alignment over opportunistic or project-led development. Projects are originated and developed within a consistent framework designed to support scalability, execution certainty, and long-term stewardship across diverse assets and market cycles.",
    governanceLabel: "GOVERNANCE",
    governanceHeading: "Governance",
    governanceBody:
      "Refenti Realty Group operates under Solstice Ventures Holding (SVH).\n\nThe platform aligns with group-level governance standards, oversight mechanisms, and institutional controls established by SVH. This alignment supports accountability, consistency, and disciplined capital deployment across the platform.",
  }
  const { content } = usePageContent("about", defaults)

  useEffect(() => {
    // Set viewport priority
    priorityManager.setViewport("about")

    // Preload critical hero image immediately
    priorityManager.preloadImage(content.heroImage, "critical")

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>
          About Refenti Realty Group - Institutional Real Estate Platform
        </title>
        <meta
          name="description"
          content="Refenti Realty Group is an institutional real estate platform operating under Solstice Ventures Holding, focused on development, investment, and management of urban real estate assets."
        />
        <link rel="preload" as="image" href={content.heroImage} fetchpriority="high" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full items-end justify-center overflow-hidden pb-6 md:pb-10">
        <img
          src={content.heroImage}
          alt="About Hero"
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

      {/* Section 1: Mission, Vision, Values */}
      <section className="overflow-hidden px-4 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Vision - Left aligned, rounded right */}
          <FadeIn direction="up" duration={800}>
            <div className="flex justify-start">
              <div className="w-full max-w-xl bg-white px-8 py-8 text-center shadow-2xl md:px-12 md:py-10">
                <div className="mx-auto flex flex-col items-center space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-refenti-gold opacity-40 shadow-lg md:h-12 md:w-12">
                    <svg
                      className="h-5 w-5 text-white md:h-6 md:w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-2xl font-light text-black uppercase md:text-3xl">
                    {content.visionHeading}
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed font-light text-refenti-charcoal/80 ">
                    "{content.visionText}"
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Mission - Right aligned, rounded left */}
          <FadeIn direction="up" duration={800} delay={100}>
            <div className="flex justify-end">
              <div className="w-full max-w-xl bg-white px-8 py-8 text-center shadow-2xl md:px-12 md:py-10">
                <div className="mx-auto flex flex-col items-center space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-refenti-gold opacity-40 shadow-lg md:h-12 md:w-12">
                    <svg
                      className="h-5 w-5 text-white md:h-6 md:w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-2xl font-light text-black uppercase md:text-3xl">
                    {content.missionHeading}
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed font-light text-refenti-charcoal/80 ">
                    "{content.missionText}"
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Values */}
          <FadeIn direction="up" duration={800} delay={200}>
            <div className="space-y-8 pt-16">
              <h2 className="text-center font-display text-3xl leading-tight font-light tracking-wide text-refenti-gold uppercase md:text-4xl">
                {content.valuesHeading}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {content.values.map((item, idx) => {
                  const iconPaths = [
                    // Governance discipline – shield with check
                    "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
                    // Execution certainty – circle check
                    "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                    // Structured risk management – bar chart
                    "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
                    // Long-term orientation – trending up
                    "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
                  ]
                  return (
                    <div
                      key={idx}
                      className="bg-white px-8 py-8 text-center shadow-2xl"
                    >
                      <div className="mx-auto flex flex-col items-center space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-refenti-gold opacity-40 shadow-lg md:h-12 md:w-12">
                          <svg
                            className="h-5 w-5 text-white md:h-6 md:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d={iconPaths[idx]}
                            />
                          </svg>
                        </div>
                        <p className="font-display text-lg font-light text-refenti-charcoal uppercase md:text-xl">
                          {item.title}
                        </p>
                        <p className="text-xs leading-relaxed font-light text-refenti-charcoal/60 md:text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 2: Origin & Platform Philosophy */}
      <section className="px-4 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <FadeIn direction="up" duration={800}>
              <div className="group overflow-hidden">
                <LazyImage
                  src={content.originImage}
                  alt="Aerial view of real estate development"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={100}>
              <div className="space-y-8">
                <h2 className="font-display text-3xl leading-tight font-light text-black uppercase md:text-5xl">
                  {content.originHeading}
                </h2>
                <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                  {content.originBody.split("\n\n").map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 3: Governance */}
      <section className="px-4 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn direction="none" duration={1000}>
            <div className="space-y-8 bg-white px-8 py-12 shadow-2xl md:px-16 md:py-20">
              <p className="text-xs font-bold tracking-wider text-refenti-gold uppercase">
                {content.governanceLabel}
              </p>
              <h2 className="font-display text-3xl leading-tight font-light text-black uppercase md:text-5xl">
                {content.governanceHeading}
              </h2>
              <div className="space-y-6 leading-relaxed font-light text-refenti-charcoal md:text-lg">
                {content.governanceBody.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}

export default About
