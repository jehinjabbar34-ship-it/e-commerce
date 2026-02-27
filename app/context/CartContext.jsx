"use client";

// Cart Context - manages cart state across the application
import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";

const CartContext = createContext(null);

// Custom hook for consuming cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add item to cart or increase quantity if already exists
    const addToCart = useCallback((product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                toast.success(`Increased "${product.title}" quantity`);
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            toast.success(`"${product.title}" added to cart`);
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    // Remove item from cart entirely
    const removeFromCart = useCallback((productId) => {
        setCartItems((prev) => {
            const item = prev.find((i) => i.id === productId);
            if (item) toast.info(`"${item.title}" removed from cart`);
            return prev.filter((item) => item.id !== productId);
        });
    }, []);

    // Increase item quantity
    const increaseQuantity = useCallback((productId) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            ),
        );
    }, []);

    // Decrease item quantity (remove if reaches 0)
    const decreaseQuantity = useCallback((productId) => {
        setCartItems((prev) => {
            const item = prev.find((i) => i.id === productId);
            if (item && item.quantity === 1) {
                toast.info(`"${item.title}" removed from cart`);
                return prev.filter((i) => i.id !== productId);
            }
            return prev.map((i) =>
                i.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
            );
        });
    }, []);

    // Calculate total number of items in cart
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                cartCount,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
