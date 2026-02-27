// Cart Page - displays all cart items with total and empty state
"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import Link from "next/link";

const Cart = () => {
    const { cartItems, totalPrice, cartCount } = useCart();

    return (
        <main className="container mx-auto px-4 py-8 lg:px-8">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Your Cart
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
                {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>

            {cartItems.length > 0 ? (
                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    {/* Cart items list */}
                    <div className="lg:col-span-2">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Order summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg border border-border bg-card p-6">
                            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider">
                                Order Summary
                            </h2>
                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span className="font-medium">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Shipping
                                    </span>
                                    <span className="font-medium text-success">
                                        Free
                                    </span>
                                </div>
                                <div className="border-t border-border pt-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">
                                            Total
                                        </span>
                                        <span className="text-lg font-bold">
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="mt-6 w-full rounded-md bg-foreground py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
                                Checkout
                            </button>
                            <Link
                                href="/"
                                className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                /* Empty cart state */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-secondary p-4">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="mt-4 text-lg font-medium">
                        Your cart is empty
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Start adding some items to your cart.
                    </p>
                    <Link
                        href="/"
                        className="mt-6 rounded-md bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                    >
                        Browse Products
                    </Link>
                </div>
            )}
        </main>
    );
};

export default Cart;
