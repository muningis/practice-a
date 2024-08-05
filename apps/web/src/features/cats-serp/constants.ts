import type { Cat } from "../../api/the-cat-api";

export const QUERY_KEY = ["cats", "images"];
export const EMPTY_ARR: Cat[] = [];
export const ITEMS_PER_PAGE = parseInt(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it's okay to use non-null-expression here, as valibot on init checks for them
  process.env.NEXT_PUBLIC_CATS_API_ITEMS_PER_PAGE!,
);
export const STOP_FETCH_AFTER_PAGE = parseInt(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it's okay to use non-null-expression here, as valibot on init checks for them
  process.env.NEXT_PUBLIC_CATS_API_STOP_AFTER_PAGE!,
);
