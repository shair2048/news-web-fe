// components/auth-provider.tsx
"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

interface User {
  _id: string;
  email: string;
  name: string;
  image?: string;
}

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
