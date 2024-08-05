import { NextResponse } from "next/server";
import { ensureEnvVariablesInitialized } from "./libs/init-env";
import { object, string } from "valibot";

const EnvSchema = object({
  NEXT_PUBLIC_CATS_API_TOKEN: string(
    "Cats API Token is not declared in .env file",
  ),
  NEXT_PUBLIC_CATS_API_BASE_URL: string(
    "Cats API Base URL is not declared in .env file",
  ),
  NEXT_PUBLIC_CATS_API_ITEMS_PER_PAGE: string(
    "Cats API items/page is not declared in .env file",
  ),
  NEXT_PUBLIC_CATS_API_STOP_AFTER_PAGE: string(
    "Cats API stop after page is not declared in .env file",
  ),
});

export async function middleware() {
  await ensureEnvVariablesInitialized(EnvSchema);
  return NextResponse.next();
}
