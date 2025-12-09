"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@/components/ui/stepper";
import { signupValues, novoUsuario } from "@/service/auth";

const signupSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(1, "O nome é obrigatório"),
});

const steps = [1, 2];

export function SignupForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<signupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(formData: signupValues) {
    setLoading(true);
    await novoUsuario(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-3 flex flex-col gap-4"
      >
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...form.register("email")}
            id="email"
            placeholder="Seu Email"
            className="text-sm"
          />
          <FieldError className="text-sm">
            {form.formState.errors.email?.message}
          </FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            {...form.register("password")}
            type="password"
            id="password"
            placeholder="Sua senha"
            className="text-sm"
          />
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input
            {...form.register("name")}
            type="text"
            id="name"
            placeholder="Seu nome"
            className="text-sm"
          />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>
        <Button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Cadastrar"}
        </Button>
      </form>

      {/* Steps do Formulário  */}
      {/* <Stepper onValueChange={setStep} value={step}>
        {steps.map((step) => (
          <StepperItem className="flex-1" key={step} step={step}>
            <StepperTrigger
              asChild
              className="w-full flex-col items-start gap-2"
            >
              <StepperIndicator
                asChild
                className="h-2 w-full bg-sky-100 rounded-none"
              >
                <span className="sr-only">{step}</span>
              </StepperIndicator>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper> */}
    </Form>
  );
}
