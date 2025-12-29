import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig(
	[
		...nextVitals,
		...nextTs,
		...storybook.configs["flat/recommended"],

		globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
	],
	{
		// Add the plugins to the config
		plugins: {
			"unused-imports": unusedImports,
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			"@typescript-eslint/no-empty-object-type": "warn",

			// --- Unused Imports Logic ---
			"no-unused-vars": "off", // Must turn off base rule
			"@typescript-eslint/no-unused-vars": "off", // Must turn off TS rule
			"unused-imports/no-unused-imports": "error", // Auto-remove unused imports
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],

			// --- Import Sorting Logic ---
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
);

export default eslintConfig;
