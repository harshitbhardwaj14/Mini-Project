import { Avatar } from "./BlogCard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut, FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import { useState } from "react";
import GenericPopover from "./GenericPopover";
import Button from "./Button";

export const Appbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState("");

    // Disable back button only on /blogs
    const isAtBlogsPage = location.pathname === "/blogs";

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/blogs?search=${search}`);
        } else {
            navigate("/blogs");
        }
    };

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className="border-b border-neutral-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <Link to="/blogs" className="text-2xl font-extrabold tracking-wide cursor-pointer text-gray-900 dark:text-white">
                            Blogify
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6 font-bold tracking-wider">
                        <button>Home</button>
                        <button>About</button>
                        <button>Log out</button>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                        >
                            <FiSearch className="w-5 h-5" />
                        </button>

                        {/* Search Bar (Hidden on sm, md, visible on lg) */}
                        <form onSubmit={handleSearch} className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border border-neutral-700 bg-[#171717] text-gray-200 px-4 py-2 rounded-lg focus:outline-none w-64"
                            />
                            <button type="submit" className="absolute right-3 top-3 text-gray-400">
                                <FiSearch />
                            </button>
                        </form>

                        {/* Create Button */}
                        <GenericPopover
                            buttonText="Create"
                            popoverTitle="Craft a new blog"
                            popoverContent="Click to create a new blog post!"
                            onClick={() => navigate("/publish")}
                        />

                        <Avatar size={"big"} name="Dollar" />
                    </div>
                </div>
            </nav>

        </>
    );
};
