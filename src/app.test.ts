import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { server } from './app.ts'

let address: string

beforeAll(async () => {
  const instance = await server.listen({ port: 3333 })
  address = typeof instance === 'string' ? instance : `http://localhost:3333`
})

afterAll(async () => {
  await server.close()
})

describe('E2E server.ts', () => {
  it('GET /ping deve responder', async () => {
    const res = await fetch(`${address}/ping`)
    const data = await res.json()

    expect(data).toEqual({ pong: 'it worked!' })
  })
})