"use client";
import { ChevronDownIcon, PlusCircle } from "lucide-react";
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
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

const dadoGlicemicoSchema = z.object({
  total: z.number().min(1, "O valor da glicemia é obrigatório"),
  aplicouInsulina: z.boolean(),
  data: z.date(),
  hora: z.string(),
  observacao: z.string(),
});

type dadoGlicemico = z.infer<typeof dadoGlicemicoSchema>;

type Props = {
  userId: string;
};

export function NovoDadoGlicemico({ userId }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Date | undefined>();

  const form = useForm<dadoGlicemico>({
    resolver: zodResolver(dadoGlicemicoSchema),
    defaultValues: {
      total: undefined,
      aplicouInsulina: false,
      data: undefined,
      hora: "",
      observacao: undefined,
    },
  });

  async function onSubmit(formData: dadoGlicemico) {
    console.log(formData);
    await glicemiaUpdate(formData, userId);
    form.reset();
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
              {/* TOTAL DA GLICEMIA */}
              <Label htmlFor="total">
                Glicemia (mmol/L) <span className="text-red-500">*</span>
              </Label>
              <Input
                {...form.register("total", { valueAsNumber: true })}
                type="number"
                id="total"
                className="mb-3"
                required
              />
              {/* DATA / HORA DA AFERIÇÃO */}
              <div className="flex gap-4 mb-3">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date-picker" className="px-1">
                    Data <span className="text-red-500">*</span>
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="w-32 justify-between font-normal"
                      >
                        {data ? data.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={data}
                        captionLayout="dropdown"
                        onSelect={(data) => {
                          setData(data);
                          setOpen(false);
                          form.setValue("data", data!);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="time-picker" className="px-1">
                    Hora <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="00:00:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    {...form.register("hora")}
                    required
                  />
                </div>
              </div>
              {/* APLICOU OU NÃO INSULINA */}
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
              {/* OBSERVAÇÃO */}
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
