import envConfig from "@/env.config";

export const liveblocksService = {
  authenticate: async (room: string, token?: string) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/liveblocks/auth`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ room }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to authenticate with Liveblocks");
    }

    return res.json();
  },
  resolveUsers: async (userIds: string[]) => {
    const res = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/liveblocks/resolve-users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to resolve users");
    }

    return res.json();
  },
};
