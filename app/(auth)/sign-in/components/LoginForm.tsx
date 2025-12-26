"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginBody, LoginBodyType } from "@/schema/validations/auth.schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import envConfig from "@/env.config";
import { useAuthStore } from "@/store/useAuthStore";
import { setTokenCookie } from "@/actions/auth";

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const payload = await res.json();

        const token = payload.data.token;
        await setTokenCookie(token);

        setUser(payload.data.user);

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Đăng nhập</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex flex-col gap-6">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="grid gap-2">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="m@example.com"
                    autoComplete="off"
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="grid gap-2">
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="login-form" className="w-full cursor-pointer">
          Đăng nhập
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          Đăng nhập với Google
        </Button>
        <CardAction className="flex w-full items-center justify-center">
          <span className="text-sm">Chưa có tài khoản?</span>
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={() => router.push("/sign-up")}
          >
            Đăng ký
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
