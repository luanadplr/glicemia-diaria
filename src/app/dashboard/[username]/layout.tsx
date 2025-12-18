import { MenuSidebar } from "@/components/dashboard/menu-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "@/service/session";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await useSession();
  const data = {
    id: session?.user.id!,
    name: session?.user.name!,
  };
  return (
    <SidebarProvider>
      <MenuSidebar data={data} />
      <main className="w-screen mix-w-0">{children}</main>
    </SidebarProvider>
  );
}
