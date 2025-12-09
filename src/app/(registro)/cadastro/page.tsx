import { SignupForm } from "@/components/registro/signup-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

export default function Cadastro() {
  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-r from-blue-200 to-cyan-200">
      <Card className="w-full max-w-md p-10 gap-1">
        <CardHeader className="font-bold p-0">Faça seu cadastro</CardHeader>
        <CardDescription>
          Seu registro glicêmico na palma da mão
        </CardDescription>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
