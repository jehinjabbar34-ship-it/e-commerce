// WishlistItem component - renders a single wishlist item with actions
import { ShoppingBag, X, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Link from "next/link";

const WishlistItem = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist } = useWishlist();

    // Add to cart and remove from wishlist
    const handleMoveToCart = () => {
        addToCart(product);
        toggleWishlist(product);
    };

    return (
        <div className="group relative animate-fade-in">
            {/* Remove button */}
            <button
                onClick={() => toggleWishlist(product)}
                className="absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1.5 opacity-0 transition-all group-hover:opacity-100 hover:bg-background"
                aria-label="Remove from wishlist"
            >
                <X className="h-4 w-4" />
            </button>

            {/* Product image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
                <Link href={`/product/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            </div>

            {/* Product info */}
            <div className="mt-3 space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {product.category}
                </p>
                <h3 className="font-sans text-sm font-medium">
                    {product.title}
                </h3>
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

            {/* Move to cart button */}
            <button
                onClick={handleMoveToCart}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-border py-2 text-xs font-medium transition-colors hover:bg-secondary"
            >
                <ShoppingBag className="h-3.5 w-3.5" />
                Move to Cart
            </button>
        </div>
    );
};

export default WishlistItem;
