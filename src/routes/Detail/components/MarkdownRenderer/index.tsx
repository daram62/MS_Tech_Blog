import type { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import styled from "@emotion/styled"

import "prismjs/themes/prism-tomorrow.css"

type Props = {
  content: string
}

const MarkdownRenderer: FC<Props> = ({ content }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const withBasePath = (url: string | null) => {
    if (!url) return url
    if (url.startsWith("http") || url.startsWith("#")) return url
    if (basePath && url.startsWith("/")) return `${basePath}${url}`
    return url
  }

  return (
    <StyledWrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={withBasePath}>
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
