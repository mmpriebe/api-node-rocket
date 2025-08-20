import z from "zod";

export const createCourseSchema = { 
    schema: {
      tags: ['courses'],
      summary: 'Create a course',
      body: z.object({title: z.string().min(5, 'Título precisa ter 5 caracteres')}),
      response: { 201: z.object({ courseId: z.uuid() }).describe('Curso criado com sucesso!') }
    }
}

export const getCourseByIdSchema = {
      schema: {
        tags: ["courses"],
        summary: "Get course by ID",
        params: z.object({ id: z.uuid() }),
        response: {
          200: z.object({ course: z.object({ id: z.uuid(), title: z.string(), description: z.string().nullable(),})}),
          404: z.null().describe("Course not found"),
        },
      },
    }

export const getCoursesSchema = {
      schema: {
        tags: ["courses"],
        summary: "Get all courses",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(['title', 'id']).optional().default('id'),
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
                enrollments: z.number()
              }),
            ),
            total_cursos: z.number().optional(),
            page: z.number().optional(),
            perPage: z.number().optional().default(2),
          }),
        },
      },
    }