import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeCouse } from "../tests/factory/make-course.ts";

test("get course by id", async () => {
  server.ready();

  const course = await makeCouse();

  const response = await request(server.server)
    .get(`/courses/${course.id}`)
    .set("Content-Type", "application/json");

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});
