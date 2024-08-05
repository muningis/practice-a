import { ITEMS_PER_PAGE } from "./constants";

export function getNextPageParam(lastPage: unknown[], pages: unknown[]) {
  if (lastPage.length < ITEMS_PER_PAGE) return undefined;
  return pages.length + 1;
}
