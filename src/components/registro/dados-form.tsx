import { Logo } from "../logo";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardAction,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DadosProps {
  name: string;
}

export function DadosForm({ name }: DadosProps) {
  return (
    <Card className="w-full max-w-md flex flex-col justify-between">
      <CardHeader>
        <div className="text-sm">
          <Logo />
        </div>
        <h2 className="font-bold">Insira suas informações</h2>
        <CardAction className="text-sm text-muted-foreground">
          {name}
        </CardAction>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col justify-between">
        <Label htmlFor="username">Escolha um username</Label>
        <Input placeholder="Seu username" className="text-sm" name="username" />
        <Label htmlFor="glicemia">
          Qual seu nível de Glicemia para tomar Insulina?
        </Label>
        <Input
          placeholder="Nível de glicemia"
          className="text-sm"
          name="glicemia"
        />
        <Button className="cursor-pointer">Salvar</Button>
      </CardContent>
    </Card>
  );
}
