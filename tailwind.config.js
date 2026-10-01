/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0.375rem',
        sm: '0.375rem',
        md: '0.375rem',
        lg: '0.375rem',
        xl: '0.375rem',
        '2xl': '0.375rem',
        '3xl': '0.375rem',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        righteous: ['var(--font-righteous)', 'Righteous', 'cursive'],
      },
      colors: {
        darkBg: '#090D16',
        cardBg: '#111827',
        cardBorder: '#1F293D',
        brandBlue: '#0085d0',
        brandDarkBlue: '#00529b',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0085d0 0%, #00529b 100%)',
      },
    },
  },
  plugins: [],
};
