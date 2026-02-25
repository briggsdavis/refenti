import { useEffect, useState } from "react"
import FileUpload from "../components/FileUpload"
import { getPageContent, updatePageContent } from "../lib/api"
import { uploadPageImage, validateImageFile } from "../lib/storage"
import type {
  AboutContent,
  ContactContent,
  EventsNewsContent,
  HomeContent,
  InvestmentContent,
  ProjectsContent,
} from "../types"

const PAGES = [
  { slug: "home", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "investment", label: "Investment" },
  { slug: "projects", label: "Projects" },
  { slug: "contact", label: "Contact" },
  { slug: "events-news", label: "Events & News" },
] as const

type PageSlug = (typeof PAGES)[number]["slug"]

function AdminContent() {
  const [activeTab, setActiveTab] = useState<PageSlug>("home")
  const [content, setContent] = useState<Record<string, unknown>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  useEffect(() => {
    setLoading(true)
    setMessage(null)
    const fetch = async () => {
      const { data, error } = await getPageContent(activeTab)
      if (error) {
        setContent({})
      } else {
        setContent(data.content)
      }
      setLoading(false)
    }
    fetch()
  }, [activeTab])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    const { error } = await updatePageContent(activeTab, content)
    setSaving(false)
    if (error) {
      setMessage({ type: "error", text: error.message })
    } else {
      setMessage({ type: "success", text: "Saved" })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const set = (key: string, value: unknown) => {
    setContent((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-2xl font-light">Page Content</h1>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {PAGES.map((p) => (
          <button
            key={p.slug}
            onClick={() => setActiveTab(p.slug)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === p.slug
                ? "bg-refenti-gold text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-8">
          {activeTab === "home" && (
            <HomeForm
              content={content as unknown as HomeContent}
              set={set}
              pageSlug={activeTab}
            />
          )}
          {activeTab === "about" && (
            <AboutForm
              content={content as unknown as AboutContent}
              set={set}
              pageSlug={activeTab}
            />
          )}
          {activeTab === "investment" && (
            <InvestmentForm
              content={content as unknown as InvestmentContent}
              set={set}
              pageSlug={activeTab}
            />
          )}
          {activeTab === "projects" && (
            <ProjectsForm
              content={content as unknown as ProjectsContent}
              set={set}
              pageSlug={activeTab}
            />
          )}
          {activeTab === "contact" && (
            <ContactForm
              content={content as unknown as ContactContent}
              set={set}
              pageSlug={activeTab}
            />
          )}
          {activeTab === "events-news" && (
            <EventsNewsForm
              content={content as unknown as EventsNewsContent}
              set={set}
              pageSlug={activeTab}
            />
          )}

          {/* Save */}
          <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-refenti-charcoal px-8 py-3 text-sm font-bold text-white uppercase transition-colors hover:bg-refenti-gold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {message && (
              <span
                className={`text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
              >
                {message.text}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Shared field components

function TextField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-500 uppercase">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-refenti-gold focus:outline-none"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-refenti-gold focus:outline-none"
        />
      )}
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h3 className="border-b border-gray-100 pb-2 text-lg font-light text-refenti-charcoal">
      {children}
    </h3>
  )
}

function ImageField({
  label,
  value,
  pageSlug,
  section,
  onChange,
}: {
  label: string
  value: string
  pageSlug: string
  section: string
  onChange: (url: string) => void
}) {
  return (
    <FileUpload
      label={label}
      value={value || ""}
      onChange={onChange}
      accept="image/*"
      uploadFn={(file) => uploadPageImage(pageSlug, section, file)}
      validator={validateImageFile}
      uniqueId={`${pageSlug}-${section}`}
    />
  )
}

// Array editor for {title, description} pairs
function PairArrayEditor({
  label,
  items,
  onChange,
  titleLabel = "Title",
  descLabel = "Description",
}: {
  label: string
  items: { title: string; description: string }[]
  onChange: (items: { title: string; description: string }[]) => void
  titleLabel?: string
  descLabel?: string
}) {
  const arr = items || []
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-500 uppercase">
        {label}
      </label>
      {arr.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={item.title}
            placeholder={titleLabel}
            onChange={(e) => {
              const next = [...arr]
              next[idx] = { ...next[idx], title: e.target.value }
              onChange(next)
            }}
            className="w-1/3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-refenti-gold focus:outline-none"
          />
          <input
            type="text"
            value={item.description}
            placeholder={descLabel}
            onChange={(e) => {
              const next = [...arr]
              next[idx] = { ...next[idx], description: e.target.value }
              onChange(next)
            }}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-refenti-gold focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onChange(arr.filter((_, i) => i !== idx))}
            className="rounded-lg px-3 py-2 text-xs text-red-400 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...arr, { title: "", description: "" }])}
        className="text-xs font-bold text-refenti-gold uppercase hover:underline"
      >
        + Add
      </button>
    </div>
  )
}

// Array editor for string[]
function StringArrayEditor({
  label,
  items,
  onChange,
}: {
  label: string
  items: string[]
  onChange: (items: string[]) => void
}) {
  const arr = items || []
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-500 uppercase">
        {label}
      </label>
      {arr.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...arr]
              next[idx] = e.target.value
              onChange(next)
            }}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-refenti-gold focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onChange(arr.filter((_, i) => i !== idx))}
            className="rounded-lg px-3 py-2 text-xs text-red-400 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...arr, ""])}
        className="text-xs font-bold text-refenti-gold uppercase hover:underline"
      >
        + Add
      </button>
    </div>
  )
}

// Array editor for {label, value} pairs (contact items)
function LabelValueArrayEditor({
  label,
  items,
  onChange,
}: {
  label: string
  items: { label: string; value: string }[]
  onChange: (items: { label: string; value: string }[]) => void
}) {
  const arr = items || []
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-500 uppercase">
        {label}
      </label>
      {arr.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={item.label}
            placeholder="Label"
            onChange={(e) => {
              const next = [...arr]
              next[idx] = { ...next[idx], label: e.target.value }
              onChange(next)
            }}
            className="w-1/3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-refenti-gold focus:outline-none"
          />
          <input
            type="text"
            value={item.value}
            placeholder="Value"
            onChange={(e) => {
              const next = [...arr]
              next[idx] = { ...next[idx], value: e.target.value }
              onChange(next)
            }}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-refenti-gold focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onChange(arr.filter((_, i) => i !== idx))}
            className="rounded-lg px-3 py-2 text-xs text-red-400 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...arr, { label: "", value: "" }])}
        className="text-xs font-bold text-refenti-gold uppercase hover:underline"
      >
        + Add
      </button>
    </div>
  )
}

// Asset classes editor with image
function AssetClassEditor({
  items,
  onChange,
  pageSlug,
}: {
  items: { name: string; image: string }[]
  onChange: (items: { name: string; image: string }[]) => void
  pageSlug: string
}) {
  const arr = items || []
  return (
    <div className="space-y-4">
      <label className="text-xs font-bold text-gray-500 uppercase">
        Asset Classes
      </label>
      {arr.map((item, idx) => (
        <div
          key={idx}
          className="space-y-3 rounded-lg border border-gray-100 bg-white p-4"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={item.name}
              placeholder="Name"
              onChange={(e) => {
                const next = [...arr]
                next[idx] = { ...next[idx], name: e.target.value }
                onChange(next)
              }}
              className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-refenti-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={() => onChange(arr.filter((_, i) => i !== idx))}
              className="rounded-lg px-3 py-2 text-xs text-red-400 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
          <ImageField
            label={`${item.name || "Asset"} Image`}
            value={item.image}
            pageSlug={pageSlug}
            section={`asset-class-${idx}`}
            onChange={(url) => {
              const next = [...arr]
              next[idx] = { ...next[idx], image: url }
              onChange(next)
            }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...arr, { name: "", image: "" }])}
        className="text-xs font-bold text-refenti-gold uppercase hover:underline"
      >
        + Add Asset Class
      </button>
    </div>
  )
}

// Page-specific forms

interface FormProps<T> {
  content: T
  set: (key: string, value: unknown) => void
  pageSlug: string
}

function HomeForm({ content: c, set, pageSlug }: FormProps<HomeContent>) {
  return (
    <>
      <SectionLabel>Hero</SectionLabel>
      <ImageField
        label="Hero Image"
        value={c.heroImage}
        pageSlug={pageSlug}
        section="hero"
        onChange={(url) => set("heroImage", url)}
      />
      <TextField
        label="Hero Tagline"
        value={c.heroTagline}
        onChange={(v) => set("heroTagline", v)}
      />

      <SectionLabel>Philosophy Section</SectionLabel>
      <TextField
        label="Heading"
        value={c.philosophyHeading}
        onChange={(v) => set("philosophyHeading", v)}
      />
      <TextField
        label="Body"
        value={c.philosophyBody}
        onChange={(v) => set("philosophyBody", v)}
        multiline
      />
      <ImageField
        label="Philosophy Image"
        value={c.philosophyImage}
        pageSlug={pageSlug}
        section="philosophy"
        onChange={(url) => set("philosophyImage", url)}
      />

      <SectionLabel>Platform Section</SectionLabel>
      <TextField
        label="Heading"
        value={c.platformHeading}
        onChange={(v) => set("platformHeading", v)}
      />
      <TextField
        label="Body"
        value={c.platformBody}
        onChange={(v) => set("platformBody", v)}
        multiline
      />

      <SectionLabel>Portfolio Section</SectionLabel>
      <TextField
        label="Badge"
        value={c.portfolioBadge}
        onChange={(v) => set("portfolioBadge", v)}
      />
      <TextField
        label="Title"
        value={c.portfolioTitle}
        onChange={(v) => set("portfolioTitle", v)}
      />
      <TextField
        label="Body"
        value={c.portfolioBody}
        onChange={(v) => set("portfolioBody", v)}
        multiline
      />
      <TextField
        label="CTA Text"
        value={c.portfolioCta}
        onChange={(v) => set("portfolioCta", v)}
      />
      <TextField
        label="Subtext"
        value={c.portfolioSubtext}
        onChange={(v) => set("portfolioSubtext", v)}
      />

      <SectionLabel>Featured Updates Section</SectionLabel>
      <TextField
        label="Heading"
        value={c.updatesHeading}
        onChange={(v) => set("updatesHeading", v)}
      />
      <TextField
        label="Subheading"
        value={c.updatesSubheading}
        onChange={(v) => set("updatesSubheading", v)}
      />
      <TextField
        label="CTA Text"
        value={c.updatesCta}
        onChange={(v) => set("updatesCta", v)}
      />
    </>
  )
}

function AboutForm({ content: c, set, pageSlug }: FormProps<AboutContent>) {
  return (
    <>
      <SectionLabel>Hero</SectionLabel>
      <ImageField
        label="Hero Image"
        value={c.heroImage}
        pageSlug={pageSlug}
        section="hero"
        onChange={(url) => set("heroImage", url)}
      />
      <TextField
        label="Hero Title"
        value={c.heroTitle}
        onChange={(v) => set("heroTitle", v)}
      />
      <TextField
        label="Hero Subtitle"
        value={c.heroSubtitle}
        onChange={(v) => set("heroSubtitle", v)}
      />

      <SectionLabel>Vision</SectionLabel>
      <TextField
        label="Heading"
        value={c.visionHeading}
        onChange={(v) => set("visionHeading", v)}
      />
      <TextField
        label="Text"
        value={c.visionText}
        onChange={(v) => set("visionText", v)}
        multiline
      />

      <SectionLabel>Mission</SectionLabel>
      <TextField
        label="Heading"
        value={c.missionHeading}
        onChange={(v) => set("missionHeading", v)}
      />
      <TextField
        label="Text"
        value={c.missionText}
        onChange={(v) => set("missionText", v)}
        multiline
      />

      <SectionLabel>Values</SectionLabel>
      <TextField
        label="Heading"
        value={c.valuesHeading}
        onChange={(v) => set("valuesHeading", v)}
      />
      <PairArrayEditor
        label="Values List"
        items={c.values}
        onChange={(v) => set("values", v)}
        titleLabel="Value"
        descLabel="Description"
      />

      <SectionLabel>Origin & Philosophy</SectionLabel>
      <TextField
        label="Heading"
        value={c.originHeading}
        onChange={(v) => set("originHeading", v)}
      />
      <ImageField
        label="Origin Image"
        value={c.originImage}
        pageSlug={pageSlug}
        section="origin"
        onChange={(url) => set("originImage", url)}
      />
      <TextField
        label="Body (use \\n for paragraphs)"
        value={c.originBody}
        onChange={(v) => set("originBody", v)}
        multiline
      />

      <SectionLabel>Governance</SectionLabel>
      <TextField
        label="Label"
        value={c.governanceLabel}
        onChange={(v) => set("governanceLabel", v)}
      />
      <TextField
        label="Heading"
        value={c.governanceHeading}
        onChange={(v) => set("governanceHeading", v)}
      />
      <TextField
        label="Body (use \\n for paragraphs)"
        value={c.governanceBody}
        onChange={(v) => set("governanceBody", v)}
        multiline
      />
    </>
  )
}

function InvestmentForm({
  content: c,
  set,
  pageSlug,
}: FormProps<InvestmentContent>) {
  return (
    <>
      <SectionLabel>Hero</SectionLabel>
      <ImageField
        label="Hero Image"
        value={c.heroImage}
        pageSlug={pageSlug}
        section="hero"
        onChange={(url) => set("heroImage", url)}
      />
      <TextField
        label="Hero Title"
        value={c.heroTitle}
        onChange={(v) => set("heroTitle", v)}
      />
      <TextField
        label="Hero Subtitle"
        value={c.heroSubtitle}
        onChange={(v) => set("heroSubtitle", v)}
      />

      <SectionLabel>Investment Approach</SectionLabel>
      <TextField
        label="Label"
        value={c.approachLabel}
        onChange={(v) => set("approachLabel", v)}
      />
      <TextField
        label="Heading"
        value={c.approachHeading}
        onChange={(v) => set("approachHeading", v)}
      />
      <TextField
        label="Body (use \\n for paragraphs)"
        value={c.approachBody}
        onChange={(v) => set("approachBody", v)}
        multiline
      />

      <SectionLabel>How We Develop</SectionLabel>
      <TextField
        label="Heading"
        value={c.developHeading}
        onChange={(v) => set("developHeading", v)}
      />
      <ImageField
        label="Develop Image"
        value={c.developImage}
        pageSlug={pageSlug}
        section="develop"
        onChange={(url) => set("developImage", url)}
      />
      <TextField
        label="Body"
        value={c.developBody}
        onChange={(v) => set("developBody", v)}
        multiline
      />
      <StringArrayEditor
        label="Bullets"
        items={c.developBullets}
        onChange={(v) => set("developBullets", v)}
      />

      <SectionLabel>Risk Management</SectionLabel>
      <TextField
        label="Label"
        value={c.riskLabel}
        onChange={(v) => set("riskLabel", v)}
      />
      <TextField
        label="Heading"
        value={c.riskHeading}
        onChange={(v) => set("riskHeading", v)}
      />
      <PairArrayEditor
        label="Risk Categories"
        items={c.riskCategories}
        onChange={(v) => set("riskCategories", v)}
      />

      <SectionLabel>Quality & Governance</SectionLabel>
      <TextField
        label="Heading"
        value={c.qualityHeading}
        onChange={(v) => set("qualityHeading", v)}
      />
      <ImageField
        label="Governance Image"
        value={c.qualityImage}
        pageSlug={pageSlug}
        section="quality"
        onChange={(url) => set("qualityImage", url)}
      />
      <TextField
        label="Body"
        value={c.qualityBody}
        onChange={(v) => set("qualityBody", v)}
        multiline
      />
      <StringArrayEditor
        label="Bullets"
        items={c.qualityBullets}
        onChange={(v) => set("qualityBullets", v)}
      />

      <SectionLabel>Asset Classes</SectionLabel>
      <TextField
        label="Heading"
        value={c.assetClassesHeading}
        onChange={(v) => set("assetClassesHeading", v)}
      />
      <TextField
        label="Intro Text"
        value={c.assetClassesIntro}
        onChange={(v) => set("assetClassesIntro", v)}
      />
      <AssetClassEditor
        items={c.assetClasses}
        onChange={(v) => set("assetClasses", v)}
        pageSlug={pageSlug}
      />

      <SectionLabel>Investment Structures</SectionLabel>
      <TextField
        label="Heading"
        value={c.structuresHeading}
        onChange={(v) => set("structuresHeading", v)}
      />
      <TextField
        label="Body"
        value={c.structuresBody}
        onChange={(v) => set("structuresBody", v)}
        multiline
      />
      <StringArrayEditor
        label="Bullets"
        items={c.structuresBullets}
        onChange={(v) => set("structuresBullets", v)}
      />
    </>
  )
}

function ProjectsForm({
  content: c,
  set,
  pageSlug,
}: FormProps<ProjectsContent>) {
  return (
    <>
      <SectionLabel>Hero</SectionLabel>
      <ImageField
        label="Hero Image"
        value={c.heroImage}
        pageSlug={pageSlug}
        section="hero"
        onChange={(url) => set("heroImage", url)}
      />
      <TextField
        label="Hero Title"
        value={c.heroTitle}
        onChange={(v) => set("heroTitle", v)}
      />
      <TextField
        label="Hero Subtitle"
        value={c.heroSubtitle}
        onChange={(v) => set("heroSubtitle", v)}
      />

      <SectionLabel>Portfolio Overview</SectionLabel>
      <TextField
        label="Label"
        value={c.overviewLabel}
        onChange={(v) => set("overviewLabel", v)}
      />
      <TextField
        label="Body"
        value={c.overviewBody}
        onChange={(v) => set("overviewBody", v)}
        multiline
      />
    </>
  )
}

function ContactForm({
  content: c,
  set,
}: FormProps<ContactContent>) {
  return (
    <>
      <SectionLabel>Page Header</SectionLabel>
      <TextField
        label="Heading"
        value={c.heading}
        onChange={(v) => set("heading", v)}
      />
      <TextField
        label="Subheading"
        value={c.subheading}
        onChange={(v) => set("subheading", v)}
      />

      <SectionLabel>Contact Info</SectionLabel>
      <LabelValueArrayEditor
        label="Contact Items"
        items={c.contactItems}
        onChange={(v) => set("contactItems", v)}
      />
    </>
  )
}

function EventsNewsForm({
  content: c,
  set,
}: FormProps<EventsNewsContent>) {
  return (
    <>
      <SectionLabel>Page Header</SectionLabel>
      <TextField
        label="Subheading"
        value={c.subheading}
        onChange={(v) => set("subheading", v)}
      />
      <TextField
        label="Heading"
        value={c.heading}
        onChange={(v) => set("heading", v)}
      />

      <SectionLabel>News Section</SectionLabel>
      <TextField
        label="Label"
        value={c.newsLabel}
        onChange={(v) => set("newsLabel", v)}
      />
      <TextField
        label="Heading"
        value={c.newsHeading}
        onChange={(v) => set("newsHeading", v)}
      />

      <SectionLabel>Events Section</SectionLabel>
      <TextField
        label="Label"
        value={c.eventsLabel}
        onChange={(v) => set("eventsLabel", v)}
      />
      <TextField
        label="Heading"
        value={c.eventsHeading}
        onChange={(v) => set("eventsHeading", v)}
      />
    </>
  )
}

export default AdminContent
