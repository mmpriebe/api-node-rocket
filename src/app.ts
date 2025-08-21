import fastify from "fastify";
import { fastifySwagger } from '@fastify/swagger'
import {
  validatorCompiler, 
  serializerCompiler, 
  type ZodTypeProvider,  
  jsonSchemaTransform
} from 'fastify-type-provider-zod';

import scalarAPIReference from '@scalar/fastify-api-reference'

import { getCoursesRoute } from './routes/get-courses.ts';
import { createCourseRoute } from "./routes/create-course.ts";
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts";
import { loginRoute } from "./routes/login.ts";


if(process.env.NODE_ENV === 'development') {

 const server = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  }).withTypeProvider<ZodTypeProvider>()

}

export const server = fastify().withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Desafio Node.js',
        version: '1.0.0',
      }
    },
    transform: jsonSchemaTransform,
  })
  
  server.register(scalarAPIReference, {
    routePrefix: '/docs'
  })
}

server.get('/ping', async () => {
  return { pong: 'it worked!' }
})

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(getCoursesRoute);
server.register(createCourseRoute);
server.register(getCourseByIdRoute);
server.register(loginRoute);


