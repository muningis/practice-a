import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { CatApi } from "../api/the-cat-api";
import { Cats, ITEMS_PER_PAGE, QUERY_KEY } from "../features/cats-serp";
import { getNextPageParam } from "../features/cats-serp/utils";
import kitten from "../assets/kitten.webp";

export const metadata: Metadata = {
  title: "Awesome List - Kittens Edition",
  description: "Awesome List of best Kittens you can find!",
  openGraph: {
    title: "Awesome List - Kittens Edition",
    description: "Awesome List of best Kittens you can find!",
    images: kitten.src,
  },
};

export default async function CatsRoute() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERY_KEY,
    queryFn() {
      return CatApi.getImagesSearch({ limit: ITEMS_PER_PAGE });
    },
    getNextPageParam,
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col items-center justify-between min-h-screen p-24">
        <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
          <Cats />
        </div>
      </main>
    </HydrationBoundary>
  );
}
