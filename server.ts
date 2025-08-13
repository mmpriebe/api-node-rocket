import fastify from "fastify";
import { courses } from "./src/database/schema.ts";
import {validatorCompiler, serializerCompiler, type ZodTypeProvider} from 'fastify-type-provider-zod';
import { eq } from "drizzle-orm";
import { db } from "./src/database/client.ts";
import { z} from 'zod';

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);


server.get("/courses", async (request, replay) => {
  const result = await db.select().from(courses);
  return replay.send({ courses: result })
});

server.post("/courses", {
  schema: {
    body: z.object({
      title: z.string(),
    })
  }
}, async (request, replay) => {

  const courseId = crypto.randomUUID();

  const courseTitle = request.body.title;

  if (!courseTitle) {
    return replay.status(400).send({ message: "Titulo obrigatorio" });
  }

  const result = await db.insert(courses).values({
    title: courseTitle
  })

  replay.status(201).send({ result });
});

server.get("/courses/:id", async (request, replay) => {
  type Params = {
    id: string;
  };

  const params: Params = request.params as Params;
  const courseId = params.id;

  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))

  if (courses) {
    return { courses };
  }

  return replay.status(404).send();
});

server.listen({ port: 3333 });
