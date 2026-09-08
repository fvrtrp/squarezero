"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { headingfont } from "@/app/fonts"
import ProgressiveImage from "@/components/progressive-image"
import CategoryChip from "@/components/category-chip"
import type { Artwork } from "@/lib/artwork-shared"

export type HomePost = {
  _id: string
  title: string
  date: string
  slug: string
  category?: string | null
  archived: boolean
  artwork: Artwork | null
}

type ViewMode = "grid" | "list"

const VIEW_KEY = "sqz-home-view"
const ARCHIVED_KEY = "sqz-show-archived"
const CATEGORY_KEY = "sqz-category-filter"

export default function HomePosts({ posts }: { posts: HomePost[] }) {
  const [view, setView] = useState<ViewMode>("grid")
  const [showArchived, setShowArchived] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const storedView = window.localStorage.getItem(VIEW_KEY)
    if (storedView === "grid" || storedView === "list") {
      setView(storedView)
    }
    setShowArchived(window.localStorage.getItem(ARCHIVED_KEY) === "1")
    setSelectedCategory(window.localStorage.getItem(CATEGORY_KEY) || null)
  }, [])

  function selectView(next: ViewMode) {
    setView(next)
    window.localStorage.setItem(VIEW_KEY, next)
  }

  function toggleArchived(checked: boolean) {
    setShowArchived(checked)
    window.localStorage.setItem(ARCHIVED_KEY, checked ? "1" : "0")
  }

  function selectCategory(next: string | null) {
    setSelectedCategory(next)
    if (next) {
      window.localStorage.setItem(CATEGORY_KEY, next)
    } else {
      window.localStorage.removeItem(CATEGORY_KEY)
    }
  }

  const visibleByArchive = useMemo(
    () => (showArchived ? posts : posts.filter((post) => !post.archived)),
    [posts, showArchived]
  )

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        visibleByArchive
          .map((post) => post.category)
          .filter((category): category is string => Boolean(category))
      )
    ).sort((a, b) => a.localeCompare(b))
  }, [visibleByArchive])

  useEffect(() => {
    if (selectedCategory && !categories.includes(selectedCategory)) {
      selectCategory(null)
    }
  }, [categories, selectedCategory])

  const visiblePosts = selectedCategory
    ? visibleByArchive.filter((post) => post.category === selectedCategory)
    : visibleByArchive

  return (
    <div className="mt-20">
      <div className="homeToolbar">
        {categories.length > 0 && (
          <div className="categoryFilters" role="group" aria-label="Filter by category">
            <CategoryChip
              category="All"
              active={!selectedCategory}
              onClick={() => selectCategory(null)}
            />
            {categories.map((category) => (
              <CategoryChip
                key={category}
                category={category}
                active={selectedCategory === category}
                onClick={() => selectCategory(category)}
              />
            ))}
          </div>
        )}
        <div className="homeControls">
          <label className="archivedToggle">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(event) => toggleArchived(event.target.checked)}
            />
            Archived
          </label>
          <div className="viewToggle" role="group" aria-label="Post layout">
            <button
              type="button"
              className={view === "grid" ? "isActive" : undefined}
              aria-pressed={view === "grid"}
              title="Grid view"
              onClick={() => selectView("grid")}
            >
              <GridIcon />
            </button>
            <button
              type="button"
              className={view === "list" ? "isActive" : undefined}
              aria-pressed={view === "list"}
              title="List view"
              onClick={() => selectView("list")}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <article key={post._id}>
              <Link href={post.slug} className="block group">
                <div className="aspect-video overflow-hidden rounded-[10px] bg-zinc-900">
                  {post.artwork && (
                    <ProgressiveImage
                      src={post.artwork.src}
                      src2x={post.artwork.src2x}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <h2
                  className={`${headingfont.className} text-bleedred text-base mt-2 mb-0 leading-tight`}
                >
                  {post.title}
                </h2>
                <time className="block text-[10px] text-slate-500 mt-1">
                  {post.date.slice(0, 10)}
                </time>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        visiblePosts.map((post) => (
          <article key={post._id} className="py-5 articlePreview">
            <div className="articleSeparator articleAfter"></div>
            <div className="text-slate-500 text-xs">{post.date.slice(0, 10)}</div>
            <Link href={post.slug}>
              <h2 className={`${headingfont.className} text-bleedred text-3xl`}>
                {post.title}
              </h2>
            </Link>
          </article>
        ))
      )}
    </div>
  )
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
      <rect x="1" y="2" width="14" height="2" rx="0.5" fill="currentColor" />
      <rect x="1" y="7" width="14" height="2" rx="0.5" fill="currentColor" />
      <rect x="1" y="12" width="14" height="2" rx="0.5" fill="currentColor" />
    </svg>
  )
}
