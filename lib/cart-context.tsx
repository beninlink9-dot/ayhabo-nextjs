"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/lib/products";

const CART_STORAGE_KEY = "ayhabo_cart";

export type CartItem = {
  product: Product;
  variant: string;
  quantity: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (product: Product, variant: string, quantity: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is CartItem => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const candidate = item as Partial<CartItem>;

      return (
        typeof candidate.variant === "string" &&
        typeof candidate.quantity === "number" &&
        Number.isInteger(candidate.quantity) &&
        candidate.quantity > 0 &&
        !!candidate.product &&
        typeof candidate.product === "object" &&
        typeof candidate.product.id === "string" &&
        typeof candidate.product.name === "string" &&
        typeof candidate.product.price === "number"
      );
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(readStoredCart());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // localStorage may be unavailable or full; the in-memory cart still works.
    }
  }, [cartItems]);

  const addToCart = useCallback(
    (product: Product, variant: string, quantity: number) => {
      const safeQuantity = Math.max(1, Math.floor(quantity));

      setCartItems((currentItems) => {
        const existingIndex = currentItems.findIndex(
          (item) =>
            item.product.id === product.id && item.variant === variant,
        );

        if (existingIndex === -1) {
          return [
            ...currentItems,
            { product, variant, quantity: safeQuantity },
          ];
        }

        return currentItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item,
        );
      });
    },
    [],
  );

  const removeFromCart = useCallback((index: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index),
    );
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    const safeQuantity = Math.floor(quantity);

    setCartItems((currentItems) => {
      if (safeQuantity <= 0) {
        return currentItems.filter((_, itemIndex) => itemIndex !== index);
      }

      return currentItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: safeQuantity } : item,
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
