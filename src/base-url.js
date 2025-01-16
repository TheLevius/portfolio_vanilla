export function getBaseUrl() {
	const env = import.meta.env;
	const port = env.VITE_PORT || "3000";
	const baseUrl =
		env.MODE === "production"
			? env.VITE_BASE_URL
			: `${env.VITE_BASE_URL}:${port}`;
	return baseUrl;
}
