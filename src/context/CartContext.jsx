import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'cart';
const CartContext = createContext(null);

const parsePrice = (raw) => Number.parseFloat(String(raw ?? '0').replace(',', '')) || 0;

// Notifica a otras islas (p.ej. el badge del header) que el carrito cambió.
const emitCartUpdated = (cart) => {
   if (typeof window === 'undefined') return;
   try {
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
   } catch (e) {
      /* noop */
   }
};

export const CartProvider = ({ children }) => {
   const [cart, setCart] = useState([]);
   const [hydrated, setHydrated] = useState(false);

   // Cargar carrito de localStorage al montar
   useEffect(() => {
      try {
         const stored = localStorage.getItem(STORAGE_KEY);
         if (stored) setCart(JSON.parse(stored));
      } catch (e) {
         console.warn('[Cart] error cargando carrito:', e?.message);
      }
      setHydrated(true);
   }, []);

   // Persistir en cada cambio (después de la hidratación inicial)
   useEffect(() => {
      if (!hydrated) return;
      try {
         localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
         console.warn('[Cart] error guardando carrito:', e?.message);
      }
      emitCartUpdated(cart);
   }, [cart, hydrated]);

   // Agrega un producto (o incrementa si ya existe). Match por producto_id.
   const addToCart = useCallback((product) => {
      setCart((prev) => {
         const existing = prev.find((p) => p.producto_id === product.producto_id);
         if (existing) {
            return prev.map((p) =>
               p.producto_id === product.producto_id
                  ? { ...p, quantity: p.quantity + 1, total: (p.quantity + 1) * parsePrice(p.precio) }
                  : p,
            );
         }
         return [
            ...prev,
            {
               producto_id: product.producto_id,
               sku: product.sku,
               nombre: product.nombre,
               descripcion: product.descripcion,
               precio: String(product.precio),
               precio_mx: product.precio_mx,
               moneda: product.moneda,
               simbolo: product.simbolo,
               quantity: 1,
               total: parsePrice(product.precio),
            },
         ];
      });
   }, []);

   const decreaseQuantity = useCallback((producto_id) => {
      setCart((prev) =>
         prev
            .map((p) =>
               p.producto_id === producto_id
                  ? {
                       ...p,
                       quantity: Math.max(0, (p.quantity ?? 1) - 1),
                       total: Math.max(0, (p.quantity ?? 1) - 1) * parsePrice(p.precio),
                    }
                  : p,
            )
            .filter((p) => (p.quantity ?? 0) > 0),
      );
   }, []);

   const removeFromCart = useCallback((producto_id) => {
      setCart((prev) => prev.filter((p) => p.producto_id !== producto_id));
   }, []);

   const clearCart = useCallback(() => {
      setCart([]);
      try {
         localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
         /* noop */
      }
   }, []);

   // Actualiza precios/moneda del carrito cuando cambia el país (match por producto_id)
   const updateCartPrices = useCallback((prices) => {
      if (!prices || prices.length === 0) return;
      setCart((prev) => {
         if (prev.length === 0) return prev;
         return prev.map((item) => {
            const match = prices.find((p) => p.producto_id === item.producto_id);
            if (!match) return item;
            const newPrecio = match.precio ?? item.precio;
            return {
               ...item,
               precio: String(newPrecio),
               precio_mx: match.precio_mx ?? item.precio_mx,
               moneda: match.moneda || item.moneda,
               simbolo: match.simbolo || item.simbolo,
               total: item.quantity * parsePrice(newPrecio),
            };
         });
      });
   }, []);

   const count = useMemo(() => cart.reduce((acc, it) => acc + (it.quantity ?? 0), 0), [cart]);
   const total = useMemo(() => cart.reduce((acc, it) => acc + parsePrice(it.precio) * (it.quantity ?? 0), 0), [cart]);

   const value = {
      cart,
      count,
      total,
      addToCart,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      updateCartPrices,
   };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
   const ctx = useContext(CartContext);
   if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
   return ctx;
};
