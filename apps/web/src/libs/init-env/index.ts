import { parse } from "valibot";
import type { BaseIssue, BaseSchema } from "valibot";

let IS_INITIALIZED = false;

async function initEnvVariables(
  schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
) {
  await parse(schema, process.env);
}

export async function ensureEnvVariablesInitialized(
  schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
) {
  if (!IS_INITIALIZED) {
    await initEnvVariables(schema);
    IS_INITIALIZED = true;
  }
}
