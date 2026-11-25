/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'happy-dom',
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        pool: 'forks',
        maxWorkers: 1,
        fileParallelism: false,
        isolate: false,
        poolOptions: {
            forks: {
                singleFork: true,
            },
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: [
                'src/helper/helper.ts',
                'src/helper/localStorage.ts',
                'src/helper/sessionStorage.tsx',
                'src/feature/exam/**/*.ts',
                'src/components/hooks/useDebounce.tsx',
            ],
        },
    },
});
