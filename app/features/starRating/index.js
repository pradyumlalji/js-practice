"use client";

import React, { useState } from "react";

const StarRatingWrapper = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const displayRating = hoverRating || rating;

    const handleMouseMove = (event, star) => {
        const rect = event.currentTarget.getBoundingClientRect();
        console.log(rect);
        const mouseX = event.clientX - rect.left;

        if (mouseX < rect.width / 2) {
            setHoverRating(star - 0.5);
        } else {
            setHoverRating(star);
        }
    };

    const handleClick = () => {
        if (hoverRating === rating) {
            setRating(0);
        } else {
            setRating(hoverRating);
        }
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case "ArrowRight":
            case "ArrowUp":
                event.preventDefault();

                setRating((prev) => Math.min(prev + 0.5, 5));
                break;

            case "ArrowLeft":
            case "ArrowDown":
                event.preventDefault();

                setRating((prev) => Math.max(prev - 0.5, 0));
                break;

            case "Home":
                event.preventDefault();

                setRating(0);
                break;

            case "End":
                event.preventDefault();

                setRating(5);
                break;
        }
    };

    return (
        <div className="p-10">
            <div
                className="flex gap-2 outline-none"
                tabIndex={0}
                role="slider"
                aria-label="Star rating"
                aria-valuemin={0}
                aria-valuemax={5}
                aria-valuenow={rating}
                onKeyDown={handleKeyDown}
                onMouseLeave={() => setHoverRating(0)}
            >
                {[1, 2, 3, 4, 5].map((star) => {
                    const isFull = displayRating >= star;

                    const isHalf = displayRating >= star - 0.5 && displayRating < star;

                    return (
                        <span
                            key={star}
                            className="relative text-4xl cursor-pointer"
                            onMouseMove={(event) => handleMouseMove(event, star)}
                            onClick={handleClick}
                        >
                            {/* Empty star */}
                            <span className="text-gray-300">☆</span>

                            {/* Filled / Half star */}
                            {(isFull || isHalf) && (
                                <span
                                    className="absolute left-0 top-0 overflow-hidden text-amber-300"
                                    style={{
                                        width: isHalf ? "50%" : "100%",
                                    }}
                                >
                                    ★
                                </span>
                            )}
                        </span>
                    );
                })}
            </div>

            <p className="mt-4">Rating: {rating}</p>
        </div>
    );
};

export default StarRatingWrapper;
