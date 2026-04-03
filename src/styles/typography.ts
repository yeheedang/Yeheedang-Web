import { css } from '@emotion/react'
import { COLOR_INK, COLOR_YEHI_GREY, COLOR_WALNUT } from './tokens'

export const FONT_DISPLAY = 'var(--font-display), "Noto Serif KR", serif'
export const FONT_BODY = 'var(--font-body), "Nanum Myeongjo", serif'
export const FONT_ACCENT = "'Cormorant Garamond', serif"

export const textDisplayLg = css`
  font-family: ${FONT_DISPLAY};
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: ${COLOR_INK};
`

export const textDisplayMd = css`
  font-family: ${FONT_DISPLAY};
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: ${COLOR_INK};
`

export const textHeading = css`
  font-family: ${FONT_DISPLAY};
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.4;
  color: ${COLOR_INK};
`

export const textBody = css`
  font-family: ${FONT_BODY};
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  font-weight: 400;
  line-height: 1.8;
  color: ${COLOR_YEHI_GREY};
`

export const textCaption = css`
  font-family: ${FONT_ACCENT};
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${COLOR_WALNUT};
`

export const textNav = css`
  font-family: ${FONT_BODY};
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: ${COLOR_YEHI_GREY};
  writing-mode: vertical-rl;
  text-orientation: mixed;
`
