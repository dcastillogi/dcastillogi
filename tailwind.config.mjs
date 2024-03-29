/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                'accent': "#0645B1",
                'accent-background': "#E4EBF7",
                'accent-hover': "#0057eb"
            }
        },
        fontFamily: {
            'sans': ['"Inter"', 'sans-serif'],
            'serif': ['"Playfair Display SC"', 'serif'],
        }
	},
	plugins: [],
}
