import { useState } from "react";

const MenuMobile = () => {
   const [open, setOpen] = useState(false);

   return (
      <div className="md:hidden relative">
         <button
            onClick={() => setOpen(!open)}
            className="flex flex-col justify-center items-center w-8 h-8 gap-1 focus:outline-none"
            aria-label="Abrir menú"
         >
            <span className="w-6 h-0.5 bg-gray-700"></span>
            <span className="w-6 h-0.5 bg-gray-700"></span>
            <span className="w-6 h-0.5 bg-gray-700"></span>
         </button>

         {open && (
            <nav
               className="absolute top-12 -right-5 w-40
             bg-white/90 backdrop-blur-md
            shadow-lg rounded-lg p-4 flex flex-col gap-2 z-50"
            >
               <a href="/" className="text-gray-700 hover:text-purple-500">
                  Inicio
               </a>
               <a href="/movapp" className="text-gray-700 hover:text-purple-500">
                  Movapp
               </a>
               <a href="/hack" className="text-gray-700 hover:text-purple-500">
                  Hack
               </a>
               <a href="/tienda" className="text-gray-700 hover:text-purple-500">
                  Tienda
               </a>
               <a href="#" className="text-gray-700 hover:text-purple-500">
                  Contenido
               </a>
            </nav>
         )}
      </div>
   );
};

export default MenuMobile;
