import z from "zod";

export const loginchema = { 
    schema: {
      tags: ['auth'],
      summary: 'Login',
      body: z.object({email: z.email(), password: z.string()}),
      // response: { 201: z.object({ courseId: z.uuid() }).describe('Curso criado com sucesso!') }
    }
}
