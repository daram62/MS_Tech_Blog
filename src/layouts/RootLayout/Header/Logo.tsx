import Link from "next/link"
import Image from "next/image"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const logoSrc = `${basePath}/images/shared/Microsoft-Logo-PNG-Photos.png`

  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      <Image
        src={logoSrc}
        alt="Microsoft"
        width={28}
        height={28}
      />
      <span>{CONFIG.blog.title}</span>
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`
