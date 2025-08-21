import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts'
import { randomUUID } from 'node:crypto';
import { makeCouse } from '../tests/factory/make-course.ts';

test('cria um curso com sucesso', async () => {
    server.ready()

    const titleId = randomUUID();

    const course = await makeCouse(titleId);

    const response = await request(server.server)
        .get(`/courses?search=${titleId}`)

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        courses: [
            {

                id: expect.any(String),
                title: titleId
            }
        ],
        page: 1,
        perPage: 10,
        total_cursos: 1
        })
    });