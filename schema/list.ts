import * as z from "zod";

const createDefaultListSchema = (itemSchema: z.ZodTypeAny) =>
  z.object({
    totalCount: z.number(),
    list: z.array(itemSchema),
  });

export default createDefaultListSchema;
