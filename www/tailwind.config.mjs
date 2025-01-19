/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'orange': '#FF9900',
                'primary': '#101828',
                'secondary': '#667085'
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif']
            },
            animation: {
                "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
            },
            keyframes: {
                "border-beam": {
                    "100%": {
                        "offset-distance": "100%",
                    },
                },
            },

        },
    },
    plugins: [],
}
