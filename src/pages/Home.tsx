import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import FadeIn from "../components/FadeIn"
import LazyImage from "../components/LazyImage"
import { getEvents, getProjects } from "../lib/api"
import type { EventItem, Project } from "../types"

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="group rounded-4xl border border-gray-100 bg-white p-6 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-1000"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative mb-6 aspect-4/5 overflow-hidden rounded-3xl">
        <LazyImage
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-2 pb-2">
        <p className="mb-2 text-xs font-bold text-refenti-gold uppercase">
          {event.date}
        </p>
        <h3 className="mb-1 font-display text-xl font-light text-refenti-charcoal">
          {event.title}
        </h3>
        <p className="mb-4 text-xs font-bold text-gray-500 uppercase">
          {event.location}
        </p>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-bold text-refenti-gold uppercase opacity-80 transition-opacity hover:opacity-100"
        >
          {isOpen ? "Close" : "View Details"}
        </button>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "mt-4 max-h-40 border-t border-gray-100 pt-4 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="text-sm leading-relaxed font-light text-gray-600">
            {event.details}
          </p>
        </div>
      </div>
    </div>
  )
}

function IntroductionSection() {
  return (
    <section className="flex items-center justify-center bg-refenti-offwhite px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-4xl text-center">
        <FadeIn delay={100}>
          <p className="mx-auto max-w-3xl font-display text-xl leading-relaxed font-light text-refenti-charcoal md:text-2xl lg:text-3xl">
            Refenti Realty Group is a real estate investment and development
            platform focused on the creation of institutional-quality assets in
            select growth markets.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function DetailedSection() {
  return (
    <section className="bg-refenti-offwhite px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm md:rounded-[4rem] md:p-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <FadeIn delay={100}>
              <p className="text-base leading-relaxed font-light text-gray-700 md:text-lg">
                The platform operates with a long-term orientation, disciplined
                capital deployment, and a structured development approach
                designed to support governance, execution certainty, and
                long-term asset performance.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-base leading-relaxed font-light text-gray-700 md:text-lg">
                Refenti operates under{" "}
                <a
                  href="https://solstice-ventures-beta.webflow.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-refenti-gold transition-colors hover:underline"
                >
                  Solstice Ventures Holding (SVH)
                </a>{" "}
                and serves as a public, non-operational institutional reference
                point.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [projects, setProjects] = useState<Project[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })

    const fetchData = async () => {
      const [projectsResult, eventsResult] = await Promise.all([
        getProjects(),
        getEvents(),
      ])

      if (projectsResult.error) {
        console.error("Failed to load projects:", projectsResult.error.message)
      } else {
        setProjects(projectsResult.data)
      }

      if (eventsResult.error) {
        console.error("Failed to load events:", eventsResult.error.message)
      } else {
        setFeaturedEvents(eventsResult.data.filter((e) => e.isFeatured))
      }

      setLoading(false)
    }
    fetchData()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="overflow-hidden bg-refenti-offwhite">
      <Helmet>
        <title>Refenti Group - Premium Real Estate Development</title>
        <meta
          name="description"
          content="Refenti Group specializes in luxury real estate development across residential, mixed-use, commercial, and hospitality sectors. Precision-driven urban destinations in Ethiopia and Dubai."
        />
      </Helmet>
      <section className="relative flex min-h-[80vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-12 md:min-h-screen md:pb-20">
        <div
          className="absolute inset-[-5%]"
          style={{
            backgroundImage: `url('/home-hero.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: "transform",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl space-y-3 px-4 text-center sm:px-6 md:space-y-6">
          <FadeIn direction="none" duration={1000} delay={1000}>
            <img
              src="/reftext.png"
              alt="Refenti Realty Group"
              className="mx-auto w-full max-w-3xl"
            />
          </FadeIn>
          <FadeIn direction="none" duration={1000} delay={1300}>
            <p className="font-sans text-xs font-bold text-refenti-gold uppercase opacity-90 md:text-sm">
              Refining urban landscapes
            </p>
          </FadeIn>
        </div>
      </section>

      <IntroductionSection />

      <DetailedSection />

      <section className="relative z-10 -mt-6 rounded-[2.5rem] border-t border-gray-50 bg-white px-4 py-14 shadow-sm sm:px-6 md:-mt-16 md:rounded-[6rem] md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-20">
            <FadeIn>
              <div className="space-y-1 text-center md:space-y-2 md:text-left">
                <h2 className="font-display text-5xl leading-none font-light text-black uppercase select-none sm:text-6xl md:text-9xl">
                  Portfolio
                </h2>
              </div>
            </FadeIn>

            <div className="mt-8 grid items-center gap-8 md:mt-12 md:grid-cols-2 md:gap-12">
              <FadeIn delay={100}>
                <p className="text-base leading-relaxed font-light text-gray-700 md:text-lg">
                  Refenti's portfolio represents the application of a consistent
                  investment and development logic across a selective set of real
                  estate assets. Each project reflects how the platform originates,
                  structures, and stewards assets with a primary focus on long-term
                  capital appreciation, supported by disciplined execution and
                  operational resilience.
                </p>
              </FadeIn>
              <FadeIn delay={200} direction="right">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-gray-50 shadow-sm md:rounded-[2.5rem]">
                  <img
                    src="/art.webp"
                    className="h-full w-full object-cover opacity-90"
                    alt="Portfolio"
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16">
            {projects.length > 0 && (
              <div className="group relative md:col-span-7">
                <FadeIn delay={100} direction="left">
                  <Link to={`/projects/${projects[0].id}`} className="block">
                    <div className="aspect-video overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-lg md:rounded-[2.5rem]">
                      <LazyImage
                        src={projects[0].image}
                        alt={projects[0].name}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </FadeIn>
                <FadeIn delay={200}>
                  <div className="mt-6 space-y-2 px-2 md:mt-10 md:space-y-4 md:px-4">
                    <h3 className="font-display text-2xl leading-none font-light text-refenti-charcoal md:text-4xl">
                      {projects[0].name}
                    </h3>
                    <p className="text-xs font-bold text-refenti-gold uppercase opacity-80">
                      {projects[0].assetClass}
                    </p>
                    <p className="max-w-md text-sm leading-relaxed font-light text-gray-600">
                      {projects[0].description}
                    </p>
                  </div>
                </FadeIn>
              </div>
            )}

            {projects.length > 1 && (
              <div className="group md:col-span-5 md:mt-32">
                <FadeIn delay={200} direction="right">
                  <Link to={`/projects/${projects[1].id}`} className="block">
                    <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-lg">
                      <LazyImage
                        src={projects[1].image}
                        alt={projects[1].name}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </FadeIn>
                <FadeIn delay={300}>
                  <div className="mt-6 space-y-2 px-2 md:mt-8 md:space-y-4 md:px-4">
                    <h3 className="font-display text-2xl leading-none font-light text-refenti-charcoal md:text-3xl">
                      {projects[1].name}
                    </h3>
                    <p className="text-xs font-bold text-refenti-gold uppercase opacity-80">
                      {projects[1].assetClass}
                    </p>
                    <p className="max-w-md text-sm leading-relaxed font-light text-gray-600">
                      {projects[1].description}
                    </p>
                  </div>
                </FadeIn>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-refenti-offwhite px-4 py-14 sm:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-8 space-y-4 text-center md:mb-10 md:space-y-6">
              <div className="space-y-2 md:space-y-3">
                <h2 className="font-display text-3xl font-light text-refenti-charcoal md:text-6xl">
                  Featured Updates
                </h2>
                <p className="font-sans text-xs font-bold text-refenti-gold uppercase opacity-80">
                  Current Milestones
                </p>
              </div>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 rounded-full border border-refenti-gold/30 bg-white px-6 py-3 text-xs font-bold text-refenti-gold uppercase shadow-sm transition-all duration-300 hover:border-refenti-gold hover:bg-refenti-gold hover:text-white hover:shadow-md"
              >
                View All News & Events
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </FadeIn>

          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
              {featuredEvents.map((event, idx) => (
                <FadeIn key={event.id} delay={idx * 150}>
                  <EventCard event={event} index={idx} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn delay={200}>
              <div className="py-20 text-center font-display text-lg text-gray-500 italic md:text-xl">
                No recent updates at this moment.
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
