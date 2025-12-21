import Header from "@/components/ui/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pt-25">{children}</main>
    </>
  );
}
