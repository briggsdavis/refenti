import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
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
        <img
          src={event.image}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          alt={event.title}
        />
      </div>
      <div className="px-2 pb-2">
        <p className="mb-2 text-[8px] font-bold tracking-ultra text-refenti-gold uppercase">
          {event.date}
        </p>
        <h3 className="mb-1 font-display text-xl font-light text-refenti-charcoal">
          {event.title}
        </h3>
        <p className="mb-4 text-[8px] font-bold tracking-extrawide text-gray-500 uppercase">
          {event.location}
        </p>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-[8px] font-bold tracking-ultra text-refenti-gold uppercase opacity-80 transition-opacity hover:opacity-100"
        >
          {isOpen ? "Close" : "View Details"}
        </button>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "mt-4 max-h-40 border-t border-gray-100 pt-4 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="text-justify text-[13px] leading-relaxed font-light text-gray-600">
            {event.details}
          </p>
        </div>
      </div>
    </div>
  )
}

function PhilosophySection() {
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      let p = (windowHeight - rect.top) / (windowHeight * 0.8)
      setProgress(Math.min(Math.max(p, 0), 1))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const archRadiusY = isMobile ? 150 - progress * 100 : 250 - progress * 200
  const baseRadius = isMobile ? "2.5rem" : "4rem"

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center bg-refenti-offwhite px-4 py-24 md:px-8 md:py-40"
    >
      <div
        className="relative w-full max-w-6xl overflow-hidden border border-gray-100 bg-white p-8 shadow-sm transition-all duration-700 ease-out md:p-20"
        style={{
          borderTopLeftRadius:
            progress >= 0.95 ? baseRadius : `${50}% ${archRadiusY}px`,
          borderTopRightRadius:
            progress >= 0.95 ? baseRadius : `${50}% ${archRadiusY}px`,
          borderBottomLeftRadius: baseRadius,
          borderBottomRightRadius: baseRadius,
        }}
      >
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6 md:space-y-12">
            <h2 className="font-display text-3xl leading-[1.1] font-light tracking-tight text-refenti-charcoal sm:text-4xl md:text-6xl">
              The Art of <br />{" "}
              <span className="text-refenti-gold italic">Urban</span> <br />{" "}
              Development.
            </h2>
            <p className="max-w-sm text-justify text-sm leading-relaxed font-light text-gray-600 md:text-base">
              Operating under Solstice Ventures Holding, Refenti manages
              structural ecosystems through architectural precision and
              high-standard delivery.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gray-50 shadow-sm md:rounded-[3rem]">
            <img
              src="/art.webp"
              className="h-full w-full object-cover opacity-90"
              alt="Interior"
            />
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
      <section className="relative flex min-h-[80vh] w-full items-end justify-center overflow-hidden bg-refenti-offwhite pb-16 md:min-h-screen md:pb-28">
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

        <div className="relative z-10 mx-auto max-w-6xl space-y-8 px-4 text-center sm:px-6 md:space-y-14">
          <div className="space-y-3 md:space-y-6">
            <img
              // src="/hero-text.png"
              src="/reftext.png"
              alt="Refenti Realty Group"
              className="mx-auto w-full max-w-3xl"
            />
            <p className="font-sans text-[7px] font-bold tracking-ultra text-refenti-gold uppercase opacity-90 md:text-[10px]">
              Refining urban landscapes
            </p>
          </div>
        </div>
      </section>

      <PhilosophySection />

      <section className="relative z-10 -mt-8 rounded-[2.5rem] border-t border-gray-50 bg-white px-4 py-20 shadow-sm sm:px-6 md:-mt-24 md:rounded-[6rem] md:px-12 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-24">
            <div className="space-y-1 text-center md:space-y-2 md:text-left">
              <h2 className="font-display text-5xl leading-none font-light tracking-tighter text-black uppercase select-none sm:text-6xl md:text-9xl">
                Portfolio
              </h2>
              <p className="font-sans text-[7px] font-bold tracking-ultra text-refenti-gold uppercase md:text-[8px]">
                The Collection
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-24">
            {projects.length > 0 && (
              <div className="group relative md:col-span-7">
                <Link to={`/projects/${projects[0].id}`} className="block">
                  <div className="aspect-video overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-lg md:rounded-[2.5rem]">
                    <img
                      src={projects[0].image}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                      alt={projects[0].name}
                    />
                  </div>
                </Link>
                <div className="mt-6 space-y-2 px-2 md:mt-10 md:space-y-4 md:px-4">
                  <h3 className="font-display text-2xl leading-none font-light text-refenti-charcoal md:text-4xl">
                    {projects[0].name}
                  </h3>
                  <p className="text-[7px] font-bold tracking-ultra text-refenti-gold uppercase opacity-80 md:text-[8px]">
                    {projects[0].assetClass}
                  </p>
                  <p className="max-w-md text-justify text-sm leading-relaxed font-light text-gray-600">
                    {projects[0].description}
                  </p>
                </div>
              </div>
            )}

            {projects.length > 1 && (
              <div className="group md:col-span-5 md:mt-32">
                <Link to={`/projects/${projects[1].id}`} className="block">
                  <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-lg">
                    <img
                      src={projects[1].image}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                      alt={projects[1].name}
                    />
                  </div>
                </Link>
                <div className="mt-6 space-y-2 px-2 md:mt-8 md:space-y-4 md:px-4">
                  <h3 className="font-display text-2xl leading-none font-light text-refenti-charcoal md:text-3xl">
                    {projects[1].name}
                  </h3>
                  <p className="text-[7px] font-bold tracking-ultra text-refenti-gold uppercase opacity-80 md:text-[8px]">
                    {projects[1].assetClass}
                  </p>
                  <p className="max-w-md text-justify text-sm leading-relaxed font-light text-gray-600">
                    {projects[1].description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-refenti-offwhite px-4 py-20 sm:px-6 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 space-y-2 text-center md:mb-16 md:space-y-3">
            <h2 className="font-display text-3xl font-light text-refenti-charcoal md:text-6xl">
              Featured Updates
            </h2>
            <p className="font-sans text-[8px] font-bold tracking-ultra text-refenti-gold uppercase opacity-80 md:text-[9px]">
              Current Milestones
            </p>
          </div>

          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
              {featuredEvents.map((event, idx) => (
                <EventCard key={event.id} event={event} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center font-display text-lg text-gray-500 italic md:text-xl">
              No recent updates at this moment.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
