const repoName = "MS_Tech_Blog"
const isProd = process.env.NODE_ENV === "production"
const basePath = isProd ? `/${repoName}` : ""

module.exports = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
    domains: ["www.notion.so", "lh5.googleusercontent.com", "s3-us-west-2.amazonaws.com"],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}
