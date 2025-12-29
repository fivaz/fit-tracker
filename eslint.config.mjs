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
		plugins: {
			"unused-imports": unusedImports,
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			"@typescript-eslint/no-empty-object-type": "warn",

			// --- Unused Imports Logic ---
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],

			// --- Custom Import Sorting ---
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
						// 1. Packages: react and next related packages come first
						["^react", "^next"],
						// 2. Other external packages
						["^@?\\w"],
						// 3. Internal aliases (using your @/ prefix)
						["^@/"],
						// 4. Side effect imports (e.g. import "./styles.css")
						["^\\u0000"],
						// 5. Parent imports, then other relative imports
						["^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
						// 6. Style imports
						["^.+\\.s?css$"],
					],
				},
			],
			"simple-import-sort/exports": "error",
		},
	},
);

export default eslintConfig;
