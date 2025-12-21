import { LoginForm } from "@/components/registro/login-form";
import { useSession } from "@/service/session";
import { redirect } from "next/navigation";

export default async function Login() {
  // Direcionar para o dashboard caso o usuario esteja logado
  const session = await useSession();
  if (session) redirect("/dashboard/" + session.user.username);

  return (
    <div className="bg-[#259D91] w-full h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
