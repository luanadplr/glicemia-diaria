"use client";
import { DropletIcon, EditIcon, HeartPulse } from "lucide-react";
import { Logo } from "../logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { LogoutButton } from "./logout-button";
import { NovoRegistroGlicemicoButton } from "./novoRegistro-button";
import { useRouter } from "next/navigation";

interface Props {
  data: {
    id: string;
    name: string;
  };
}

export function MenuSidebar({ data }: Props) {
  const router = useRouter();

  return (
    <Sidebar>
      <div className="bg-[#259D91] h-full text-white p-2">
        <SidebarHeader>
          <div className="text-[18px] flex items-center gap-2">
            <div className="bg-popover opacity-50 rounded-md p-2">
              <HeartPulse className="text-gray-500" />
            </div>
            <div>
              <Logo />
              <h2 className="text-[13px]">Olá, {data.name}</h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-white">Perfil</SidebarGroupLabel>
            <SidebarContent>
              <SidebarMenu className="flex flex-col items-start">
                <SidebarMenuItem key="username">
                  <SidebarMenuButton
                    onClick={() => router.push("/perfil/username")}
                    className="hover:bg-[#ffffff2f] hover:text-white"
                  >
                    <EditIcon />
                    Alterar Username
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem key="glicemia">
                  <SidebarMenuButton
                    onClick={() => router.push("/perfil/glicemia")}
                    className="hover:bg-[#ffffff2f] hover:text-white"
                  >
                    <DropletIcon />
                    Alterar Nível da Glicemia
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
      <SidebarFooter className="flex flex-col items-start bg-[#259D91]">
        <NovoRegistroGlicemicoButton userId={data.id} />
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
