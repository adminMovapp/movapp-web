import { useEffect, useMemo, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { createStripeIntent } from '@api/api';

// Instancia única de Stripe (fuera del componente)
const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY);

const isDarkTheme = () =>
   typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

const buildAppearance = () => ({
   theme: isDarkTheme() ? 'night' : 'stripe',
   variables: {
      colorPrimary: '#8149E2',
      borderRadius: '10px',
   },
});

/**
 * Formulario interno: renderiza el Payment Element (con clientSecret ya creado)
 * y confirma el pago. El clientSecret se crea UNA sola vez en el componente padre.
 */
const CheckoutForm = ({ onCancel }) => {
   const stripe = useStripe();
   const elements = useElements();

   const [ready, setReady] = useState(false);
   const [submitting, setSubmitting] = useState(false);
   const [message, setMessage] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setSubmitting(true);
      setMessage('');

      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${window.location.origin}/success`,
         },
      });

      // Solo se llega aquí si hay error inmediato; en éxito Stripe redirige.
      if (error) {
         setMessage(error.message || 'Ocurrió un error al procesar el pago.');
         setSubmitting(false);
      }
   };

   return (
      <form onSubmit={handleSubmit} className="grid gap-4">
         {!ready && (
            <p className="py-4 text-center text-sm text-gray-500 dark:text-white/70">Cargando formulario de pago…</p>
         )}

         <PaymentElement
            onReady={() => setReady(true)}
            onLoadError={(e) => setMessage(e?.error?.message || 'No se pudo cargar el formulario de pago.')}
         />

         {message && <p className="text-center text-sm text-red-500">{message}</p>}

         {/* El botón siempre se muestra; se deshabilita hasta que Stripe/Element estén listos */}
         <button
            type="submit"
            disabled={!stripe || !ready || submitting}
            className="mt-1 w-full rounded-lg bg-text_banner py-3 font-bold text-white shadow-lg shadow-text_banner/20 transition hover:bg-text_banner/80 disabled:cursor-not-allowed disabled:opacity-60"
         >
            {submitting ? 'Procesando…' : !ready ? 'Cargando…' : 'Pagar ahora'}
         </button>

         {onCancel && (
            <button
               type="button"
               onClick={onCancel}
               disabled={submitting}
               className="w-full text-sm text-gray-500 transition hover:text-gray-900 dark:text-white/60 dark:hover:text-white"
            >
               Volver
            </button>
         )}
      </form>
   );
};

/**
 * Componente principal del checkout Stripe.
 * Crea el PaymentIntent UNA sola vez (al montar el paso de pago) y muestra el
 * Payment Element con ese clientSecret. Al montar solo una vez, no se generan
 * órdenes duplicadas mientras el usuario permanece en el paso de pago.
 *
 * Props:
 *  - buildPayload:         () => payload para /payments/web/stripe/create-intent
 *  - existingClientSecret: clientSecret ya creado (para reutilizar y no duplicar orden)
 *  - onIntentCreated:      callback(datos) al crear el intent (cachear clientSecret + tracking)
 *  - onCancel:             callback para volver
 */
const StripeCheckout = ({ buildPayload, existingClientSecret = '', onIntentCreated, onCancel }) => {
   const [clientSecret, setClientSecret] = useState(existingClientSecret);
   const [error, setError] = useState('');
   const startedRef = useRef(!!existingClientSecret);

   useEffect(() => {
      if (startedRef.current) return; // crear el intent solo una vez
      startedRef.current = true;

      let cancelled = false;
      (async () => {
         try {
            const res = await createStripeIntent(buildPayload());
            if (cancelled) return;
            if (res?.clientSecret) {
               setClientSecret(res.clientSecret);
               onIntentCreated?.({
                  clientSecret: res.clientSecret,
                  intentId: res.intentId,
                  orderId: res.orderId,
                  orderNumber: res.orderNumber,
               });
            } else {
               setError('No se pudo iniciar el pago. Intenta de nuevo.');
            }
         } catch (e) {
            if (!cancelled) setError('No se pudo iniciar el pago. Intenta de nuevo.');
         }
      })();

      return () => {
         cancelled = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if (error) {
      return (
         <div className="py-4 text-center">
            <p className="mb-3 text-sm text-red-500">{error}</p>
            {onCancel && (
               <button
                  onClick={onCancel}
                  className="text-sm text-gray-500 underline transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
               >
                  Volver
               </button>
            )}
         </div>
      );
   }

   // Opciones memoizadas: una identidad estable evita que Elements se reinicialice
   // en cada render (causa común de que el PaymentElement no termine de montar).
   const elementsOptions = useMemo(
      () => (clientSecret ? { clientSecret, appearance: buildAppearance() } : null),
      [clientSecret],
   );

   if (!clientSecret) {
      return <p className="py-6 text-center text-sm text-gray-500 dark:text-white/70">Preparando pago seguro…</p>;
   }

   return (
      <Elements stripe={stripePromise} options={elementsOptions}>
         <CheckoutForm onCancel={onCancel} />
      </Elements>
   );
};

export default StripeCheckout;
