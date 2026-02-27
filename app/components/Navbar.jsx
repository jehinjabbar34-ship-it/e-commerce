"use client";

// Navbar component - displays logo, search, and cart/wishlist icons with counts
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="font-display text-xl font-semibold tracking-tight"
                >
                    Curate<span className="text-primary">.</span>
                </Link>

                {/* Desktop navigation links */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Shop
                    </Link>
                    <Link
                        href="/wishlist"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Wishlist
                    </Link>
                    <Link
                        href="/cart"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Cart
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3">
                    {/* Wishlist icon with count badge */}
                    <Link
                        href="/wishlist"
                        className="relative rounded-full p-2 transition-colors hover:bg-secondary"
                        aria-label="Wishlist"
                    >
                        <Heart className="h-5 w-5" />
                        {wishlistCount > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart icon with count badge */}
                    <Link
                        href="/cart"
                        className="relative rounded-full p-2 transition-colors hover:bg-secondary"
                        aria-label="Cart"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        className="rounded-full p-2 transition-colors hover:bg-secondary md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Menu"
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="border-t border-border bg-background px-4 py-4 md:hidden animate-fade-in">
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            onClick={() => setMobileOpen(false)}
                            className="text-sm font-medium py-2"
                        >
                            Shop
                        </Link>
                        <Link
                            href="/wishlist"
                            onClick={() => setMobileOpen(false)}
                            className="text-sm font-medium py-2"
                        >
                            Wishlist
                        </Link>
                        <Link
                            href="/cart"
                            onClick={() => setMobileOpen(false)}
                            className="text-sm font-medium py-2"
                        >
                            Cart
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
