import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	console.log("-->", mode);
	return {
		server: {
			proxy: {
				"/api": {
					target: `http://localhost:${loadEnv(mode, process.cwd()).VITE_PORT}`,
					changeOrigin: true,
				},
			},
		},
	};
});
