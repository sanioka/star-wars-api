export const scrollOnTop = (behavior: ScrollBehavior = 'auto') => {
  window.scrollTo({
    top: 0,
    behavior,
  })
}
