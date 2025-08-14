import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { eq } from "drizzle-orm";
import { getCourseByIdSchema } from "./coursesSchema.ts";


export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get("/courses/:id", getCourseByIdSchema,
    async (request, replay) => {
    
      const courseId = request.params.id;
      const result = await db.select().from(courses).where(eq(courses.id, courseId));

      if (result.length > 0) {
        return { course: result[0] };
      }

      return replay.status(404).send();
    }
  );
};


