import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { CartProvider, useCart } from '@context/CartContext.jsx';
import useConfig from '@hooks/useConfig.jsx';
import StripeCheckout from '@components/ui/StripeCheckout.jsx';
import { useMetaPixel } from '@hooks/useMetaPixel.jsx';
import { pushToDataLayer, mapCartItemToGA4 } from '@utils/dataLayer.js';
import { ERROR_TYPES, CHECKOUT_STEPS } from '@constants/tracking.ts';

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
            <span className="block text-[11px] uppercase tracking-widest text-gray-500 dark:text-white/50">Precio</span>
            <span className="text-2xl font-extrabold text-text_banner">
               {product.simbolo} {fmt(product.precio)}
               <span className="ml-1 text-sm font-medium text-gray-500 dark:text-white/50">{product.moneda}</span>
            </span>
         </div>

         <button
            onClick={() => onAdd(product)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-text_banner py-3 font-bold text-white shadow-lg shadow-text_banner/25 transition hover:bg-text_banner/80"
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

const CheckoutPanel = ({ open, openedByAdd, onOpenedByAddConsumed, onClose, pais }) => {
   const { cart, count, total, addToCart, decreaseQuantity, removeFromCart } = useCart();
   const { trackInitiateCheckout } = useMetaPixel();

   const [isClosing, setIsClosing] = useState(false);
   const [step, setStep] = useState('cart'); // 'cart' | 'form' | 'pay'
   const [form, setForm] = useState(emptyForm);
   const [errors, setErrors] = useState({});
   // clientSecret cacheado: se crea una vez por sesión de checkout y se reutiliza
   // aunque el usuario vaya y vuelva entre datos/pago (evita órdenes duplicadas).
   const [clientSecret, setClientSecret] = useState('');
   // Anti-duplicado de begin_checkout: una sola vez por sesión de checkout,
   // aunque el usuario vaya y vuelva entre carrito y datos. Se resetea al
   // cerrar el drawer y cuando cambia el total (misma vida que clientSecret).
   const beginCheckoutTrackedRef = useRef(false);
   // view_cart NO se emite en la apertura automática que sigue a "Agregar al
   // carrito" (plan de eventos, fase 1: en ese clic queda solo add_to_cart;
   // view_cart es abrir el carrito a propósito). Este ref recuerda si esa
   // primera vista ya se "consumió" en la sesión actual del drawer.
   const autoOpenViewSkippedRef = useRef(false);
   // Anti-duplicado de add_payment_info, keyed por clientSecret: vive acá y
   // no en el formulario de Stripe porque ese componente se desmonta al
   // "Volver" a datos y se vuelve a montar al regresar a pago (un ref suyo
   // arrancaría de cero y reemitiría el evento).
   const paymentInfoTrackedFor = useRef('');

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
         beginCheckoutTrackedRef.current = false;
         autoOpenViewSkippedRef.current = false;
         onClose();
      }, 300);
   };

   // Si cambia el contenido/monto del carrito, invalidar el intent cacheado
   // para que se cree uno nuevo con el monto correcto al volver a pagar.
   useEffect(() => {
      setClientSecret('');
      beginCheckoutTrackedRef.current = false;
      if (step === 'pay') setStep('cart');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [total]);

   // view_cart: solo cuando el paso "carrito" se vuelve visible (no en cada
   // cambio de cantidad dentro del mismo paso, para no duplicar el evento).
   // !isClosing: handleClose vuelve el paso a "cart" mientras el drawer aún
   // se está cerrando -- eso no es "ver el carrito".
   useEffect(() => {
      if (open && !isClosing && step === 'cart' && cart.length > 0) {
         if (openedByAdd && !autoOpenViewSkippedRef.current) {
            autoOpenViewSkippedRef.current = true;
            // Se consume de inmediato en el padre (ShopContent) -- así
            // "opened by add" nunca queda pegado en true más allá de ESTA
            // apertura puntual (QA de tracking, sept. 2026: la primera
            // apertura real del carrito de la sesión no debe perderse).
            onOpenedByAddConsumed?.();
            return;
         }
         pushToDataLayer('view_cart', {
            currency: moneda,
            value: total,
            items: cart.map((item) => mapCartItemToGA4(item)),
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open, step]);

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
      // GA4 y Meta se deduplican con el mismo ref para que los dos embudos
      // cuenten lo mismo (un inicio de checkout por sesión de checkout).
      if (!beginCheckoutTrackedRef.current) {
         beginCheckoutTrackedRef.current = true;
         pushToDataLayer('begin_checkout', {
            currency: moneda,
            value: total,
            items: cart.map((item) => mapCartItemToGA4(item)),
         });
         trackInitiateCheckout(total, moneda, cart.map((c) => String(c.producto_id)), {
            // productName es obligatorio desde que content_ids pasó a llevar
            // IDs: sin él, el hook cae en contentIds[0] y Meta recibe "1"
            // como nombre del producto.
            productName: cart[0]?.nombre,
            quantity: count,
            country: pais?.codigo_pais,
         });
      }
      setStep('form');
   };

   // Lo llama el Payment Element cada vez que queda "completo"; se emite
   // una sola vez por PaymentIntent (ver paymentInfoTrackedFor arriba).
   const onPaymentInfoComplete = () => {
      if (!clientSecret || paymentInfoTrackedFor.current === clientSecret) return;
      paymentInfoTrackedFor.current = clientSecret;
      pushToDataLayer('add_payment_info', {
         currency: moneda,
         value: total,
         payment_type: 'card',
         items: cart.map((item) => mapCartItemToGA4(item)),
      });
   };

   const submitForm = (e) => {
      e.preventDefault();
      if (validateForm()) {
         setStep('pay');
         return;
      }
      // checkout_error también para la validación del paso de datos (plan de
      // eventos, fase 1), no solo para errores de pago de Stripe.
      // error_message lleva nombres de campo, nunca valores.
      const invalidFields = Object.entries(validations)
         .filter(([field, { regex }]) => !form[field].trim() || !regex.test(form[field].trim()))
         .map(([field]) => field);
      pushToDataLayer('checkout_error', {
         checkout_step: CHECKOUT_STEPS.checkout,
         error_type: ERROR_TYPES.validationError,
         error_message: invalidFields.join(','),
      });
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

      // El "Purchase" de Meta NO se dispara aquí: en este punto el
      // PaymentIntent apenas existe y el pago todavía no se confirmó, así
      // que un checkout abandonado contaría como compra. Se deja un
      // snapshot y /success lo emite una sola vez por payment_intent
      // (mismo criterio que el purchase de GA4 en success.astro).
      // sessionStorage y no localStorage: sobrevive el redirect same-tab de
      // Stripe (return_url) pero no persiste PII más allá de la pestaña.
      try {
         sessionStorage.setItem(
            'meta_pending_purchase',
            JSON.stringify({
               value: total,
               currency: moneda,
               contentIds: cart.map((c) => String(c.producto_id)),
               email: form.email,
               phone: form.telefono,
               name: `${form.nombre} ${form.apellidos}`,
               postalCode: form.codigoPostal,
               quantity: count,
               country: pais?.codigo_pais,
               paymentMethod: 'stripe',
               customerType: 'new_customer',
            }),
         );
      } catch (e) {
         // sessionStorage no disponible: se pierde solo el evento de Meta
      }
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
                                          onClick={() => {
                                             pushToDataLayer('remove_from_cart', {
                                                currency: item.moneda,
                                                value: parseFloat(item.precio) * item.quantity,
                                                items: [mapCartItemToGA4(item)],
                                             });
                                             removeFromCart(item.producto_id);
                                          }}
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
                                             onClick={() => {
                                                pushToDataLayer('remove_from_cart', {
                                                   currency: item.moneda,
                                                   value: parseFloat(item.precio) || 0,
                                                   items: [mapCartItemToGA4(item, 1)],
                                                });
                                                decreaseQuantity(item.producto_id);
                                             }}
                                             className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                                             aria-label="Disminuir"
                                          >
                                             −
                                          </button>
                                          <span className="w-5 text-center font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                                          <button
                                             onClick={() => {
                                                pushToDataLayer('add_to_cart', {
                                                   currency: item.moneda,
                                                   value: parseFloat(item.precio) || 0,
                                                   items: [mapCartItemToGA4(item, 1)],
                                                });
                                                addToCart(item);
                                             }}
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
                        className="mt-1 w-full rounded-full bg-text_banner py-3 font-bold text-white shadow-lg shadow-text_banner/20 transition hover:bg-text_banner/80"
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
                     onPaymentInfoComplete={onPaymentInfoComplete}
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
                     className="w-full rounded-full bg-text_banner py-3 font-bold text-white shadow-lg shadow-text_banner/20 transition hover:bg-text_banner/80"
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
const ShopContent = ({ serverCountry }) => {
   const { loading, prices, pais } = useConfig(serverCountry);
   const { addToCart } = useCart();
   const { trackAddToCart, trackViewContent } = useMetaPixel();
   const [drawerOpen, setDrawerOpen] = useState(false);
   // true cuando el drawer se abrió solo tras "Agregar al carrito" (ver
   // view_cart en CheckoutPanel); false cuando lo abrió el usuario.
   const [openedByAdd, setOpenedByAdd] = useState(false);

   const products = useMemo(() => prices || [], [prices]);

   // view_item_list: una sola vez por set de productos real (no en cada
   // re-render de ShopContent -- useEffect solo refire si cambia `products`).
   useEffect(() => {
      if (products.length === 0) return;
      pushToDataLayer('view_item_list', {
         item_list_id: 'tienda',
         item_list_name: 'Tienda',
         items: products.map((p) => mapCartItemToGA4(p, 1)),
      });
      // view_item: /tienda no tiene ficha de producto separada, así que la
      // página misma hace de "vista de producto" para El Hack (decisión de
      // negocio, QA de tracking sept. 2026) -- es el evento del que dependen
      // las audiencias de remarketing de Google Ads y el ViewContent de
      // Meta. select_item sigue retirado: no aporta con un solo producto.
      products.forEach((p) => {
         const item = mapCartItemToGA4(p, 1);
         pushToDataLayer('view_item', { currency: p.moneda, value: item.price, items: [item] });
         trackViewContent(item.price, p.moneda, [String(p.producto_id)], {
            productName: p.nombre,
            country: pais?.codigo_pais,
         });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [products]);

   // El ícono del header abre el drawer vía evento global
   useEffect(() => {
      const openDrawer = () => {
         setOpenedByAdd(false);
         setDrawerOpen(true);
      };
      window.addEventListener('cart:open', openDrawer);
      return () => window.removeEventListener('cart:open', openDrawer);
   }, []);

   const handleAdd = (product) => {
      // Solo add_to_cart en este clic (plan de eventos GA4, fase 1). Antes se
      // sintetizaban también select_item y view_item, pero el catálogo no
      // tiene listado con selección ni ficha de producto: la tarjeta va
      // directo al carrito, así que esos dos pasos no existen como
      // interacción real y solo ensuciaban el embudo. view_cart tampoco: el
      // drawer se abre solo aquí (openedByAdd), ver CheckoutPanel.
      const item = mapCartItemToGA4(product, 1);
      pushToDataLayer('add_to_cart', { currency: product.moneda, value: item.price, items: [item] });
      trackAddToCart(item.price, product.moneda, [String(product.producto_id)], {
         productName: product.nombre,
         country: pais?.codigo_pais,
         quantity: 1,
      });
      addToCart(product);
      setOpenedByAdd(true);
      setDrawerOpen(true);
   };

   return (
      <div className="mx-auto w-full max-w-6xl px-4">
         {loading ? (
            // CLS (GOLIVE-011, ver skill Rendimiento): antes este esqueleto era
            // un único bloque "h-80" (320px) -- la ProductCard real (imagen
            // h-52 + padding p-6 + título + descripción + precio + botón) mide
            // bastante más que eso, así que al reemplazar el esqueleto por las
            // tarjetas reales (cuando useConfig termina de resolver país +
            // precios) el layout saltaba de golpe -- confirmado como la causa
            // más probable del CLS severo medido en /tienda. Se replica la
            // MISMA estructura/padding que ProductCard (bloque de imagen +
            // líneas de texto + botón) en vez de un solo rectángulo, para que
            // el alto final quede prácticamente igual sin importar el largo
            // real de nombre/descripción de cada producto.
            <div className="flex flex-wrap justify-center gap-6">
               {[0, 1, 2].map((i) => (
                  <div
                     key={i}
                     className="flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-white/10 dark:bg-neutral-950"
                  >
                     <div className="h-52 animate-pulse bg-gray-100 dark:bg-white/5" />
                     <div className="flex flex-1 flex-col p-6">
                        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
                        <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-white/10" />
                        <div className="mt-2 h-4 w-2/3 flex-1 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
                        <div className="mt-5 h-8 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
                        <div className="mt-5 h-12 w-full animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
                     </div>
                  </div>
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

         <CheckoutPanel
            open={drawerOpen}
            openedByAdd={openedByAdd}
            onOpenedByAddConsumed={() => setOpenedByAdd(false)}
            onClose={() => setDrawerOpen(false)}
            pais={pais}
         />
      </div>
   );
};

// ============================================================
// Isla principal — provee el carrito y la tienda
// ============================================================
const ShopIsland = ({ serverCountry }) => (
   <CartProvider>
      <ShopContent serverCountry={serverCountry} />
   </CartProvider>
);

export default ShopIsland;
