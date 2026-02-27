// CartItem component - renders a single cart item with quantity controls
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    return (
        <div className="flex gap-4 border-b border-border py-5 animate-fade-in">
            {/* Item image */}
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-secondary">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Item details */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="font-sans text-sm font-medium">
                        {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.category}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:bg-secondary"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => increaseQuantity(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:bg-secondary"
                            aria-label="Increase quantity"
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>

                    {/* Price and remove */}
                    <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Remove item"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
