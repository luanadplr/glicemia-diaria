## 🫀 Glicemia Diária

Projeto de Monitoramento Glicêmico para facilitar o registro e acompanhamento de dados de Glicemia do usuário

## Funcionalidades

### 👤 Autentificação

- Login com Email/Senha
- Cadastro de novos usuários

### 🩸 Dashboard

- Gráfico Glicêmico separado por meses
- Último registro de Glicemia
- Acompanhamento de Glicemia (Caso Alta ou Baixa)
- Histórico de registros glicêmicos com data e hora
- Registro de novo dado glicêmico

## Tecnologias Utilizadas

- Next.js
- Prisma
- PostgreSQL
- Better Auth
- shadcn
- zod
- React-Hook-Form
- sonner
- Tailwind CSS

## Como Executar

```bash
# 1. Clonar o repositório
git clone https://github.com/luanadplr/glicemia-diaria

# 2. Navegar até o diretório do projeto
cd glicemia-diaria

# 3. Instalar dependências
npm install
# ou com yarn
yarn install
# ou com pnpm
pnpm install

# 4. Configurar variáveis de ambiente (opcional)
cp .env.example .env

# 5. Iniciar servidor de desenvolvimento
npm run dev
# ou
yarn run dev
# ou
pnpm run dev

# 6. Abrir no navegador
# O app abrirá automaticamente em http://localhost:3000

```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
