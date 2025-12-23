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
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Đăng ký</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
              <Input id="confirm-password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer">
          Đăng ký
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          Tiếp tục với Google
        </Button>
        <CardAction className="flex w-full items-center justify-center">
          <span className="text-sm">Đã có tài khoản?</span>
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Đăng nhập
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
