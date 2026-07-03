/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
   theme: {
      extend: {
         // fontFamily: {
         //    montserrat: ['Montserrat', 'sans-serif'],
         // },

         colors: {
            debug: '#00ffff',
            gray_mv: '#4A4A4A',
            greylight_mv: '#767676',

            // purple_mv: '#8149E2',
            purple_mv: '#8149E2',

            background_top: '#8149E2',
            background_bottom: '#050505',
            text_banner: '#8149E2',
            line_cards: '#ffffff',
         },
         keyframes: {
            slideUp: {
               '0%': { transform: 'translateY(100%)' },
               '100%': { transform: 'translateY(0)' },
            },
            slideDown: {
               '0%': { transform: 'translateY(0)' },
               '100%': { transform: 'translateY(100%)' },
            },
            fadeIn: {
               '0%': { opacity: '0', transform: 'translateY(12px)' },
               '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            floatSlow: {
               '0%, 100%': { transform: 'translateY(0)' },
               '50%': { transform: 'translateY(-20px)' },
            },
            slideInRight: {
               '0%': { transform: 'translateX(100%)' },
               '100%': { transform: 'translateX(0)' },
            },
            slideOutRight: {
               '0%': { transform: 'translateX(0)' },
               '100%': { transform: 'translateX(100%)' },
            },
            overlayIn: {
               '0%': { opacity: '0' },
               '100%': { opacity: '1' },
            },
         },
         animation: {
            slideUp: 'slideUp 0.3s ease-out forwards',
            slideDown: 'slideDown 0.3s ease-in forwards',
            fadeIn: 'fadeIn 0.7s ease-out forwards',
            floatSlow: 'floatSlow 8s ease-in-out infinite',
            slideInRight: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            slideOutRight: 'slideOutRight 0.3s ease-in forwards',
            overlayIn: 'overlayIn 0.3s ease-out forwards',
         },
      },
   },
   content: [
      './src/**/*.{astro,html,js,jsx,ts,tsx}',
      './components/**/*.{astro,js,jsx,ts,tsx}',
      './layouts/**/*.{astro,js,jsx,ts,tsx}',
   ],
   plugins: [],
};
