import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses, enrollments } from "../database/schema.ts";
import { getCoursesSchema } from "./coursesSchema.ts";
import { ilike, asc, SQL, and, eq, count } from "drizzle-orm";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {

  server.get("/courses", getCoursesSchema,
    async (request, reply) => {

      const { search, orderBy, page } = request.query;

      const conditions: SQL[] = [];

      if (search) {
        conditions.push(ilike(courses.title, `%${search}%`));
      }

      const [result, total] =  await Promise.all([
        db.select(
          {
            id: courses.id, 
            title: courses.title,
            enrollments: count(enrollments.id)
          }
        )
          .from(courses)
          .innerJoin(enrollments, eq(enrollments.courseId, courses.id))
          .orderBy(asc(courses[orderBy]))
          .limit(10)
          .offset((page - 1) * 2)
          .where(and(...conditions))
          .groupBy(courses.id),
         
        db.$count(courses, and(...conditions))
      ])

      return reply.send({ courses: result, total_cursos: total, page, perPage: 10 });
    }
  );
  
};

