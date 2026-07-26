'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProductItem {
  id: string | number;
  title: string;
  price: number | string;
  category?: string;
  image?: string;
  svg_type?: string;
  tag?: string;
  description?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  showShippingForm: boolean;
  setShowShippingForm: (show: boolean) => void;
  addedItems: (string | number)[];
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, delta: number) => void;
  clearCart: () => void;
  buyNow: (product: ProductItem, quantity?: number) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [addedItems, setAddedItems] = useState<(string | number)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ayurmor_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('ayurmor_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [cart, isLoaded]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product: ProductItem, quantity: number = 1) => {
    const numericPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    const normalizedProduct = { ...product, price: numericPrice || 299 };

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => String(item.product.id) === String(normalizedProduct.id)
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product: normalizedProduct, quantity }];
    });

    // Trigger visual feedback state
    if (!addedItems.includes(product.id)) {
      setAddedItems(prev => [...prev, product.id]);
      setTimeout(() => {
        setAddedItems(prev => prev.filter(id => id !== product.id));
      }, 2000);
    }

    setCartOpen(true);
  };

  const removeFromCart = (productId: string | number) => {
    setCart(prev => prev.filter(item => String(item.product.id) !== String(productId)));
  };

  const updateQuantity = (productId: string | number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (String(item.product.id) === String(productId)) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const buyNow = (product: ProductItem, quantity: number = 1) => {
    addToCart(product, quantity);
    setShowShippingForm(true);
    setCartOpen(true);
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartOpen,
        setCartOpen,
        showShippingForm,
        setShowShippingForm,
        addedItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        buyNow,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
