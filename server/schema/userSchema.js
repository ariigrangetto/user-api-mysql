import { z } from "zod";

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string(),
  age: z.number(),
  gender: z.string(),
  email: z.string().email(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(),
  image: z.string(),
  height: z.number().positive(),
  weight: z.number().positive(),
  eyeColor: z.string(),
  hair: z.object({
    color: z.string(),
    type: z.string(),
  }),
  university: z.string(),
  role: z.string(),
});

export function validateUser(object) {
  return userSchema.safeParse(object);
}

export function validatePartialUser(object) {
  return userSchema.partial().safeParse(object);
}
