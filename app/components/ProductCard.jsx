// ProductCard component - displays product info with add-to-cart and wishlist actions
import { Heart, ShoppingBag, Star } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Link from "next/link";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const wishlisted = isInWishlist(product.id);

    return (
        <div className="group animate-fade-in">
            {/* Product image with overlay actions */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                <Link href={`/product/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </Link>

                {/* Hover action buttons */}
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <button
                        onClick={() => addToCart(product)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-foreground py-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
                    >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                    </button>
                    <button
                        onClick={() => toggleWishlist(product)}
                        className={`flex items-center justify-center rounded-md p-2.5 transition-colors ${
                            wishlisted
                                ? "bg-primary text-primary-foreground"
                                : "bg-background/90 text-foreground hover:bg-background"
                        }`}
                        aria-label="Toggle wishlist"
                    >
                        <Heart
                            className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`}
                        />
                    </button>
                </div>
            </div>

            {/* Product details */}
            <div className="mt-3 space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {product.category}
                </p>
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-sans text-sm font-medium leading-snug transition-colors hover:text-primary">
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                        ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        {product.rating}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
