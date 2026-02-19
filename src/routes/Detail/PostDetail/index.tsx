import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import MarkdownRenderer from "../components/MarkdownRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import { parseHeadings } from "src/libs/utils/markdown"
import usePostsQuery from "src/hooks/usePostsQuery"
import { formatDate } from "src/libs/utils"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()
  const posts = usePostsQuery()
  const [activeId, setActiveId] = useState<string | null>(null)
  const category = (data?.category && data?.category?.[0]) || undefined
  const headings = useMemo(() => parseHeadings(data?.content ?? "", [2, 3]), [data?.content])
  const currentIndex = useMemo(
    () => posts.findIndex((post) => post.slug === data?.slug),
    [posts, data?.slug]
  )
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : null

  useEffect(() => {
    if (!headings.length) return

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings])

  if (!data) return null

  return (
    <StyledWrapper>
      <div className="layout">
        <div className="contentColumn">
          <article className="contentCard">
          {category && (
            <div css={{ marginBottom: "0.5rem" }}>
              <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
                {category}
              </Category>
            </div>
          )}
          {data.type[0] === "Post" && <PostHeader data={data} />}
          <div>
            <MarkdownRenderer content={data.content} />
          </div>
          {data.type[0] === "Post" && (
            <>
              <Footer />
              <CommentBox data={data} />
            </>
          )}
          </article>
          {(prevPost || nextPost) && (
            <nav className="postNav" aria-label="Post navigation">
              {prevPost && (
                <Link href={`/${prevPost.slug}`} legacyBehavior>
                  <a className="navCard" data-direction="prev">
                    <span className="arrow" aria-hidden="true">
                      ←
                    </span>
                    <span className="label">Previous</span>
                    <strong>{prevPost.title}</strong>
                    <span className="meta">
                      {formatDate(
                        prevPost?.date?.start_date || prevPost.createdTime
                      )}
                    </span>
                  </a>
                </Link>
              )}
              {nextPost && (
                <Link href={`/${nextPost.slug}`} legacyBehavior>
                  <a className="navCard" data-direction="next">
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                    <span className="label">Next</span>
                    <strong>{nextPost.title}</strong>
                    <span className="meta">
                      {formatDate(
                        nextPost?.date?.start_date || nextPost.createdTime
                      )}
                    </span>
                  </a>
                </Link>
              )}
            </nav>
          )}
        </div>
        {headings.length > 0 && (
          <aside className="outlineCard" aria-label="Outline">
            <div className="title">Outline</div>
            <ul>
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  data-level={heading.level}
                  data-active={activeId === heading.id}
                >
                  <button
                    type="button"
                    onClick={() => {
                      const element = document.getElementById(heading.id)
                      if (!element) return
                      element.scrollIntoView({ behavior: "smooth", block: "start" })
                    }}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding: 3rem 1.5rem;
  max-width: 72rem;
  margin: 0 auto;
  .layout {
    display: grid;
    gap: 2rem;
    grid-template-columns: minmax(0, 1fr) 14rem;
    align-items: start;
  }

  .contentColumn {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

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

  .postNav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 1rem;
  }

  .navCard {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    box-shadow: 0 4px 10px -6px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.gray12};
    text-decoration: none;
    cursor: pointer;
    position: relative;
    pointer-events: auto;

    .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: ${({ theme }) => theme.colors.gray10};
    }

    .arrow {
      font-size: 1.25rem;
      line-height: 1;
      color: ${({ theme }) => theme.colors.gray9};
    }

    strong {
      font-size: 1rem;
      line-height: 1.4;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray12};
    }

    .meta {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.gray10};
    }

    &[data-direction="prev"] {
      align-items: flex-start;
    }

    &[data-direction="next"] {
      align-items: flex-end;
      text-align: right;
    }

    &:hover {
      box-shadow: 0 10px 18px -12px rgba(0, 0, 0, 0.35);
    }
  }

  .outlineCard {
    position: sticky;
    top: 6rem;
    align-self: start;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    box-shadow: 0 4px 10px -6px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.gray11};

    .title {
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray10};
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    li {
      &[data-level="3"] {
        padding-left: 0.75rem;
      }
    }

    button {
      width: 100%;
      border: none;
      background: none;
      padding: 0.2rem 0.4rem;
      text-align: left;
      border-radius: 0.5rem;
      color: ${({ theme }) => theme.colors.gray11};
      cursor: pointer;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    li[data-active="true"] button {
      color: ${({ theme }) => theme.colors.blue9};
      background-color: ${({ theme }) => theme.colors.gray3};
      font-weight: 600;
    }
  }

  @media (max-width: 1024px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .outlineCard {
      display: none;
    }
  }

`
