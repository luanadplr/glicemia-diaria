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

const dadoGlicemicoSchema = z.object({
  total: z.number().min(1, "O valor da glicemia é obrigatório"),
  aplicouGlicemia: z.boolean(),
  dataHora: z.date(),
  observacao: z.string().optional(),
});

type dadoGlicemico = z.infer<typeof dadoGlicemicoSchema>;

export function NovoDadoGlicemico() {
  const form = useForm<dadoGlicemico>({
    resolver: zodResolver(dadoGlicemicoSchema),
    defaultValues: {
      total: undefined,
      aplicouGlicemia: false,
      dataHora: new Date(),
      observacao: "",
    },
  });

  function onSubmit(formData: dadoGlicemico) {
    console.log(formData);
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
              />
              <Label htmlFor="dataHora">Data/Hora</Label>
              <Input
                {...form.register("dataHora", { valueAsDate: true })}
                type="datetime-local"
                id="dataHora"
              />
              <RadioGroup {...form.register("aplicouGlicemia")}>
                <div className="flex flex-row space-x-2">
                  <RadioGroupItem
                    value="true"
                    id="aplicou"
                    className="border-black"
                  />
                  <Label htmlFor="aplicou">Aplicou Insulina</Label>
                </div>
                <div className="flex flex-row space-x-2">
                  <RadioGroupItem
                    value="false"
                    id="naoaplicou"
                    className="border-black"
                  />
                  <Label htmlFor="naoaplicou">Não Aplicou</Label>
                </div>
              </RadioGroup>
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

// Total, aplicou ou não glicemia, data/hora e observação
