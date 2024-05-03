/** @type {import('tailwindcss').Config} */

const textShadowPlugin = require("tailwindcss-textshadow");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      backgroundImage: {
        'hero-pattern': "url('/img/hero-img.png')",
        'login-pattern': "url('https://gicesperu.org/img/publicaciones/36_publi_img_jmgarcia_20191030-153401_imagenes_lv_terceros_istock-858357926_4_7_1292032977-k4IE-U4821793279822jG-992x558@LaVanguardia-Web.jpg.jpeg')"
      },
      backgroundColor: {
        customColor: "#976666",
        darker: "#2B3348",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [textShadowPlugin],
};
