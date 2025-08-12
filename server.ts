import fastify from "fastify";
import crypto from "node:crypto";

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
});

const courses = [
  { id: "1", title: "Curso NodeJS" },
  { id: "2", title: "Curso React" },
  { id: "3", title: "Curso React Native" },
];

server.get("/courses", () => {
  return { courses, page: 1 };
});

server.post("/courses", (request, replay) => {
  type Body = {
    title: string;
  };

  const courseId = crypto.randomUUID();

  const body = request.body as Body;

  const courseTitle = body.title;

  if (!courseTitle) {
    return replay.status(400).send({ message: "Titulo obrigatorio" });
  }

  courses.push({ id: courseId, title: courseTitle });

  replay.status(201).send({ courseId });
});

server.get("/courses/:id", (request, replay) => {
  type Params = {
    id: string;
  };

  const params: Params = request.params as Params;

  const courseId = params.id;

  const course = courses.find((course) => course.id === courseId);

  if (course) {
    return { course };
  }

  return replay.status(404).send();
});

server.listen({ port: 3333 });
