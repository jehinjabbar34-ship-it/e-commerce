"use client";

// Wishlist Context - manages wishlist state across the application
import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";

const WishlistContext = createContext(null);

// Custom hook for consuming wishlist context
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context)
        throw new Error("useWishlist must be used within WishlistProvider");
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    // Toggle item in wishlist (add if not present, remove if present)
    const toggleWishlist = useCallback((product) => {
        setWishlistItems((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                toast.info(`"${product.title}" removed from wishlist`);
                return prev.filter((item) => item.id !== product.id);
            }
            toast.success(`"${product.title}" added to wishlist`);
            return [...prev, product];
        });
    }, []);

    // Check if product is in wishlist
    const isInWishlist = useCallback(
        (productId) => wishlistItems.some((item) => item.id === productId),
        [wishlistItems],
    );

    // Wishlist count
    const wishlistCount = wishlistItems.length;

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                toggleWishlist,
                isInWishlist,
                wishlistCount,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
