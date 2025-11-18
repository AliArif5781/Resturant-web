import { z } from "zod";

// Dish schema for Firebase storage
export const dishSchema = z.object({
  id: z.string(),
  name: z.string(),
  weight: z.string(),
  price: z.string(),
  category: z.string(),
  description: z.string().optional(),
  prepTime: z.string().optional(),
  imageUrl: z.string(),
  createdAt: z.number(),
});

export const insertDishSchema = dishSchema.omit({ id: true, createdAt: true });

export type Dish = z.infer<typeof dishSchema>;
export type InsertDish = z.infer<typeof insertDishSchema>;
