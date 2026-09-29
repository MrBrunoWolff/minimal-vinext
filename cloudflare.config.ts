import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "minimal-vinext",
		compatibilityDate: "2026-02-12",
		compatibilityFlags: [
			"nodejs_compat",
		],
		entrypoint: "vinext/server/app-router-entry",
		assets: {
			notFoundHandling: "none",
		},
	},
});
