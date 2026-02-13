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
  const basePath = resolveBasePath()
  if (url.startsWith("data:") || url.startsWith("#")) return url

  if (url.startsWith("/")) {
    if (basePath && (url === basePath || url.startsWith(`${basePath}/`))) return url
    return basePath ? `${basePath}${url}` : url
  }

  if (url.startsWith("http")) {
    if (!basePath) return url
    try {
      const target = new URL(url)
      const site = new URL(CONFIG.link)
      if (target.origin === site.origin) {
        if (
          target.pathname !== basePath &&
          !target.pathname.startsWith(`${basePath}/`)
        ) {
          target.pathname = `${basePath}${target.pathname}`.replace(/\/+/g, "/")
        }
        return target.toString()
      }
    } catch {
      return url
    }
  }

  return url
}
