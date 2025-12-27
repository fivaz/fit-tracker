export default function (plop) {
	plop.setGenerator("component", {
		description: "Create a component with Storybook and Playwright test",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Component name (PascalCase):",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/components/{{kebabCase name}}/{{kebabCase name}}.tsx",
				templateFile: "templates/component/component.tsx.hbs",
			},
			{
				type: "add",
				path: "src/components/{{kebabCase name}}/{{kebabCase name}}.stories.tsx",
				templateFile: "templates/component/story.tsx.hbs",
			},
			{
				type: "add",
				path: "src/components/{{kebabCase name}}/{{kebabCase name}}.spec.ts",
				templateFile: "templates/component/test.spec.ts.hbs",
			},
		],
	});
}
