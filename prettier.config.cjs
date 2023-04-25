/** @type {import("prettier").Config} */
const config = {
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
	useTabs: true,
	semi: true,
	trailingComma: "all",
	singleQuote: false,
};

module.exports = config;
