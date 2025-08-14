import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { getCoursesSchema } from "./coursesSchema.ts";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {

  server.get("/courses", getCoursesSchema,
    async (request, reply) => {
      const result = await db.select({id: courses.id, title: courses.title,}).from(courses);
      return reply.send({ courses: result });
    }
  );
  
};

