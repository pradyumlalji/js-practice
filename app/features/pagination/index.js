"use client";
import React, { useEffect, useState } from "react";

const PaginationWrapper = () => {
    const [productsList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    let limit = 10;
    let skip = (currentPage - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
            }

            if (event.key === "ArrowRight") {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [totalPages]);

    const fetchProduct = async () => {
        const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        setLoading(true);
        setError("");
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Unable to Fetch Products");
            const data = await response.json();
            setProductList(data.products);
            const { total } = data;
            setTotal(total);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something Went Wrong");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProduct();
    }, [currentPage]);

    const prevHandler = () => {
        if (currentPage === 1) return;
        setCurrentPage((prev) => prev - 1);
    };
    const nextHandler = () => {
        if (currentPage !== totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };
    const directHandler = (pagNO) => {
        setCurrentPage(pagNO);
    };

    const StepperButtons = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, "...");
        } else if (currentPage <= totalPages - 4) {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...");
        } else {
            pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold pb-6">Pagination - UI </h2>
            <div>
                {loading ? (
                    <>loading...</>
                ) : Boolean(!error) ? (
                    productsList.map((product) => (
                        <div key={product.id} className={`border flex  `}>
                            <p>{product.title}</p>&nbsp; --- &nbsp;<p>{product.category}</p>
                        </div>
                    ))
                ) : (
                    <p>{error.message}</p>
                )}
            </div>
            <p>current page : {currentPage}</p>
            <div className="flex gap-1 mt-2">
                <button
                    className={"border px-2"}
                    disabled={currentPage === 1 || loading}
                    onClick={prevHandler}
                >
                    Prev
                </button>
                <div className="flex gap-1">
                    {StepperButtons().map((pageNo) =>
                        typeof pageNo === "number" ? (
                            <button
                                className={`border px-2 ${currentPage === pageNo ? "bg-green-300" : ""} `}
                                onClick={() => directHandler(pageNo)}
                                key={pageNo}
                            >
                                {pageNo}
                            </button>
                        ) : (
                            <>{pageNo}</>
                        ),
                    )}
                </div>

                <button
                    className={"border px-2"}
                    disabled={currentPage === total}
                    onClick={nextHandler}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationWrapper;
