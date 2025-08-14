<<<<<<< HEAD
import fastify from "fastify";
import { fastifySwagger } from '@fastify/swagger'
import {
  validatorCompiler, 
  serializerCompiler, 
  type ZodTypeProvider,  
  jsonSchemaTransform} from 'fastify-type-provider-zod';

import scalarAPIReference from '@scalar/fastify-api-reference'
import { getCoursesRoute } from './src/routes/get-courses.ts';
import { createCourseRoute } from "./src/routes/create-course.ts";
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts";
=======
import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCourseRoute } from './src/routes/create-course.ts'
import { getCourseByIdRoute } from './src/routes/get-course-by-id.ts'
import { getCoursesRoute } from './src/routes/get-courses.ts'
import scalarAPIReference from '@scalar/fastify-api-reference'
>>>>>>> b762fc0536286848a254a1d4c61e6a893409703a

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
  
<<<<<<< HEAD
  server.register(scalarAPIReference, {
=======
  await server.register(scalarAPIReference, {
>>>>>>> b762fc0536286848a254a1d4c61e6a893409703a
    routePrefix: '/docs',
  })
}

<<<<<<< HEAD
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(getCoursesRoute);
server.register(createCourseRoute);
server.register(getCourseByIdRoute);
=======
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(getCoursesRoute)
>>>>>>> b762fc0536286848a254a1d4c61e6a893409703a

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})