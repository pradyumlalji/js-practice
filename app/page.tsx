import Link from "next/link";

export default function Home() {
    return (
        <div className="p-8 flex flex-col">
            <h2 className="text-xl">ComponentsList</h2>
            <Link href={"/debouce-search"}>Debouce - Search</Link>
            <Link href={"/pagination"}>Pagination - UI</Link>
            <Link href={"/star-rating"}>Star - rating - UI</Link>
        </div>
    );
}
