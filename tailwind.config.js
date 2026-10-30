/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './contact.html'],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
};
