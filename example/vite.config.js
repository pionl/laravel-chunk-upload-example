import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/assets/sass/app.scss',
                'resources/assets/js/app.js',
            ],
            refresh: true,
            publicDirectory: 'chunk-example',
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'resources/assets/js/vendor',
                    dest: ''
                },
                {
                    src: 'node_modules/resumablejs/resumable.js',
                    dest: 'vendor/resumable'
                }
            ]
        })
    ],
    build: {
        outDir: 'chunk-example',
        emptyOutDir: false,
    },
    resolve: {
        alias: {
            // Add any aliases if needed, for example to handle bootstrap-sass
        }
    }
});
