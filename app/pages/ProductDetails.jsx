// Product Details Page - shows full product info with add-to-cart and wishlist
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import products from "../lib/products";

const ProductDetails = () => {
    const { id } = useParams();

    const product = products.find((p) => p.id === Number(id));
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    // Product not found state
    if (!product) {
        return (
            <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
                <p className="text-lg font-medium">Product not found</p>
                <Link
                    href="/"
                    className="mt-3 text-sm text-primary hover:underline"
                >
                    ← Back to shop
                </Link>
            </div>
        );
    }

    const wishlisted = isInWishlist(product.id);

    return (
        <main className="container mx-auto px-4 py-8 lg:px-8">
            {/* Back link */}
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to shop
            </Link>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                {/* Product image */}
                <div className="aspect-square overflow-hidden rounded-xl bg-secondary">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Product information */}
                <div className="flex flex-col justify-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {product.category}
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {product.title}
                    </h1>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">
                            {product.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            / 5.0
                        </span>
                    </div>

                    {/* Price */}
                    <p className="mt-4 text-2xl font-bold">
                        ${product.price.toFixed(2)}
                    </p>

                    {/* Description */}
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                        {product.description}
                    </p>

                    {/* Action buttons */}
                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-foreground py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Add to Cart
                        </button>
                        <button
                            onClick={() => toggleWishlist(product)}
                            className={`flex items-center justify-center rounded-md border px-4 transition-colors ${
                                wishlisted
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border hover:bg-secondary"
                            }`}
                            aria-label="Toggle wishlist"
                        >
                            <Heart
                                className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;
