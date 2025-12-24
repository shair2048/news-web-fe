import z from "zod";

export const RegisterBody = z
  .object({
    name: z
      .string()
      .min(2, { message: "Tên phải có ít nhất 2 ký tự" })
      .max(256, { message: "Tên tối đa 256 ký tự" }),
    email: z
      .string()
      .trim()
      .pipe(z.email({ message: "Email không hợp lệ" })),
    password: z
      .string()
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .max(100, { message: "Mật khẩu tối đa 100 ký tự" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Mật khẩu xác nhận phải có ít nhất 8 ký tự" })
      .max(100, { message: "Mật khẩu xác nhận tối đa 100 ký tự" }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      // name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
  .object({
    email: z.string().trim().pipe(z.email()),
    password: z.string().min(8).max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
