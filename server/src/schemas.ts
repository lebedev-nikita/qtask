import camelcaseKeys from "camelcase-keys";
import z from "zod";

export const CamelizedSchema = z
  .record(z.string(), z.unknown())
  .transform((value) => camelcaseKeys(value));
