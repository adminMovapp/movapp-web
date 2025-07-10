import { useEffect, useState } from "react";

const HackCard = () => {
   const [count, setCount] = useState(1);
   const [isDrawerVisible, setIsDrawerVisible] = useState(false);
   const [isClosing, setIsClosing] = useState(false);

   const openDrawer = () => {
      setIsDrawerVisible(true);
      setIsClosing(false);
   };

   const closeDrawer = () => {
      setIsClosing(true);
      setTimeout(() => {
         setIsDrawerVisible(false);
      }, 300);
   };

   useEffect(() => {
      document.body.style.overflow = isDrawerVisible ? "hidden" : "auto";
   }, [isDrawerVisible]);

   const increment = () => setCount((c) => c + 1);
   const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

   return (
      <div className="flex flex-col items-center justify-center px-4 mt-10">
         <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center space-y-4 max-w-md w-full">
            <img src="/elhack-negro.png" alt="Movapp Logo" className="w-32 h-auto" />
            <p className="text-gray-500 text-center">Nuestra solución al acoso de las apps de préstamo.</p>

            <div className="flex items-center space-x-2">
               <button onClick={decrement} className="bg-purple-300 px-3 py-2 rounded font-bold text-white">
                  -
               </button>
               <span className="text-xl font-bold">{count}</span>
               <button onClick={increment} className="bg-purple-300 px-3 py-2 rounded font-bold text-white">
                  +
               </button>
            </div>

            <p className="text-gray-600">Selecciona el número de hacks.</p>
            <p className="text-xl font-bold">${500 * count} MXN</p>

            <button
               className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold px-6 py-3 rounded-full"
               onClick={openDrawer}
            >
               COMPRAR
            </button>
         </div>

         {isDrawerVisible && (
            <div className="fixed inset-0 flex items-end justify-center bg-black/50 z-50">
               <div
                  className={`bg-white w-full max-w-md min-h-[400px] rounded-t-xl p-6 relative shadow-2xl ring-2 ring-purple-300 z-50
              ${isClosing ? "animate-slideDown" : "animate-slideUp"} transform`}
               >
                  <button onClick={closeDrawer} className="absolute top-2 right-4 text-gray-400 text-2xl font-bold">
                     ×
                  </button>

                  <div className="mb-4 text-center">
                     <div className="text-lg font-bold text-gray-700">
                        Producto: <span className="text-purple-600">El Hack</span>
                     </div>
                     <div className="text-lg text-gray-500">Cantidad: {count}</div>
                     <div className="text-xl font-bold text-gray-900 mt-1">Total: ${500 * count} MXN</div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center">Completa tu información</h3>

                  <div className="grid gap-3">
                     <input className="border p-2 rounded" placeholder="Nombre" />
                     <input className="border p-2 rounded" placeholder="Apellido" />
                     <input className="border p-2 rounded" placeholder="Correo electrónico" type="email" />
                     <input className="border p-2 rounded" placeholder="Teléfono" type="tel" />
                     <input className="border p-2 rounded" placeholder="Número de tarjeta" />
                     <div className="flex gap-3">
                        <input className="border p-2 rounded w-1/2" placeholder="Vencimiento (MM/AA)" />
                        <input className="border p-2 rounded w-1/2" placeholder="CVV" />
                     </div>
                  </div>

                  <button className="mt-4 w-full bg-blue-600 text-white font-bold py-2 rounded">
                     CONFIRMAR COMPRA
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default HackCard;
