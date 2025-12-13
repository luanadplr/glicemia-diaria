"use client";
import { PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Controller } from "react-hook-form";
import { glicemiaUpdate } from "@/service/db";

const dadoGlicemicoSchema = z.object({
  total: z.number().min(1, "O valor da glicemia é obrigatório"),
  aplicouInsulina: z.boolean(),
  dataHora: z.date(),
  observacao: z.string(),
});

type dadoGlicemico = z.infer<typeof dadoGlicemicoSchema>;

type Props = {
  userId: string;
};

export function NovoDadoGlicemico({ userId }: Props) {
  const form = useForm<dadoGlicemico>({
    resolver: zodResolver(dadoGlicemicoSchema),
    defaultValues: {
      total: undefined,
      aplicouInsulina: false,
      dataHora: new Date(),
      observacao: undefined,
    },
  });

  async function onSubmit(formData: dadoGlicemico) {
    console.log(formData);
    await glicemiaUpdate(formData, userId);
  }
  return (
    <section className="m-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-full cursor-pointer">
            <PlusCircle size={13} />
            Novo dado Glicêmico
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-left">
            <DialogTitle>Inserir Novo Dado Glicêmico</DialogTitle>
            <DialogDescription>
              Certifique-se de colocar os dados corretamente
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
            <div className="flex flex-col gap-3">
              <Label htmlFor="total">Glicemia (mmol/L)</Label>
              <Input
                {...form.register("total", { valueAsNumber: true })}
                type="number"
                id="total"
                className="mb-3"
              />
              <Label htmlFor="dataHora">Data/Hora</Label>
              <Input
                {...form.register("dataHora", { valueAsDate: true })}
                type="datetime-local"
                id="dataHora"
                className="mb-3"
                required
              />
              <Controller
                name="aplicouInsulina"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    defaultValue="true"
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(value === "true")}
                    className="flex mb-3"
                  >
                    <div className="flex flex-row space-x-2">
                      <RadioGroupItem
                        value="true"
                        id="true"
                        className="border-black"
                      />
                      <Label htmlFor="true">Aplicou Insulina</Label>
                    </div>
                    <div className="flex flex-row space-x-2">
                      <RadioGroupItem
                        value="false"
                        id="false"
                        className="border-black"
                      />
                      <Label htmlFor="false">Não Aplicou</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              <Label htmlFor="observacao">Observação</Label>
              <Input
                {...form.register("observacao")}
                type="text"
                id="observacao"
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
