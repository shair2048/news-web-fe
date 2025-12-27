import envConfig from "@/env.config";

export const followCategory = {
  toggleFollowCategory: async (categoryId: object, token: string) => {
    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/categories/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to toggle bookmark");
    }

    return res.json();
  },
};
