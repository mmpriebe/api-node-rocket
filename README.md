# API Node Rocket

API simples em Node.js + Fastify para gerenciar cursos.

Links rápidos
- Servidor: `server.ts`
- Scripts: `package.json` (`dev`, `db:generate`, `db:migrate`, `db:studio`)
- Variáveis de ambiente: `.env`
- Docker: `docker-compose.yml`
- Requisições de exemplo: `requisicoes.http`

Principais arquivos e símbolos

- Banco de dados: driver e cliente `src/database/client.ts`
- Schema Drizzle: `src/database/schema.ts` (tabelas `users`, `courses`)
- Rotas:
  - `src/routes/create-course.ts` — rota POST /courses (schema: `src/routes/coursesSchema.ts`)
  - `src/routes/get-courses.ts` — rota GET /courses
  - `src/routes/get-course-by-id.ts` — rota GET /courses/:id

- Schemas de validação: `src/routes/coursesSchema.ts`

Requisitos

- Node.js (versão compatível com o projeto)
- npm
- (Opcional) Docker + docker-compose

Instalação
1. Instale dependências:
```powershell
npm install
```

2. Configure as variáveis de ambiente em um arquivo `.env` na raiz do projeto. Exemplo mínimo:
```text
# .env
DATABASE_URL=sqlite:./dev.db
NODE_ENV=development
PORT=3333
```

Executando a aplicação

Em desenvolvimento (modo padrão fornecido pelo projeto):
```powershell
npm run dev
```

Usando Docker (se preferir):
```powershell
docker-compose up -d
```

Comandos úteis do banco de dados (Drizzle):

- Gerar migration: `npm run db:generate`
- Aplicar migrations: `npm run db:migrate`
- Abrir Studio: `npm run db:studio`

Endpoints principais

- POST /courses — cria um curso (body: exemplo { "title": "Curso de exemplo" })
- GET /courses — lista todos os cursos
- GET /courses/:id — obtém um curso pelo id

Exemplos
Veja `requisicoes.http` para exemplos prontos de requisições (usar com REST Client ou similar).


Observações
- O servidor utiliza Fastify e validação via schemas (Zod) definidos em `src/routes/coursesSchema.ts`.
- As migrations e o schema do banco estão na pasta `drizzle/`.


