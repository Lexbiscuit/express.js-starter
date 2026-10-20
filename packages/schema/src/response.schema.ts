import {z} from "zod";

export const SuccessResponseSchema = z.strictObject({
  success: z.literal(true),
});

export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;

export const ErrorResponseSchema = z.strictObject({
  success: z.literal(false),
  error: z.strictObject({
    code: z.string(), // machine-readable: 'USER_NOT_FOUND'
    message: z.string(), // human-readable
    details: z.unknown().optional(), // field errors, etc.
  }),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export const DataResponseSchema = <T extends z.ZodType>(data: T) =>
  z.strictObject({
    success: z.literal(true),
    data,
  });

export const PaginationMetaSchema = z.strictObject({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.strictObject({
    success: z.literal(true),
    data: z.array(item),
    meta: PaginationMetaSchema,
  });
