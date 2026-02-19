import React from "react"
import styled from "@emotion/styled"
import MarkdownRenderer from "../components/MarkdownRenderer"
import { useMemo } from "react"
import usePostQuery from "src/hooks/usePostQuery"
type Props = {}

const PageDetail: React.FC<Props> = () => {
  const data = usePostQuery()
  // compute derived values with hooks unconditionally
  const contentWithoutBadgeAndButton = useMemo(() => {
    if (!data) return ""
    const isAbout = data.slug === "about"
    if (!isAbout) return data.content
    // Daily 뱃지와 View Resume 버튼이 있던 줄 제거
    return data.content
      .replace(/^Daily\s*$/m, "")
      .replace(/^\[View Resume\]\(.*\)$/m, "")
      .trim()
  }, [data])

  if (!data) return null

  return (
    <StyledWrapper>
      <div className="contentCard">
        {data.slug === "about" && <Badge>Daily</Badge>}
        <MarkdownRenderer content={contentWithoutBadgeAndButton} />
        {data.slug === "about" && (
          <ResumeButton
            href="https://daram62.github.io/MS_Tech_Blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </ResumeButton>
        )}
      </div>
    </StyledWrapper>
  )
}



export default PageDetail

const StyledWrapper = styled.div`
  padding: 3rem 1.5rem;
  margin: 0 auto;
  max-width: 60rem;

  .contentCard {
    padding: 3rem 1.5rem;
    border-radius: 1.5rem;
    background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin: 0 auto;
    max-width: 56rem;
    width: 100%;
  }
`

const Badge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: #e6f0ff;
  color: #1d4ed8;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const ResumeButton = styled.a`
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  background: #111827;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
  &:hover {
    background: #374151;
  }
`
