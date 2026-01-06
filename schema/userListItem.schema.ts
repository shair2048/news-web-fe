import z from "zod";

export const UserListItemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().pipe(z.email()),
  status: z.enum(["Online", "Offline", "Banned"]),
});

export type UserListItem = z.infer<typeof UserListItemSchema>;
