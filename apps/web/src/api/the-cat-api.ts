import type { InferOutput } from "valibot";
import { array, number, object, parse, string } from "valibot";

interface GetImagesSearchProps {
  page?: number;
  limit?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_CATS_API_BASE_URL;

const CatSchema = object({
  id: string(),
  url: string(),
  width: number(),
  height: number(),
});
export type Cat = InferOutput<typeof CatSchema>;

// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- just weird habit
export class CatApi {
  static async getImagesSearch({
    page = 1,
    limit = 24,
  }: GetImagesSearchProps = {}) {
    const url = new URL(`${BASE_URL}/v1/images/search`);
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    url.search = searchParams.toString();

    const res = await fetch(url, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- handled by valibot
        "X-api-key": process.env.NEXT_PUBLIC_CATS_API_TOKEN!,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-throw-literal -- response can too be consumed
    if (!res.ok) throw res;
    const data = (await res.json()) as unknown;
    const parsedData = parse(array(CatSchema), data);

    return parsedData;
  }
}
