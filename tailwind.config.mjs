/** @type {import('tailwindcss').Config} */
export default {
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
            purple_mv: '#1d4ed8',

            background_top: '#02030A',
            background_bottom: '#1d4ed8',
            text_banner: '#1d4ed8',
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
         },
         animation: {
            slideUp: 'slideUp 0.3s ease-out forwards',
            slideDown: 'slideDown 0.3s ease-in forwards',
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
