"use client";
import { EditIcon, HeartPulse, PlusCircleIcon } from "lucide-react";
import { Logo } from "../logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "../ui/sidebar";
import { Button } from "../ui/button";
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
            <SidebarGroupLabel className="text-white">Menu</SidebarGroupLabel>
            <SidebarContent>
              <SidebarMenu className="flex flex-col items-start">
                <Button
                  variant="link"
                  className="text-white"
                  onClick={() => router.push("/perfil")}
                >
                  <EditIcon />
                  Editar Perfil
                </Button>
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
