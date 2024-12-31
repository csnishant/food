import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  price: z.number().min(0, { message: "Price cannot be negative" }),
  image: z
    .any()
    .optional()
    .refine((file) => !file || (file instanceof File && file.size > 0), {
      message: "Image file is required",
    }),
});
export type MenuFormSchema = z.infer<typeof menuSchema>;
