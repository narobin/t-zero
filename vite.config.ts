import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				xadditionalData: `
				  @use '$lib/styles/theme' as *;
				`,
			}
		},
	},
	build: {
		outDir: 'build',
	}
});
