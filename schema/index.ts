import { boolean, z } from "zod";
export const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "title must be at least 5 characters.",
    })
    .max(50, {
      message: "title must not be longer than 50 characters.",
    }),
  body: z
    .string()
    .max(80, {
      message: "title must not be longer than 80 characters.",
    })
    .optional(),
  completed: boolean(),
});
