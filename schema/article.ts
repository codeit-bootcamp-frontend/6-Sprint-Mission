import * as z from "zod";
import createDefaultListSchema from "./list";

export const WriterSchema = z.object({
  nickname: z.string(),
  id: z.number(),
});

export type Writer = z.infer<typeof WriterSchema>;

export const ArticleResponseSchema = z.object({
  updatedAt: z.string(),
  createdAt: z.string(),
  likeCount: z.number(),
  writer: WriterSchema,
  image: z.string(),
  content: z.string(),
  title: z.string(),
  id: z.number(),
});

export const ArticleListResponseSchema = createDefaultListSchema(
  ArticleResponseSchema
);

export const ArticleListRequestSchema = z.object({
  page: z.optional(z.number()),
  pageSize: z.optional(z.number()),
  orderBy: z.optional(z.enum(["recent", "like"])),
  keyword: z.optional(z.string()),
});

export type ArticleResponseType = z.infer<typeof ArticleResponseSchema>;
export type ArticleListResponseType = z.infer<typeof ArticleListResponseSchema>;
export type ArticleListRequestType = z.infer<typeof ArticleListRequestSchema>;
