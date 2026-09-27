export default {
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
      threshold: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85
      }
    }
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { useESM: true }]
  }
}
