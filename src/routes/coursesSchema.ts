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
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string()
              })
            ),
          }),
        },
      },
    }