// src/hooks/use-mounted.ts
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const useMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Giá trị trên Client (Sau khi hydration)
    () => false // Giá trị trên Server (Trước khi hydration)
  );
};
