export type HeadingItem = {
  id: string
  text: string
  level: number
}

export const slugifyHeading = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
}

const stripMarkdown = (value: string) => {
  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim()
}

export const parseHeadings = (content: string, levels: number[]) => {
  const allowed = new Set(levels)
  const lines = content.split(/\r?\n/)
  const counts = new Map<string, number>()
  const headings: HeadingItem[] = []

  for (const line of lines) {
    const match = /^(#{1,6})\s+(.+)$/.exec(line)
    if (!match) continue

    const level = match[1].length
    if (!allowed.has(level)) continue

    const rawText = match[2].replace(/\s+#+\s*$/, "")
    const text = stripMarkdown(rawText)
    const base = slugifyHeading(text)
    if (!base) continue

    const count = counts.get(base) ?? 0
    counts.set(base, count + 1)

    const id = count === 0 ? base : `${base}-${count}`
    headings.push({ id, text, level })
  }

  return headings
}
