import type { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import styled from "@emotion/styled"
import { slugifyHeading } from "src/libs/utils/markdown"

import "prismjs/themes/prism-tomorrow.css"

type Props = {
  content: string
}

const MarkdownRenderer: FC<Props> = ({ content }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const headingCounts = new Map<string, number>()
  const withBasePath = (url: string | null) => {
    if (!url) return url
    if (url.startsWith("http") || url.startsWith("#")) return url
    if (basePath && url.startsWith("/")) return `${basePath}${url}`
    return url
  }

  const getHeadingId = (value: string) => {
    const base = slugifyHeading(value)
    if (!base) return undefined
    const count = headingCounts.get(base) ?? 0
    headingCounts.set(base, count + 1)
    return count === 0 ? base : `${base}-${count}`
  }

  const toText = (node: any): string => {
    if (typeof node === "string") return node
    if (Array.isArray(node)) return node.map(toText).join("")
    if (node && node.props && node.props.children) return toText(node.props.children)
    return ""
  }

  return (
    <StyledWrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={withBasePath}
        components={{
          h1: ({ node, ...props }) => {
            const id = getHeadingId(toText(props.children))
            return <h1 id={id} {...props} />
          },
          h2: ({ node, ...props }) => {
            const id = getHeadingId(toText(props.children))
            return <h2 id={id} {...props} />
          },
          h3: ({ node, ...props }) => {
            const id = getHeadingId(toText(props.children))
            return <h3 id={id} {...props} />
          },
          h4: ({ node, ...props }) => {
            const id = getHeadingId(toText(props.children))
            return <h4 id={id} {...props} />
          },
          h5: ({ node, ...props }) => {
            const id = getHeadingId(toText(props.children))
            return <h5 id={id} {...props} />
          },
          h6: ({ node, ...props }) => {
            const id = getHeadingId(toText(props.children))
            return <h6 id={id} {...props} />
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </StyledWrapper>
  )
}

export default MarkdownRenderer

const StyledWrapper = styled.div`
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.gray12};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2.25rem 0 1rem;
    font-weight: 600;
    line-height: 1.3;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }

  p {
    margin: 1rem 0;
  }

  a {
    color: ${({ theme }) => theme.colors.blue9};
    text-decoration: underline;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  blockquote {
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;
    border-left: 4px solid ${({ theme }) => theme.colors.gray6};
    background-color: ${({ theme }) => theme.colors.gray2};
  }

  pre {
    margin: 1.5rem 0;
    padding: 1rem;
    overflow-x: auto;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.gray3};
  }

  code {
    font-family: "SFMono-Regular", SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 0.95em;
  }

  img {
    max-width: 100%;
    border-radius: 0.75rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  th,
  td {
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    padding: 0.5rem 0.75rem;
    text-align: left;
  }

  hr {
    border: 0;
    height: 1px;
    margin: 2rem 0;
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`
