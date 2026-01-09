"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types/user.type";
import { useEffect } from "react";

export default function AuthProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return <>{children}</>;
}
