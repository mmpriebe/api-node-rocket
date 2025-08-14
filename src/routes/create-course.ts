<<<<<<< HEAD
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../database/client.ts';
import { courses } from '../database/schema.ts';
import z from 'zod';


export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/courses",  {
=======
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/courses', {
>>>>>>> b762fc0536286848a254a1d4c61e6a893409703a
    schema: {
      tags: ['courses'],
      summary: 'Create a course',
      body: z.object({
        title: z.string().min(5, 'Título precisa ter 5 caracteres'),
      }),
      response: {
        201: z.object({ courseId: z.uuid() }).describe('Curso criado com sucesso!')
      }
    },
<<<<<<< HEAD
  }, async (request, replay) => {

    const courseTitle = request.body.title;

    const result = await db.insert(courses).values({
      title: courseTitle
    }).returning();

    replay.status(201).send({ courseId: result[0].id });
  });
}

=======
  }, async (request, reply) => {
    const courseTitle = request.body.title
  
    const result = await db
      .insert(courses)
      .values({ title: courseTitle })
      .returning()
  
    return reply.status(201).send({ courseId: result[0].id })
  })
}
>>>>>>> b762fc0536286848a254a1d4c61e6a893409703a
