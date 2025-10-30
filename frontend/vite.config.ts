import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		proxy: {
			"/generate_resume": "http://localhost:8000",
			"/generate_cover_letter": "http://localhost:8000",
			"/export": "http://localhost:8000",
			"/health": "http://localhost:8000",
			"/last": "http://localhost:8000",
		}
	}
})
