"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { memo, useCallback, useRef, useState } from "react";
import isEqual from "react-fast-compare";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import Image from "next/image";
import { InfiniteScroll } from "../../../components/infinite-scroll";
import { CatApi } from "../../../api/the-cat-api";
import {
  EMPTY_ARR,
  ITEMS_PER_PAGE,
  QUERY_KEY,
  STOP_FETCH_AFTER_PAGE,
} from "../constants";
import { getNextPageParam } from "../utils";

export const Cats = memo(function Cats() {
  const [autoFetch, setAutoFetch] = useState(true);
  const loadMoreRef = useRef(null);
  const itemsPerPage = ITEMS_PER_PAGE;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: QUERY_KEY,
      initialPageParam: 1,
      queryFn() {
        return CatApi.getImagesSearch({ limit: ITEMS_PER_PAGE });
      },
      getNextPageParam,
    });

  const loadMore = useCallback(() => {
    /**
     * Disable auto-fetch for next scroll-to-bottom once we're auto-fetching 5th and only 5th page
     */
    if (data?.pages.length === STOP_FETCH_AFTER_PAGE) {
      setAutoFetch(false);
    }
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
        .catch((err) => {
          // eslint-disable-next-line no-console -- print out error
          console.error(err);
        });
    }
  }, [data?.pages.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const flattenedCats = data?.pages.flatMap((page) => page) || EMPTY_ARR;

  const handleLoadMoreClick = () => {
    setAutoFetch(true);
    loadMore();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Awesome List - Kittens Edition
      </h1>
      <InfiniteScroll enabled={autoFetch} onIntersect={loadMore}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flattenedCats.map((cat) => (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- it's not any
            <Card href={cat.url} key={cat.id} title={cat.id}>
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- it's not any */}
              <Image
                alt="Image of a cat"
                className="h-64 md:h-48 w-full object-cover"
                height={cat.height}
                src={cat.url}
                width={cat.width}
              />
            </Card>
          ))}
          {isFetchingNextPage
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <Card key={`placeholder-${index}`} title="">
                <div className="bg-gray-200 h-48 rounded-lg animate-pulse" />
              </Card>
            ))
            : null}
        </div>
      </InfiniteScroll>
      {!autoFetch && hasNextPage ? (
        <div className="w-full flex justify-center mt-8">
          <Button onClick={handleLoadMoreClick} ref={loadMoreRef}>
            Load more kittens!
          </Button>
        </div>
      ) : null}
    </div>
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- it's not any
}, isEqual);
