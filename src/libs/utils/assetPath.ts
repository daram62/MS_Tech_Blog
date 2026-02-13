import { CONFIG } from "site.config"

const resolveBasePath = () => {
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  if (envBasePath) return envBasePath

  if (process.env.NODE_ENV === "production") {
    try {
      const url = new URL(CONFIG.link)
      return url.pathname.replace(/\/$/, "")
    } catch {
      return ""
    }
  }

  return ""
}

export const withBasePath = (url: string) => {
  if (!url) return url
  if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("#")) {
    return url
  }

  const basePath = resolveBasePath()
  if (url.startsWith("/")) return `${basePath}${url}`
  return url
}
