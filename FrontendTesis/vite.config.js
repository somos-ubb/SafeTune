import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	server: {
		port:process.env.PORT,
		host: process.env.HOST || 'localhost',
		proxy: {
            '/auth': process.env.BACKEND_URL,
			'/api' : process.env.BACKEND_URL,
			'/administrator' : process.env.BACKEND_URL,
        },
	},
	plugins: [sveltekit()]
});
