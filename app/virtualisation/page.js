"use client";

import React, { useMemo, useState } from "react";

const VirtualizedList = () => {
    // Generate 10,000 items
    const items = useMemo(() => {
        return Array.from({ length: 10000 }, (_, index) => ({
            id: index + 1,
            name: `Item ${index + 1}`,
        }));
    }, []);

    const [scrollTop, setScrollTop] = useState(0);

    // Configuration
    const ROW_HEIGHT = 50;
    const CONTAINER_HEIGHT = 500;
    const OVERSCAN = 5;

    // ----------------------------------------
    // 1. Calculate starting index
    // ----------------------------------------

    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);

    // ----------------------------------------
    // 2. Calculate how many items are visible
    // ----------------------------------------

    const visibleCount = Math.ceil(CONTAINER_HEIGHT / ROW_HEIGHT);

    // ----------------------------------------
    // 3. Calculate ending index
    // ----------------------------------------

    const endIndex = Math.min(items.length, startIndex + visibleCount + OVERSCAN * 2);

    // ----------------------------------------
    // 4. Get only the items we need to render
    // ----------------------------------------

    const visibleItems = items.slice(startIndex, endIndex);

    // ----------------------------------------
    // 5. Calculate where those items
    // should appear vertically
    // ----------------------------------------

    const offsetY = startIndex * ROW_HEIGHT;

    // ----------------------------------------
    // Scroll handler
    // ----------------------------------------

    const handleScroll = (event) => {
        setScrollTop(event.currentTarget.scrollTop);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-2 text-2xl font-bold">Virtualized List</h1>

                <p className="mb-6 text-gray-600">
                    10,000 items, but only visible items are rendered.
                </p>

                {/* Scrollable viewport */}
                <div
                    className="overflow-auto rounded-lg border border-gray-300 bg-white"
                    style={{
                        height: `${CONTAINER_HEIGHT}px`,
                    }}
                    onScroll={handleScroll}
                >
                    {/* 
                        This represents the TOTAL height
                        of all 10,000 items.
                    */}
                    <div
                        style={{
                            height: `${items.length * ROW_HEIGHT}px`,
                            position: "relative",
                        }}
                    >
                        {/* 
                            Only visible items are rendered.
                            We move them down to their
                            correct position.
                        */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                transform: `translateY(${offsetY}px)`,
                            }}
                        >
                            {visibleItems.map((item, index) => {
                                const actualIndex = startIndex + index;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center border-b border-gray-200 px-4"
                                        style={{
                                            height: `${ROW_HEIGHT}px`,
                                        }}
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <span className="font-medium">{item.name}</span>

                                            <span className="text-sm text-gray-400">
                                                Index: {actualIndex}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Debug information */}
                <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
                    <p>
                        <strong>Scroll Top:</strong> {scrollTop}
                    </p>

                    <p>
                        <strong>Start Index:</strong> {startIndex}
                    </p>

                    <p>
                        <strong>End Index:</strong> {endIndex}
                    </p>

                    <p>
                        <strong>Rendered Items:</strong> {visibleItems.length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VirtualizedList;
