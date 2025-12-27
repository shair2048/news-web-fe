import envConfig from "@/env.config";

export const articleSaver = {
  toggleBookmark: async (articleId: object, token: string) => {
    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/articles/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ articleId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to toggle bookmark");
    }

    return res.json();
  },
};
