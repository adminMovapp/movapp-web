import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { CartProvider, useCart } from '@context/CartContext.jsx';
import useConfig from '@hooks/useConfig.jsx';
import StripeCheckout from '@components/StripeCheckout.jsx';
import { useMetaPixel } from '@hooks/useMetaPixel.jsx';

const fmt = (n) => Number(n || 0).toFixed(2);

// ============================================================
// Tarjeta de producto del catálogo
// ============================================================
const ProductCard = ({ product, onAdd }) => (
   <div className="group relative flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-neutral-950 dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)] dark:ring-1 dark:ring-black/60 dark:hover:shadow-[0_36px_80px_-12px_rgba(0,0,0,1)]">
      {/* Imagen: fondo claro/oscuro según tema */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-50 p-6 dark:bg-neutral-950">
         {/* Sombra suave bajo el producto para dar profundidad 3D */}
         <div className="pointer-events-none absolute bottom-6 left-1/2 h-6 w-32 -translate-x-1/2 rounded-[100%] bg-black/20 blur-xl dark:bg-black/70"></div>
         {/* Imagen negra en tema claro, blanca en oscuro */}
         <img
            src="/img/elhack-negro.png"
            alt={product.nombre}
            className="relative block max-h-full w-auto max-w-[70%] drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105 dark:hidden"
         />
         <img
            src="/img/elhack-blanco.png"
            alt={product.nombre}
            className="relative hidden max-h-full w-auto max-w-[70%] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105 dark:block"
         />
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-6">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.nombre}</h3>
         <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600 dark:text-white/60">{product.descripcion}</p>

         <div className="mt-5">
            <span className="block text-[11px] uppercase tracking-widest text-gray-400 dark:text-white/40">Precio</span>
            <span className="text-2xl font-extrabold text-text_banner">
               {product.simbolo} {fmt(product.precio)}
               <span className="ml-1 text-sm font-medium text-gray-500 dark:text-white/50">{product.moneda}</span>
            </span>
         </div>

         <button
            onClick={() => onAdd(product)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-text_banner py-3 font-bold text-white shadow-lg shadow-text_banner/25 transition hover:bg-text_banner/80"
         >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Agregar al carrito
         </button>
      </div>
   </div>
);

// ============================================================
// Contenido del drawer lateral: pasos carrito -> datos -> pago
// ============================================================
const validations = {
   nombre: { regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/, message: 'Nombre inválido (2-30 letras).' },
   apellidos: { regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/, message: 'Apellidos inválidos (2-30 letras).' },
   email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo electrónico inválido.' },
   telefono: { regex: /^\+?[\d\s\-]{7,15}$/, message: 'Teléfono inválido (7 a 15 dígitos).' },
   codigoPostal: { regex: /^[a-zA-Z0-9\s\-]{4,6}$/, message: 'Código postal inválido (4 a 6).' },
};

const emptyForm = { nombre: '', apellidos: '', email: '', telefono: '', codigoPostal: '' };

const CheckoutPanel = ({ open, onClose, pais }) => {
   const { cart, count, total, addToCart, decreaseQuantity, removeFromCart } = useCart();
   const { trackInitiateCheckout, trackPurchase } = useMetaPixel(import.meta.env.PUBLIC_META_PIXEL_ID);

   const [isClosing, setIsClosing] = useState(false);
   const [step, setStep] = useState('cart'); // 'cart' | 'form' | 'pay'
   const [form, setForm] = useState(emptyForm);
   const [errors, setErrors] = useState({});
   // clientSecret cacheado: se crea una vez por sesión de checkout y se reutiliza
   // aunque el usuario vaya y vuelva entre datos/pago (evita órdenes duplicadas).
   const [clientSecret, setClientSecret] = useState('');

   const symbol = cart[0]?.simbolo || pais?.simbolo || '$';
   const moneda = cart[0]?.moneda || pais?.moneda || 'MXN';
   const currency = String(moneda).toLowerCase();
   const amountCents = Math.round(total * 100);

   // Bloquear scroll de fondo + cerrar con Escape
   useEffect(() => {
      if (typeof document === 'undefined') return;
      document.body.style.overflow = open ? 'hidden' : 'auto';
      const onKey = (e) => e.key === 'Escape' && open && handleClose();
      document.addEventListener('keydown', onKey);
      return () => {
         document.removeEventListener('keydown', onKey);
         document.body.style.overflow = 'auto';
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open]);

   const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
         setIsClosing(false);
         setStep('cart');
         setErrors({});
         setClientSecret(''); // nueva sesión de checkout la próxima vez
         onClose();
      }, 300);
   };

   // Si cambia el contenido/monto del carrito, invalidar el intent cacheado
   // para que se cree uno nuevo con el monto correcto al volver a pagar.
   useEffect(() => {
      setClientSecret('');
      if (step === 'pay') setStep('cart');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [total]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((f) => ({ ...f, [name]: value }));
      setErrors((errs) => ({ ...errs, [name]: '' }));
   };

   const validateForm = () => {
      const newErrors = {};
      Object.entries(validations).forEach(([field, { regex, message }]) => {
         if (!form[field].trim()) newErrors[field] = 'Este campo es obligatorio.';
         else if (!regex.test(form[field].trim())) newErrors[field] = message;
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const goToForm = () => {
      if (cart.length === 0) return;
      trackInitiateCheckout(total, moneda, cart.map((c) => c.nombre), {
         quantity: count,
         country: pais?.codigo_pais,
         paymentMethod: 'stripe',
      });
      setStep('form');
   };

   const submitForm = (e) => {
      e.preventDefault();
      if (validateForm()) setStep('pay');
   };

   // Payload de create-intent construido desde el carrito (moneda local, cantidades correctas)
   const buildPayload = () => ({
      email: form.email,
      nombre: form.nombre,
      apellidos: form.apellidos,
      telefono: form.telefono,
      codigoPostal: form.codigoPostal,
      pais: pais?.codigo_pais,
      amount: Number(total.toFixed(2)),
      currency,
      items: cart.map((it) => ({
         producto_id: it.producto_id,
         sku: it.sku,
         nombre: it.nombre,
         precio_unitario: Number(parseFloat(it.precio).toFixed(2)),
         cantidad: it.quantity,
      })),
   });

   const onIntentCreated = ({ clientSecret: cs }) => {
      if (cs) setClientSecret(cs); // cachear para reutilizar y no duplicar orden
      trackPurchase(total, moneda, cart.map((c) => c.nombre), {
         email: form.email,
         phone: form.telefono,
         name: `${form.nombre} ${form.apellidos}`,
         postalCode: form.codigoPostal,
         quantity: count,
         country: pais?.codigo_pais,
         paymentMethod: 'stripe',
         customerType: 'new_customer',
      });
   };

   if (!open || typeof document === 'undefined') return null;

   const inputClass = (field) =>
      `w-full rounded-lg border bg-white p-2.5 text-gray-900 placeholder-gray-400 outline-none transition focus:border-text_banner focus:ring-1 focus:ring-text_banner dark:bg-white/5 dark:text-white dark:placeholder-white/30 ${
         errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
      }`;

   // Portal a document.body: evita que un ancestro con transform/filter (AOS,
   // grid de fondo) ancle el overlay fixed y lo muestre "a la mitad".
   return createPortal(
      <div
         id="cart-overlay"
         className={`fixed inset-0 z-[60] flex justify-end bg-black/40 backdrop-blur-sm dark:bg-black/60 ${
            isClosing ? 'opacity-0 transition-opacity duration-300' : 'animate-overlayIn'
         }`}
         role="dialog"
         aria-modal="true"
         onMouseDown={(e) => e.target.id === 'cart-overlay' && handleClose()}
      >
         <div
            className={`flex h-[100dvh] w-full max-w-md flex-col bg-gray-50 shadow-2xl dark:bg-[#0a0a0a] ${
               isClosing ? 'animate-slideOutRight' : 'animate-slideInRight'
            }`}
         >
            {/* Header fijo */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-white/10">
               <div>
                  <p className="text-xs uppercase tracking-widest text-text_banner">
                     {step === 'cart' ? 'Tu carrito' : step === 'form' ? 'Tus datos' : 'Pago seguro'}
                  </p>
                  <h2 className="mt-0.5 text-lg font-bold text-gray-900 dark:text-white">
                     {step === 'cart' ? `${count} artículo${count === 1 ? '' : 's'}` : 'Finaliza tu compra'}
                  </h2>
               </div>
               <button
                  onClick={handleClose}
                  className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Cerrar"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </button>
            </div>

            {/* Cuerpo con scroll (nunca se corta) */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
               {step === 'cart' && (
                  <>
                     {cart.length === 0 ? (
                        <p className="py-10 text-center text-gray-500 dark:text-white/60">Tu carrito está vacío.</p>
                     ) : (
                        <ul className="space-y-4">
                           {cart.map((item) => (
                              <li
                                 key={item.producto_id}
                                 className="flex gap-3 rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-white/5"
                              >
                                 <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-1.5 shadow-md dark:border-white/10 dark:bg-neutral-900">
                                    <img
                                       src="/img/elhack-negro.png"
                                       alt={item.nombre}
                                       className="block max-h-full max-w-full object-contain dark:hidden"
                                    />
                                    <img
                                       src="/img/elhack-blanco.png"
                                       alt={item.nombre}
                                       className="hidden max-h-full max-w-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] dark:block"
                                    />
                                 </div>
                                 <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                       <span className="font-semibold text-gray-900 dark:text-white">{item.nombre}</span>
                                       <button
                                          onClick={() => removeFromCart(item.producto_id)}
                                          className="text-gray-400 transition hover:text-red-500"
                                          aria-label="Eliminar"
                                       >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                       </button>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                       <div className="flex items-center gap-3">
                                          <button
                                             onClick={() => decreaseQuantity(item.producto_id)}
                                             className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                                             aria-label="Disminuir"
                                          >
                                             −
                                          </button>
                                          <span className="w-5 text-center font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                                          <button
                                             onClick={() => addToCart(item)}
                                             className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                                             aria-label="Aumentar"
                                          >
                                             +
                                          </button>
                                       </div>
                                       <span className="font-bold text-gray-900 dark:text-white">
                                          {item.simbolo} {fmt(parseFloat(item.precio) * item.quantity)}
                                       </span>
                                    </div>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     )}
                  </>
               )}

               {step === 'form' && (
                  <form className="grid gap-4" onSubmit={submitForm} noValidate>
                     {['nombre', 'apellidos', 'email', 'telefono', 'codigoPostal'].map((field) => (
                        <div key={field}>
                           <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-white/60">
                              {field === 'codigoPostal' ? 'Código postal' : field.charAt(0).toUpperCase() + field.slice(1)}
                           </label>
                           <input
                              className={inputClass(field)}
                              name={field}
                              type={field === 'email' ? 'email' : field === 'telefono' ? 'tel' : 'text'}
                              value={form[field]}
                              onChange={handleChange}
                              maxLength={field === 'telefono' ? 14 : field === 'codigoPostal' ? 6 : undefined}
                              required
                           />
                           {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
                        </div>
                     ))}
                     <button
                        type="submit"
                        className="mt-1 w-full rounded-lg bg-text_banner py-3 font-bold text-white shadow-lg shadow-text_banner/20 transition hover:bg-text_banner/80"
                     >
                        Continuar al pago
                     </button>
                     <button
                        type="button"
                        onClick={() => setStep('cart')}
                        className="w-full text-sm text-gray-500 transition hover:text-gray-900 dark:text-white/60 dark:hover:text-white"
                     >
                        Volver al carrito
                     </button>
                  </form>
               )}

               {step === 'pay' && (
                  <StripeCheckout
                     buildPayload={buildPayload}
                     existingClientSecret={clientSecret}
                     onIntentCreated={onIntentCreated}
                     onCancel={() => setStep('form')}
                  />
               )}
            </div>

            {/* Footer fijo con total + CTA (solo en paso carrito) */}
            {step === 'cart' && cart.length > 0 && (
               <div className="border-t border-gray-200 px-6 py-5 dark:border-white/10">
                  <div className="mb-3 flex items-center justify-between">
                     <span className="text-gray-600 dark:text-white/60">Total</span>
                     <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                        {symbol} {fmt(total)} {moneda}
                     </span>
                  </div>
                  <button
                     onClick={goToForm}
                     className="w-full rounded-lg bg-text_banner py-3 font-bold text-white shadow-lg shadow-text_banner/20 transition hover:bg-text_banner/80"
                  >
                     Continuar
                  </button>
               </div>
            )}
         </div>
      </div>,
      document.body,
   );
};

// ============================================================
// Botón flotante del carrito con contador
// ============================================================
// Contenido de la tienda (dentro del provider)
// ============================================================
const ShopContent = () => {
   const { loading, prices, pais } = useConfig();
   const { addToCart } = useCart();
   const [drawerOpen, setDrawerOpen] = useState(false);

   const products = useMemo(() => prices || [], [prices]);

   // El ícono del header abre el drawer vía evento global
   useEffect(() => {
      const openDrawer = () => setDrawerOpen(true);
      window.addEventListener('cart:open', openDrawer);
      return () => window.removeEventListener('cart:open', openDrawer);
   }, []);

   const handleAdd = (product) => {
      addToCart(product);
      setDrawerOpen(true);
   };

   return (
      <div className="mx-auto w-full max-w-6xl px-4">
         {loading ? (
            <div className="flex flex-wrap justify-center gap-6">
               {[0, 1, 2].map((i) => (
                  <div key={i} className="h-80 w-full max-w-sm animate-pulse rounded-3xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/5" />
               ))}
            </div>
         ) : products.length === 0 ? (
            <p className="py-16 text-center text-gray-500 dark:text-white/60">
               No hay productos disponibles en tu región.
            </p>
         ) : (
            <div className="flex flex-wrap justify-center gap-6">
               {products.map((p) => (
                  <ProductCard key={p.sku || p.producto_id} product={p} onAdd={handleAdd} />
               ))}
            </div>
         )}

         <CheckoutPanel open={drawerOpen} onClose={() => setDrawerOpen(false)} pais={pais} />
      </div>
   );
};

// ============================================================
// Isla principal — provee el carrito y la tienda
// ============================================================
const ShopIsland = () => (
   <CartProvider>
      <ShopContent />
   </CartProvider>
);

export default ShopIsland;
