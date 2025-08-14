import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../database/client.ts';
import { courses } from '../database/schema.ts';
import { createCourseSchema } from "./coursesSchema.ts";


export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/courses", createCourseSchema , async (request, replay) => {

    const courseTitle = request.body.title;
    const result = await db.insert(courses).values({title: courseTitle}).returning();

    replay.status(201).send({ courseId: result[0].id });
  });
}

