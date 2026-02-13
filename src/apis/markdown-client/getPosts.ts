import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { CONFIG } from "site.config"
import { TPost, TPostStatus, TPostType, PostDetail } from "src/types"

const POSTS_DIR = path.join(process.cwd(), "posts")

type FrontMatter = {
  title?: string
  date?: string
  tags?: string[] | string
  category?: string[] | string
  summary?: string
  status?: TPostStatus | TPostStatus[]
  type?: TPostType | TPostType[]
  thumbnail?: string
  slug?: string
  author?: { id?: string; name?: string; profile_photo?: string }[] | string[]
  fullWidth?: boolean
  createdTime?: string
}

const toArray = <T>(value: T | T[] | undefined): T[] => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const toStringArray = (value: string | string[] | undefined) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

const trimStringList = (value: string[]) =>
  value.map((item) => item.trim()).filter(Boolean)

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const resolvePostFiles = () => {
  if (!fs.existsSync(POSTS_DIR)) return [] as string[]
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .filter((name) => !name.startsWith("_") && name.toLowerCase() !== "readme.md")
}

const parsePostFile = (fileName: string) => {
  const filePath = path.join(POSTS_DIR, fileName)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const stats = fs.statSync(filePath)
  const { data, content } = matter(fileContents)
  const frontMatter = data as FrontMatter

  const fallbackSlug = fileName.replace(/\.mdx?$/, "")
  const slug =
    typeof frontMatter.slug === "string" && frontMatter.slug.trim().length > 0
      ? frontMatter.slug
      : fallbackSlug
  const title =
    typeof frontMatter.title === "string" && frontMatter.title.trim().length > 0
      ? frontMatter.title
      : slug
  const createdTimeValue =
    frontMatter.createdTime instanceof Date
      ? frontMatter.createdTime.toISOString()
      : frontMatter.createdTime
  const createdTime = createdTimeValue
    ? new Date(createdTimeValue).toString()
    : stats.birthtime.toString()

  const dateValue =
    frontMatter.date instanceof Date
      ? frontMatter.date.toISOString()
      : frontMatter.date

  const status =
    toArray(frontMatter.status as TPostStatus | TPostStatus[]).length > 0
      ? (trimStringList(
          toArray(frontMatter.status as TPostStatus | TPostStatus[])
        ) as TPostStatus[])
      : (["Public"] as TPostStatus[])

  const type =
    toArray(frontMatter.type as TPostType | TPostType[]).length > 0
      ? (trimStringList(
          toArray(frontMatter.type as TPostType | TPostType[])
        ) as TPostType[])
      : (["Post"] as TPostType[])

  const tags = trimStringList(toStringArray(frontMatter.tags))
  const category = trimStringList(toStringArray(frontMatter.category))

  const author = (() => {
    if (!frontMatter.author) return undefined
    if (Array.isArray(frontMatter.author)) {
      return frontMatter.author.map((item) => {
        if (typeof item === "string") {
          return { id: item, name: item }
        }
        return { id: item.id || item.name || "", ...item }
      })
    }
    return undefined
  })()

  const post: TPost = {
    id: slug,
    date: { start_date: dateValue || createdTime },
    type,
    slug,
    tags: tags.length ? tags : undefined,
    category: category.length ? category : undefined,
    summary: frontMatter.summary,
    title,
    status,
    createdTime,
    fullWidth: frontMatter.fullWidth ?? false,
  }

  if (author && author.length > 0) {
    post.author = author
  }

  if (frontMatter.thumbnail) {
    post.thumbnail = frontMatter.thumbnail
  } else if (CONFIG.ogImageGenerateURL) {
    post.thumbnail = `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(title)}.png`
  }

  return { post, content }
}

export const getPosts = async () => {
  const files = resolvePostFiles()
  const posts = files.map((fileName) => parsePostFile(fileName).post)

  posts.sort((a, b) => {
    const dateA: any = new Date(a?.date?.start_date || a.createdTime)
    const dateB: any = new Date(b?.date?.start_date || b.createdTime)
    return dateB - dateA
  })

  return posts
}

export const getPostBySlug = async (slug: string) => {
  const files = resolvePostFiles()
  const escapedSlug = escapeRegExp(slug)
  const directMatch = files.find((fileName) =>
    new RegExp(`^${escapedSlug}\\.mdx?$`).test(fileName)
  )

  if (directMatch) {
    const { post, content } = parsePostFile(directMatch)
    return { ...post, content } as PostDetail
  }

  for (const fileName of files) {
    const parsed = parsePostFile(fileName)
    if (parsed.post.slug === slug) {
      return { ...parsed.post, content: parsed.content } as PostDetail
    }
  }

  return null
}
