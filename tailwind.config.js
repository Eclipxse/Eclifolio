/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Syne', 'sans-serif'],
            },
            colors: {
                dark: '#0a0a0a',
                primary: '#ffffff',
                accent: '#3b82f6', // Subtle blue accent, can be changed
                glass: 'rgba(255, 255, 255, 0.05)',
            }
        },
    },
    plugins: [],
}
