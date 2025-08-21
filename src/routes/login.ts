import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../database/client.ts';
import { users } from '../database/schema.ts';
import { loginchema } from "./usersSchema.ts";
import { eq } from "drizzle-orm";
import { verify } from "argon2";


export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/sessions", loginchema , async (request, replay) => {

    const { email, password } = request.body;

    const result = await db.select().from(users)
        .where(eq(users.email, email));

    if(result.length === 0) {
        return replay.status(400).send({message: 'Credentials Invalid.'});
    } 

    const user = result[0];

    const doesPasswordMatch = await verify(user.password, password);

    if (!doesPasswordMatch) {
        return replay.status(400).send({message: 'Credentials Invalid.'});
    }

    replay.status(200).send({ message: 'ok' });
  });
}

