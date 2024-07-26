import * as z from "zod";

export const CommentListRequestSchema = z.object({
  articleId: z.number(),
  limit: z.number(),
  cursor: z.optional(z.number()),
});

export const WriterSchema = z.object({
  image: z.string(),
  nickname: z.string(),
  id: z.number(),
});

export const CommentSchema = z.object({
  writer: WriterSchema,
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  content: z.string(),
  id: z.number(),
});

export const CommentListResponseSchema = z.object({
  nextCursor: z.number(),
  list: z.array(CommentSchema),
});

export type CommentListRequestSchemaType = z.infer<
  typeof CommentListRequestSchema
>;
export type CommentListResponseSchemaType = z.infer<
  typeof CommentListResponseSchema
>;
export type CommentSchemaType = z.infer<typeof CommentSchema>;
export type Writer = z.infer<typeof WriterSchema>;
export type List = z.infer<typeof CommentSchema>;
