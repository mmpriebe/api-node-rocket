import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts'
import { makeUser } from '../tests/factory/make-users.ts';

test('execute login', async () => {
    server.ready()

    const { user, passwordBeforeHash } = await makeUser()

    const response = await request(server.server)
        .post('/sessions')
        .set('Content-Type', 'application/json')
        .send({ 
            email: user.email,
            password: passwordBeforeHash
        })

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        message: 'ok'
    })
})
