import { useEffect, useState, useRef } from "react";

const HackCard = () => {
   const [count, setCount] = useState(1);
   const [isDrawerVisible, setIsDrawerVisible] = useState(false);
   const [isClosing, setIsClosing] = useState(false);

   const [form, setForm] = useState({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      tarjeta: "",
      vencimiento: "",
      cvv: "",
   });

   const [errors, setErrors] = useState({});

   const drawerRef = useRef(null);

   const openDrawer = () => {
      setIsDrawerVisible(true);
      setIsClosing(false);
   };

   const closeDrawer = () => {
      setIsClosing(true);
      setTimeout(() => {
         setIsDrawerVisible(false);
         setErrors({});
         setForm({
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            tarjeta: "",
            vencimiento: "",
            cvv: "",
         });
      }, 300);
   };

   useEffect(() => {
      if (isDrawerVisible && drawerRef.current) {
         drawerRef.current.focus();
      }
   }, [isDrawerVisible]);

   useEffect(() => {
      document.body.style.overflow = isDrawerVisible ? "hidden" : "auto";

      function handleKeyDown(e) {
         if (e.key === "Escape" && isDrawerVisible) closeDrawer();
      }
      function handleClickOutside(e) {
         if (e.target.id === "drawer-overlay") closeDrawer();
      }

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("keydown", handleKeyDown);
         document.removeEventListener("click", handleClickOutside);
      };
   }, [isDrawerVisible]);

   const increment = () => setCount((c) => c + 1);
   const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((f) => ({ ...f, [name]: value }));

      // Opcional: limpiar error al cambiar
      setErrors((errs) => ({ ...errs, [name]: "" }));
   };

   // Validaciones regex
   const validations = {
      nombre: {
         regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
         message: "Nombre inválido (solo letras y espacios, 2-30 caracteres).",
      },
      apellido: {
         regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
         message: "Apellido inválido (solo letras y espacios, 2-30 caracteres).",
      },
      email: {
         regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
         message: "Correo electrónico inválido.",
      },
      telefono: {
         regex: /^\+?[\d\s\-]{7,15}$/,
         message: "Teléfono inválido (7 a 15 dígitos, puede incluir +, espacios y guiones).",
      },
      tarjeta: {
         regex: /^\d{13,19}$/,
         message: "Número de tarjeta inválido (13 a 19 dígitos).",
      },
      vencimiento: {
         regex: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
         message: "Vencimiento inválido (MM/AA).",
      },
      cvv: {
         regex: /^\d{3,4}$/,
         message: "CVV inválido (3 o 4 dígitos).",
      },
   };

   // Validar todos los campos
   const validateForm = () => {
      const newErrors = {};

      Object.entries(validations).forEach(([field, { regex, message }]) => {
         if (!form[field].trim()) {
            newErrors[field] = "Este campo es obligatorio.";
         } else if (!regex.test(form[field].trim())) {
            newErrors[field] = message;
         }
      });

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (validateForm()) {
         alert(`Compra confirmada! Cantidad: ${count}, Total: $${500 * count} MXN.\nDatos: ${JSON.stringify(form)}`);
         closeDrawer();
      }
   };

   return (
      <div className="flex flex-col items-center justify-center px-4 mt-10">
         <div
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center space-y-4 max-w-md w-full"
           
         >
            <img src="/elhack-negro.png" alt="Movapp Logo" className="w-32 h-auto" />
            <p className="text-gray-500 text-center text-lg">Nuestra solución al acoso de las apps de préstamo.</p>

            <div className="flex items-center space-x-2">
               <button
                  onClick={decrement}
                  className="bg-purple-300 px-3 py-2 rounded font-bold text-white"
                  aria-label="Disminuir cantidad"
               >
                  -
               </button>
               <span className="text-xl font-bold" aria-live="polite">
                  {count}
               </span>
               <button
                  onClick={increment}
                  className="bg-purple-300 px-3 py-2 rounded font-bold text-white"
                  aria-label="Aumentar cantidad"
               >
                  +
               </button>
            </div>

            <p className="text-gray-600 text-lg">Selecciona el número de hacks.</p>
            <p className="text-xl font-bold">${500 * count} MXN</p>

            <button
               className="bg-purple-600 hover:bg-purple-500 text-white font-bold h-8  w-auto px-5 rounded-full flex justify-center items-center"
               onClick={openDrawer}
               aria-haspopup="dialog"
               aria-expanded={isDrawerVisible}
            >
               COMPRAR
            </button>
         </div>

         {isDrawerVisible && (
            <div
               id="drawer-overlay"
               className="fixed inset-0 flex items-end justify-center bg-black/50 z-50"
               role="dialog"
               aria-modal="true"
            >
               <div
                  ref={drawerRef}
                  tabIndex={-1}
                  className={`bg-white w-full max-w-md min-h-[400px] rounded-t-xl p-6 relative shadow-2xl ring-2 ring-purple-300 z-50
              ${isClosing ? "animate-slideDown" : "animate-slideUp"} transform`}
               >
                  <button
                     onClick={closeDrawer}
                     className="absolute top-2 right-4 text-gray-400 text-2xl font-bold"
                     aria-label="Cerrar"
                  >
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

                  <form className="grid gap-3" onSubmit={handleSubmit} noValidate>
                     <div>
                        <input
                           className={`border p-2 rounded w-full ${
                              errors.nombre ? "border-red-500" : "border-gray-300"
                           }`}
                           placeholder="Nombre"
                           name="nombre"
                           value={form.nombre}
                           onChange={handleChange}
                           aria-label="Nombre"
                           required
                        />
                        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                     </div>

                     <div>
                        <input
                           className={`border p-2 rounded w-full ${
                              errors.apellido ? "border-red-500" : "border-gray-300"
                           }`}
                           placeholder="Apellido"
                           name="apellido"
                           value={form.apellido}
                           onChange={handleChange}
                           aria-label="Apellido"
                           required
                        />
                        {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
                     </div>

                     <div>
                        <input
                           className={`border p-2 rounded w-full ${
                              errors.email ? "border-red-500" : "border-gray-300"
                           }`}
                           placeholder="Correo electrónico"
                           type="email"
                           name="email"
                           value={form.email}
                           onChange={handleChange}
                           aria-label="Correo electrónico"
                           required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                     </div>

                     <div>
                        <input
                           className={`border p-2 rounded w-full ${
                              errors.telefono ? "border-red-500" : "border-gray-300"
                           }`}
                           placeholder="Teléfono"
                           type="tel"
                           name="telefono"
                           value={form.telefono}
                           onChange={handleChange}
                           aria-label="Teléfono"
                           required
                        />
                        {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
                     </div>

                     <div>
                        <input
                           className={`border p-2 rounded w-full ${
                              errors.tarjeta ? "border-red-500" : "border-gray-300"
                           }`}
                           placeholder="Número de tarjeta"
                           name="tarjeta"
                           value={form.tarjeta}
                           onChange={handleChange}
                           aria-label="Número de tarjeta"
                           required
                        />
                        {errors.tarjeta && <p className="text-red-500 text-sm mt-1">{errors.tarjeta}</p>}
                     </div>

                     <div className="flex gap-3">
                        <div className="flex-1">
                           <input
                              className={`border p-2 rounded w-full ${
                                 errors.vencimiento ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="Vencimiento (MM/AA)"
                              name="vencimiento"
                              value={form.vencimiento}
                              onChange={handleChange}
                              aria-label="Vencimiento (MM/AA)"
                              required
                           />
                           {errors.vencimiento && <p className="text-red-500 text-sm mt-1">{errors.vencimiento}</p>}
                        </div>
                        <div className="flex-1">
                           <input
                              className={`border p-2 rounded w-full ${
                                 errors.cvv ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="CVV"
                              name="cvv"
                              value={form.cvv}
                              onChange={handleChange}
                              aria-label="CVV"
                              required
                           />
                           {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                     </div>

                     <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
                     >
                        CONFIRMAR COMPRA
                     </button>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default HackCard;
