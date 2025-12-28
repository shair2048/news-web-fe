import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
// import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { redirect } from "next/navigation";
import { getUserInfoFromBackend } from "@/services/auth.service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfoFromBackend();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 m-4 overflow-y-auto">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    // </ThemeProvider>
  );
}
