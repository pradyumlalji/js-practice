"use client";
import React, { useState } from "react";
const testData = [
    { id: 1, name: "Aarav Sharma", age: 24 },
    { id: 2, name: "Priya Patel", age: 29 },
    { id: 3, name: "Rahul Mehta", age: 32 },
    { id: 4, name: "Sneha Reddy", age: 27 },
    { id: 5, name: "Arjun Kapoor", age: 35 },
    { id: 6, name: "Ananya Singh", age: 23 },
    { id: 7, name: "Vikram Rao", age: 41 },
    { id: 8, name: "Neha Verma", age: 26 },
    { id: 9, name: "Rohan Gupta", age: 30 },
    { id: 10, name: "Ishita Nair", age: 28 },

    { id: 11, name: "Karan Malhotra", age: 36 },
    { id: 12, name: "Pooja Iyer", age: 25 },
    { id: 13, name: "Aditya Joshi", age: 31 },
    { id: 14, name: "Meera Shah", age: 22 },
    { id: 15, name: "Siddharth Jain", age: 38 },
    { id: 16, name: "Kavya Menon", age: 29 },
    { id: 17, name: "Nikhil Bansal", age: 34 },
    { id: 18, name: "Riya Das", age: 27 },
    { id: 19, name: "Manish Kumar", age: 43 },
    { id: 20, name: "Aditi Mishra", age: 24 },

    { id: 21, name: "Varun Sethi", age: 33 },
    { id: 22, name: "Simran Kaur", age: 26 },
    { id: 23, name: "Yash Agarwal", age: 28 },
    { id: 24, name: "Divya Krishnan", age: 37 },
    { id: 25, name: "Akash Choudhary", age: 40 },
    { id: 26, name: "Nandini Bose", age: 25 },
    { id: 27, name: "Harsh Vardhan", age: 31 },
    { id: 28, name: "Tanya Roy", age: 23 },
    { id: 29, name: "Mohit Arora", age: 39 },
    { id: 30, name: "Shreya Kulkarni", age: 30 },

    { id: 31, name: "Abhishek Pandey", age: 42 },
    { id: 32, name: "Sakshi Gupta", age: 27 },
    { id: 33, name: "Aman Tiwari", age: 29 },
    { id: 34, name: "Ira Desai", age: 34 },
    { id: 35, name: "Rishabh Saxena", age: 36 },
    { id: 36, name: "Muskan Ali", age: 24 },
    { id: 37, name: "Dev Patel", age: 32 },
    { id: 38, name: "Komal Yadav", age: 28 },
    { id: 39, name: "Saurabh Sinha", age: 45 },
    { id: 40, name: "Tanvi Joshi", age: 26 },
];

const tableHead = [
    { id: 1, name: "Id" },
    { id: 2, name: "name" },
    { id: 3, name: "Age" },
];
const DataTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(10);
    const totalData = testData.length;
    const totalPage = Math.ceil(totalData / size);
    const startIndex = Number((currentPage - 1) * Number(size));
    const EndIndex = Number(startIndex + size);
    const [selectedCol, setSelectedCol] = useState("");
    const [isAsc, setIsAsc] = useState(true);
    const nextHandler = () => {
        if (currentPage === totalPage) return;
        setCurrentPage((prev) => prev + 1);
    };

    const prevHandler = () => {
        if (currentPage === 1) return;
        setCurrentPage((prev) => prev - 1);
    };

    //sort
    const handleSort = (col) => {
        if (selectedCol === col) {
            setIsAsc((prev) => !prev);
        } else {
            setSelectedCol(col);
            setIsAsc(true);
        }
    };

    const sortedData = [...testData].sort((a, b) =>
        typeof a[selectedCol] === "string"
            ? isAsc
                ? a[selectedCol].localeCompare(b[selectedCol])
                : b[selectedCol].localeCompare(a[selectedCol])
            : isAsc
              ? a[selectedCol] - b[selectedCol]
              : b[selectedCol] - a[selectedCol],
    );
    const dataToShow = sortedData.slice(startIndex, EndIndex);
    return (
        <div className="p-10">
            <p>Data Table </p>
            <table>
                <thead>
                    <tr>
                        {tableHead.map((tableName) => (
                            <th
                                onClick={() => handleSort(tableName.name.toLowerCase())}
                                className="border w-max px-4 text-left whitespace-nowrap"
                                key={tableName.id}
                            >
                                {tableName.name}{" "}
                                {tableName.name.toLowerCase() === selectedCol && isAsc ? "↑" : "↓"}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataToShow.map((data) => (
                        <tr key={data.id}>
                            <td className="border px-4">{data.id}</td>
                            <td className="border w-full px-4">{data.name}</td>
                            <td className="border px-4">{data.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center pt-4 justify-between">
                <div className="flex items-center gap-4 ">
                    <button onClick={prevHandler} className="border px-3">
                        Prev
                    </button>
                    <p>
                        Page {currentPage} of {totalPage}
                    </p>
                    <button onClick={nextHandler} className="border px-3">
                        Next
                    </button>
                </div>
                <div className="flex gap-2">
                    <p>Size </p>
                    <select
                        className="border px-2 "
                        onChange={(e) => setSize(Number(e.target.value))}
                        name="Size"
                        id=""
                    >
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
