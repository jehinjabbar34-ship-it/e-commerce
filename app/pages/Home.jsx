"use client";

// Home Page - Product listing with search and category filter
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import products from "../lib/products";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    // Extract unique categories from products
    const categories = useMemo(
        () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
        [],
    );

    // Filter products based on search query and selected category
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            const matchesCategory =
                activeCategory === "All" || product.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    

    return (
        <main className="container mx-auto px-4 py-8 lg:px-8">
            {/* Hero heading */}
            <div className="mb-10 max-w-xl">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Curated Essentials
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Thoughtfully selected pieces for everyday living.
                </p>
            </div>

            {/* Search and filter bar */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Search input */}
                <div className="relative max-w-xs flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                </div>

                {/* Category filter pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                                activeCategory === cat
                                    ? "bg-foreground text-background"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-lg font-medium">No products found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Try adjusting your search or filter.
                    </p>
                </div>
            )}
        </main>
    );
};

export default HomePage;
