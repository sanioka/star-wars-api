// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP, etc.)
export const range = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
