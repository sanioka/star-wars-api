import { useMediaQuery } from '@chakra-ui/react'

// https://chakra-ui.com/docs/styled-system/responsive-styles
//   const breakpoints = {
//     base: "0em", // 0px
//     sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
//     md: "48em", // ~768px
//     lg: "62em", // ~992px
//     xl: "80em", // ~1280px
//     "2xl": "96em", // ~1536px
//   };

export const SM_BREAKPOINT = 480
export const MD_BREAKPOINT = 768
export const LG_BREAKPOINT = 992

export const useDevice = () => {
  const [isMobileBreakpoint, isTabletBreakpoint] = useMediaQuery([
    `(max-width: ${MD_BREAKPOINT - 1}px)`,
    `(max-width: ${LG_BREAKPOINT - 1}px)`,
  ])
  const isMobile = isMobileBreakpoint
  const isTablet = !isMobile && isTabletBreakpoint
  const isDesktop = !isMobile && !isTablet

  return { isMobile, isTablet, isDesktop }
}
