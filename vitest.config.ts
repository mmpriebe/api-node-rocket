    import { defineConfig } from 'vitest/config'

    export default defineConfig({
      test: {
        coverage: {
          provider: 'v8',
          reporter: ['text', 'html'],
          include: ['src/**/*.ts'],
          exclude: ['src/types.ts', 'src/database/*.ts'],
          enabled: true
        },
      },
    })