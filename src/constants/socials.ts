// src/constants/socials.ts

export const URLS = {
   youtube: "https://www.youtube.com/@movappoficial",
   facebook: "https://www.facebook.com/movappbymann",
   instagram: "https://www.instagram.com/movappbymann",
   tiktok: "https://www.tiktok.com/@erikmanndp",
   whatsapp: {
      oficial:
         "https://api.whatsapp.com/send/?phone=5215574360621&text&type=phone_number&app_absent=0",
      principal:
         "https://api.whatsapp.com/send/?phone=5215578767442&text&type=phone_number&app_absent=0",
      colombia:
         "https://api.whatsapp.com/send/?phone=573045829040&text&type=phone_number&app_absent=0",
      ecuador:
         "https://api.whatsapp.com/send/?phone=593983639715&text&type=phone_number&app_absent=0",
      peru: "https://api.whatsapp.com/send/?phone=51958102730&text&type=phone_number&app_absent=0",
   },
};

export const SOCIALS = [
   {
      name: "YouTube",
      url: URLS.youtube,
      icon: "Icono-Youtube.png",
      count: 28400,
      description:
         "Accede a contenido exclusivo, tutoriales sobre El Hack, entrevistas con expertos y mucho más. ¡Suscríbete y activa las notificaciones para no perderte nada!",
   },
   {
      name: "Facebook",
      url: URLS.facebook,
      icon: "Icono-Facebook.png",
      count: 3100,
      description:
         "Únete a nuestra comunidad en Facebook para mantenerte al tanto de las últimas noticias y actualizaciones.",
   },
   {
      name: "Instagram",
      url: URLS.instagram,
      icon: "Icono-Instagram.png",
      count: 3800,
      description:
         "¡Síguenos para ver tips rápidos, noticias y contenido visual sobre cómo proteger tu información!",
   },
   {
      name: "TikTok",
      url: URLS.tiktok,
      icon: "Icono-Tik-Tok.png",
      count: 3500,
      description:
         "Síguenos en TikTok para ver contenido dinámico y divertido sobre cómo proteger tus datos y más.",
   },
];

export const VIDEOS = {
   inicio:
      "https://www.youtube.com/embed/vNZxLXI75_U?autoplay=1&mute=1&loop=1&playlist=vNZxLXI75_U",
   movapp:
      "https://www.youtube.com/embed/SM5hBiuv-og?autoplay=1&mute=1&loop=1&playlist=SM5hBiuv-og",
   testimonios:
      "https://www.youtube.com/embed/iiuid3nlolU?autoplay=1&mute=1&loop=1&playlist=iiuid3nlolU",
   colaboraciones:
      "https://www.youtube.com/embed/owi6YB41tnM?autoplay=1&mute=1&loop=1&playlist=owi6YB41tnM",
};
