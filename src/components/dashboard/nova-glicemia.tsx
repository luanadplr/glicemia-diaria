"use client";
import { InfoIcon, PlusCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import * as z from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Label } from "../ui/label";

const dadoGlicemicoSchema = z.object({
  total: z.number().min(1),
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
    <Collapsible className="bg-white rounded-md max-w-md m-auto my-5 p-3 flex flex-col justify-between gap-5">
      <CollapsibleTrigger className="flex cursor-pointer items-center gap-3 justify-between">
        <p className="text-sm">Inserir novo registro de Glicemia</p>
        <PlusCircle size={15} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Field>
              {/* VALOR DA GLICEMIA */}
              <InputGroup>
                <InputGroupInput
                  {...form.register("total", { valueAsNumber: true })}
                  type="number"
                  placeholder="0"
                />
                <InputGroupAddon align="block-start">
                  <Label htmlFor="total" className="text-foreground">
                    Valor da Glicemia
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton className="rounded-full">
                        <InfoIcon />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>Valor exibido no aparelho</TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            {/* DATA & HORA DA GLICEMIA */}
            <Field>
              <InputGroup>
                <InputGroupInput
                  {...form.register("dataHora")}
                  type="datetime-local"
                />
                <InputGroupAddon align="block-start">
                  <Label htmlFor="dataHora" className="text-foreground">
                    Data e Hora da Aferição
                  </Label>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Total, aplicou ou não glicemia, data/hora e observação
