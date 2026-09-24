"use client";

import React, { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 20;
const TOTAL_ITEMS = 100;

const fetchProducts = (page) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * PAGE_SIZE;
            const end = Math.min(start + PAGE_SIZE, TOTAL_ITEMS);

            const products = [];

            for (let i = start; i < end; i++) {
                products.push({
                    id: i + 1,
                    name: `Product ${i + 1}`,
                    price: Math.floor(Math.random() * 9000) + 1000,
                });
            }

            resolve({
                products,
                hasMore: end < TOTAL_ITEMS,
            });
        }, 800);
    });
};

const InfiniteScrollPage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);

    // Fetch data whenever page changes
    useEffect(() => {
        const loadProducts = async () => {
            if (loading || !hasMore) return;

            setLoading(true);
            try {
                const data = await fetchProducts(page);
                setProducts((prev) => [...prev, ...data.products]);
                setHasMore(data.hasMore);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [page]);

    // Detect when bottom element becomes visible
    useEffect(() => {
        const loader = loaderRef.current;

        if (!loader) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry.isIntersecting && !loading && hasMore) {
                    setPage((prev) => prev + 1);
                }
            },
            {
                rootMargin: "200px",
            },
        );

        observer.observe(loader);

        return () => {
            observer.disconnect();
        };
    }, [loading, hasMore]);

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Infinite Scroll</h1>

            <div className="space-y-3">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 flex justify-between">
                        <div>
                            <h2 className="font-semibold">{product.name}</h2>

                            <p className="text-gray-500">ID: {product.id}</p>
                        </div>

                        <p className="font-bold">₹{product.price}</p>
                    </div>
                ))}
            </div>

            <div ref={loaderRef} className="h-10 flex items-center justify-center">
                {loading && <p>Loading...</p>}

                {!hasMore && <p>No more products</p>}
            </div>
        </div>
    );
};

export default InfiniteScrollPage;
