"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const dummyData = [
    {
        id: 1,
        imageUrl: "https://picsum.photos/id/1015/800/500",
    },
    {
        id: 2,
        imageUrl: "https://picsum.photos/id/1016/800/500",
    },
    {
        id: 3,
        imageUrl: "https://picsum.photos/id/1018/800/500",
    },
    {
        id: 4,
        imageUrl: "https://picsum.photos/id/1020/800/500",
    },
    {
        id: 5,
        imageUrl: "https://picsum.photos/id/1024/800/500",
    },
    {
        id: 6,
        imageUrl: "https://picsum.photos/id/1025/800/500",
    },
];

const CardCarouselPage = () => {
    const [activeSlide, setActiveSlide] = useState(1);

    // AUTOPLAY
    useEffect(() => {
        const timer = setInterval(() => {
            // setActiveSlide((prev) => (prev === dummyData.length ? 1 : prev + 1));
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    // PREVIOUS
    const handlePrevious = () => {
        setActiveSlide((prev) => (prev === 1 ? dummyData.length : prev - 1));
    };

    // NEXT
    const handleNext = () => {
        setActiveSlide((prev) => (prev === dummyData.length ? 1 : prev + 1));
    };

    return (
        <div className="p-10">
            {/* CAROUSEL CONTAINER */}
            <div className="relative w-full overflow-hidden">
                {/* SLIDE TRACK */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${(activeSlide - 1) * 100}%)`,
                    }}
                >
                    {dummyData.map((carouselData) => (
                        <div key={carouselData.id} className="relative min-w-full h-[500px]">
                            <Image
                                src={carouselData.imageUrl}
                                alt={`Slide ${carouselData.id}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* PREVIOUS BUTTON */}
                <button
                    onClick={handlePrevious}
                    className="absolute z-10 left-5 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded"
                >
                    Prev
                </button>

                {/* NEXT BUTTON */}
                <button
                    onClick={handleNext}
                    className="absolute z-10 right-5 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded"
                >
                    Next
                </button>
            </div>

            {/* DOTS */}
            <div className="flex items-center justify-center w-full mt-5 gap-3">
                {dummyData.map((data) => (
                    <button
                        key={data.id}
                        onClick={() => setActiveSlide(data.id)}
                        className={`w-3 h-3 rounded-full ${
                            activeSlide === data.id ? "bg-gray-800" : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardCarouselPage;
