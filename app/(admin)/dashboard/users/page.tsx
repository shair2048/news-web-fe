import { UsersTable } from "./components/UsersTable";
import { columns } from "./components/Columns";
import { cookies } from "next/headers";
import envConfig from "@/env.config";

export default async function UserManagePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const payload = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const userListRes = await payload.json();

  return (
    <div className="container mx-auto py-10">
      <UsersTable columns={columns} data={userListRes.data.users} />
    </div>
  );
}
