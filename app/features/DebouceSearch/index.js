"use client";
import { useState } from "react";

const DebouceSearch = () => {
    const [query, setQuery] = useState("");
    const [apiData, setApiData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState([]);

    const debouceHandler = (handler, delay) => {
        let timerId;
        return function (...args) {
            clearInterval(timerId);
            timerId = setTimeout(() => {
                handler(...args);
            }, delay);
        };
    };

    const throttleHandler = (handler, delay) => {
        let lastCall = 0;
        return function (...args) {
            let now = Date.now();
            if (now - lastCall < delay) return;

            lastCall = now;
            return handler(...args);
        };
    };

    const postDeboucehandler = async (searchQuery) => {
        setApiData(searchQuery);
        setError("");
        try {
            setLoading(true);
            let url =
                searchQuery === ""
                    ? "https://jsonplaceholder.typicode.com/users?name_like"
                    : `https://jsonplaceholder.typicode.com/users?name_like=${searchQuery}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            setError("something went wrong", error);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const debouceSearch = debouceHandler(postDeboucehandler, 1000);

    const OnChangeHandler = (e) => {
        setQuery(e.target.value);
        debouceSearch(e.target.value);
    };

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold pb-6">Debouce with API Search</h2>
            <label htmlFor="search">Search Query</label>
            <div className="mt-2">
                <input
                    className="border px-2 py-1"
                    value={query}
                    placeholder="Search"
                    name="query"
                    type="text"
                    onChange={OnChangeHandler}
                    autoComplete="off"
                />
                <button
                    disabled={loading}
                    className="ml-4 border px-4 py-1 bg-green-200"
                    type="submit"
                >
                    {loading ? "loading..." : "Submit"}
                </button>
            </div>
            {loading && <p>Loading...</p>} {/* Error */} {error && <p>{error}</p>}{" "}
            {apiData && <p>Searching for: {apiData}</p>} {/* Results */}{" "}
            <div className="mt-4">
                {" "}
                {userData.map((user) => (
                    <div key={user.id} className="border grid grid-cols-3 p-3 mb-2">
                        <span>
                            <strong>Name:</strong> {user.name}
                        </span>
                        <span>
                            <strong>Email:</strong> {user.email}
                        </span>
                        <span>
                            <strong>Username:</strong> {user.username}
                        </span>
                    </div>
                ))}{" "}
                {query && !loading && !error && userData.length === 0 && <p>No user found</p>}
            </div>
        </div>
    );
};

export default DebouceSearch;
