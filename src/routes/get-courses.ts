import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { getCoursesSchema } from "./coursesSchema.ts";
import { ilike } from "drizzle-orm";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {

  server.get("/courses", getCoursesSchema,
    async (request, reply) => {

      const { search } = request.query;

      const result = await db.select({id: courses.id, title: courses.title,})
        .from(courses)
        .where(search ? ilike(courses.title, search) : undefined)

      return reply.send({ courses: result });
    }
  );
  
};

