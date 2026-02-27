// Wishlist Page - displays all wishlisted items with empty state
"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import WishlistItem from "../components/WishlistItem";
import Link from "next/link";

const Wishlist = () => {
    const { wishlistItems, wishlistCount } = useWishlist();

    return (
        <main className="container mx-auto px-4 py-8 lg:px-8">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Your Wishlist
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
                {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved
            </p>

            {wishlistItems.length > 0 ? (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {wishlistItems.map((product) => (
                        <WishlistItem key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                /* Empty wishlist state */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-secondary p-4">
                        <Heart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="mt-4 text-lg font-medium">
                        Your wishlist is empty
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Save items you love for later.
                    </p>
                    <Link
                        href="/"
                        className="mt-6 rounded-md bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                    >
                        Discover Products
                    </Link>
                </div>
            )}
        </main>
    );
};

export default Wishlist;
