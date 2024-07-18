const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {

	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

	],
	darkMode: 'class',
	theme: {
		extend: {

			fontFamily: {
				Noto: ['var(--font-Noto)'],
			},

		}
	},
	plugins: [nextui(
		{
			layout: {
				radius: {
					small: "0.4em", // rounded-small
					medium: "0.6em", // rounded-medium
					large: "0.8em", // rounded-large
				}
			},
			themes: {
				light: {
					colors: {
						primary: "#0C41E2",
						secondary: "#EDF1FE",
						background: "#FFFFFF",
						foreground: "#000000",
						danger: '#f03c3c',
						success: '#29AB87',
						info: "#129ac4",
					}
				},
				dark: {
					colors: {
						primary: "#6A90FF",
						secondary: "#1C1C1C",
						background: "#282828",
						foreground: "#FFFFFF",
						danger: '#f03c3c',
						success: '#29AB87',
						info: "#129ac4"
					}
				},
				amoled: {
					extend: 'dark',
					colors: {
						primary: "#6A90FF",
						secondary: "#1C1C1C",
						background: "#000000",
						foreground: "#FFFFFF",
						danger: '#f03c3c',
						success: '#29AB87',
						info: "#129ac4"
					}
				}
			},
		}
	)],
}
