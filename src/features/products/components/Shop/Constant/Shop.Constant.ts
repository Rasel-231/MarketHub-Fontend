export type SortOption = "createdAt-desc" | "productActualPrice-asc" | "productActualPrice-desc" | "title-asc";

export const SHOP_CONSTANT = {
  DEFAULT_MAX_PRICE: 100000,
  PRICE_STEP: 1000,
  DEBOUNCE_DELAY: 500,
  DEFAULT_PAGE: 1,
  ITEM_PERPAGE: 4,
  SORT_OPTIONS: {
    NEWEST: "createdAt-desc" as SortOption,
    PRICE_LOW: "productActualPrice-asc" as SortOption,
    PRICE_HIGH: "productActualPrice-desc" as SortOption,
    NAME_AZ: "title-asc" as SortOption,
  }
} as const;