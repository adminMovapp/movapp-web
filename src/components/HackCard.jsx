import { useEffect, useState, useRef } from 'react';

import useCountryConfig from '@hooks/useCountryConfig';
import { createPreference } from '@api/api';

import { useMetaPixel } from '@hooks/useMetaPixel.jsx';

const HackCard = () => {
   const [count, setCount] = useState(1);
   const [isDrawerVisible, setIsDrawerVisible] = useState(false);
   const [isClosing, setIsClosing] = useState(false);
   const { country, config } = useCountryConfig();

   const { trackPurchase, trackInitiateCheckout } = useMetaPixel(import.meta.env.PUBLIC_META_PIXEL_ID);

   const disabled = country; //=== 'MX';
   const productName = 'El Hack';

   const [form, setForm] = useState({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      codigoPostal: '',
   });

   const [errors, setErrors] = useState({});
   const drawerRef = useRef(null);
   const mpRef = useRef(null);

   useEffect(() => {
      const interval = setInterval(() => {
         if (window.MercadoPago && !mpRef.current) {
            mpRef.current = new window.MercadoPago(import.meta.env.PUBLIC_KEY_MP, {
               locale: 'es-MX',
            });
            clearInterval(interval); // solo una vez
         }
      }, 300); // chequea cada 300ms

      return () => clearInterval(interval);
   }, []);

   const openDrawer = async () => {
      setIsDrawerVisible(true);
      setIsClosing(false);

      // Trackear inicio de checkout
      const value = (config.precioMx * count).toFixed(2);
      await trackInitiateCheckout(parseFloat(value), 'MXN', [productName]);
   };

   const closeDrawer = () => {
      setIsClosing(true);
      setTimeout(() => {
         setIsDrawerVisible(false);
         setErrors({});
         setForm({
            nombre: '',
            apellidos: '',
            email: '',
            telefono: '',
            codigoPostal: '',
         });
      }, 300);
   };

   useEffect(() => {
      if (isDrawerVisible && drawerRef.current) {
         drawerRef.current.focus();
      }
   }, [isDrawerVisible]);

   useEffect(() => {
      document.body.style.overflow = isDrawerVisible ? 'hidden' : 'auto';

      function handleKeyDown(e) {
         if (e.key === 'Escape' && isDrawerVisible) closeDrawer();
      }
      function handleClickOutside(e) {
         if (e.target.id === 'drawer-overlay') closeDrawer();
      }

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('keydown', handleKeyDown);
         document.removeEventListener('click', handleClickOutside);
      };
   }, [isDrawerVisible]);

   const increment = () => setCount((c) => c + 1);
   const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((f) => ({ ...f, [name]: value }));

      // Opcional: limpiar error al cambiar
      setErrors((errs) => ({ ...errs, [name]: '' }));
   };

   // Validaciones regex
   const validations = {
      nombre: {
         regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
         message: 'Nombre inválido (solo letras y espacios, 2-30 caracteres).',
      },
      apellidos: {
         regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
         message: 'Apellidos inválidos (solo letras y espacios, 2-30 caracteres).',
      },
      email: {
         regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
         message: 'Correo electrónico inválido.',
      },
      telefono: {
         regex: /^\+?[\d\s\-]{7,15}$/,
         message: 'Teléfono inválido (7 a 15 dígitos, puede incluir +, espacios y guiones).',
      },
      codigoPostal: {
         regex: /^[a-zA-Z0-9\s\-]{4,6}$/,
         message: 'Código postal inválido (4 a 6 caracteres, números, letras, espacios o guiones).',
      },
   };

   const validateForm = () => {
      // if (!validacionActiva) return true;

      const newErrors = {};

      Object.entries(validations).forEach(([field, { regex, message }]) => {
         if (!form[field].trim()) {
            newErrors[field] = 'Este campo es obligatorio.';
         } else if (!regex.test(form[field].trim())) {
            newErrors[field] = message;
         }
      });

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (validateForm()) {
         const totalValue = (config.precioMx * count).toFixed(2);
         const idProducto = config.id_producto;

         const payload = {
            id_producto: idProducto,
            nombre: form.nombre,
            apellidos: form.apellidos,
            correo: form.email,
            telefono: form.telefono,
            codigopostal: form.codigoPostal,
            producto: productName,
            cantidad: count,
            precio_unitario: config.precioMx.toFixed(2),
            total: totalValue,
            pais: country,
         };

         try {
            const response = await createPreference(payload);

            if (response?.id) {
               // Trackear compra completada (lado del cliente)
               await trackPurchase(parseFloat(totalValue), 'MXN', [productName]);

               mpRef.current.checkout({
                  preference: {
                     id: response.id,
                  },
                  autoOpen: true, // abrir automáticamente
                  iframe: true, // abrir como modal
               });
            } else {
               // console.error('No se encontró init_point en la respuesta.');
            }
         } catch (error) {
            // console.error('Error al crear preferencia:', error);
         }
         setCount(1);
         closeDrawer();
      }
   };

   return (
      <div className="flex flex-col items-center justify-center px-2 mt-10">
         {!disabled && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded w-full max-w-md text-center font-semibold">
               Lo sentimos, la opción de compra no está disponible en tu país ({config.nombre}).
            </div>
         )}

         <div
            className="rounded-lg 
         border border-white/10
         
         shadow-md  p-6 flex flex-col items-center space-y-4 max-w-lg w-full"
         >
            <img src="../elhack-blanco.png" alt="Movapp Logo" className="w-32 h-auto" />
            <p className="text-white text-center text-sm md:text-lg">
               Nuestra solución al acoso de las apps de préstamo.
            </p>

            <div className="flex items-center space-x-2">
               <button
                  onClick={decrement}
                  className="bg-text_banner/80 px-3 py-2 rounded font-bold text-white"
                  aria-label="Disminuir cantidad"
               >
                  -
               </button>
               <span className="text-xl font-bold text-white" aria-live="polite">
                  {count}
               </span>
               <button
                  onClick={increment}
                  className="bg-text_banner/80 px-3 py-2 rounded font-bold text-white"
                  aria-label="Aumentar cantidad"
               >
                  +
               </button>
            </div>

            <p className="text-white text-sm md:text-lg text-center">Selecciona el número de hacks.</p>
            <div className="flex items-center space-x-2">
               <p className="text-xl font-bold text-white mt-1">
                  Tu pago es de : {config.simbolo} {(config.precio * count).toFixed(2)} {config.moneda}
               </p>
               <span className={`fi ${config.bandera} rounded-md`} style={{ fontSize: '2rem' }}></span>
            </div>

            {country !== 'MX' ? (
               <div className="flex items-center space-x-2">
                  <p className="text-md font-light">
                     Y la conversión es de : {'$'} {(config.precioMx * count).toFixed(2)} {'mxn'}
                  </p>
               </div>
            ) : null}

            <button
               className={`bg-text_banner  hover:bg-text_banner/70 text-white font-bold h-8 w-auto px-5 rounded-md flex justify-center items-center
            ${!disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
               onClick={openDrawer}
               aria-haspopup="dialog"
               aria-expanded={isDrawerVisible}
               disabled={!disabled}
            >
               Comprar
            </button>
         </div>

         {isDrawerVisible && (
            <div
               id="drawer-overlay"
               className="fixed inset-0 flex items-end justify-center bg-black/50 z-50 "
               role="dialog"
               aria-modal="true"
            >
               <div
                  ref={drawerRef}
                  tabIndex={-1}
                  className={`bg-black/90                 
                     max-w-md md:max-w-lg md:w-full 
                     min-h-[400px]
                     rounded-t-xl p-5 md:p-8 relative shadow-xl ring-1 ring-white/10 z-50
                   ${isClosing ? 'animate-slideDown' : 'animate-slideUp'} transform`}
               >
                  <button
                     onClick={closeDrawer}
                     className="absolute top-2 right-4 text-white text-2xl font-bold"
                     aria-label="Cerrar"
                  >
                     ×
                  </button>

                  <div className="mb-4 text-center">
                     <div className="text-lg font-bold text-white">
                        Producto: <span className="text-text_banner">{productName}</span>
                     </div>
                     <div className="text-lg font-bold text-white">{`Cantidad = ${count}`}</div>
                     <div className="flex items-center justify-center space-x-2">
                        <div className="text-xl font-bold text-white mt-1">
                           {`Total = ${config.simbolo}
                           ${(config.precio * count).toFixed(2)} ${config.moneda}`}
                        </div>
                        <span className={`fi ${config.bandera} rounded-md`} style={{ fontSize: '2rem' }}></span>
                     </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center mt-5 text-white">Completa tu información</h3>

                  <form className="grid gap-3 max-w-md mx-auto" onSubmit={handleSubmit} noValidate>
                     <div>
                        <input
                           className={`border  border-white/10 p-2 rounded w-full bg-black/70 text-white ${
                              errors.nombre ? 'border-red-500' : 'border-gray-300'
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
                           className={`border border-white/10 p-2 rounded w-full bg-black/70 text-white ${
                              errors.apellidos ? 'border-red-500' : 'border-gray-300'
                           }`}
                           placeholder="Apellidos"
                           name="apellidos"
                           value={form.apellidos}
                           onChange={handleChange}
                           aria-label="Apellidos"
                           required
                        />
                        {errors.apellidos && <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>}
                     </div>

                     <div>
                        <input
                           className={`border border-white/10 p-2 rounded w-full bg-black/70 text-white ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
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
                           className={`border border-white/10 p-2 rounded w-full bg-black/70 text-white ${
                              errors.telefono ? 'border-red-500' : 'border-gray-300'
                           }`}
                           placeholder="Teléfono"
                           type="tel"
                           name="telefono"
                           value={form.telefono}
                           onChange={handleChange}
                           aria-label="Teléfono"
                           required
                           maxLength={14}
                        />
                        {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
                     </div>

                     <div>
                        <input
                           className={`border border-white/10 p-2 rounded w-full bg-black/70 text-white ${
                              errors.codigoPostal ? 'border-red-500' : 'border-gray-300'
                           }`}
                           placeholder="Código postal"
                           name="codigoPostal"
                           value={form.codigoPostal}
                           onChange={handleChange}
                           aria-label="Código postal"
                           required
                           maxLength={6}
                        />
                        {errors.codigoPostal && <p className="text-red-500 text-sm mt-1">{errors.codigoPostal}</p>}
                     </div>

                     <button
                        type="submit"
                        className="mt-4 w-full bg-text_banner text-white font-bold py-2 rounded hover:bg-text_banner/70 transition"
                     >
                        Finaliza tu compra
                     </button>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default HackCard;
