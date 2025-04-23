<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-600 lg:my-8" />
        <span className="block text-sm text-gray-400 sm:text-center dark:text-gray-400">© 2025 <a href="" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>

        import { Avatar } from "./BlogCard";
        import { Link, useNavigate, useLocation } from "react-router-dom";
        import { FiLogOut, FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
        import { useState } from "react";
        
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
                    <div className="flex justify-between px-4 lg:px-8 py-4 shadow-md bg-neutral-800 text-white">
                        <div className="flex items-center gap-4">
                            {/* Back Button (Disabled only if on /blogs) */}
                            <button
                                onClick={() => !isAtBlogsPage && navigate(-1)}
                                disabled={isAtBlogsPage}
                                className={`p-2 text-xl rounded-full transition ${isAtBlogsPage ? "text-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"}`}
                            >
                                <FiArrowLeft />
                            </button>
        
                            {/* Forward Button */}
                            <button
                                onClick={() => navigate(1)}
                                className="p-2 text-xl bg-gray-700 rounded-full hover:bg-gray-600 transition"
                            >
                                <FiArrowRight />
                            </button>
        
                            {/* Blogify Logo */}
                            <Link to={'/blogs'} className="text-3xl font-extrabold tracking-wide cursor-pointer">
                                Blogify
                            </Link>
                        </div>
        
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-neutral-700 text-gray-200 px-4 py-2 rounded-full focus:outline-none w-64"
                            />
                            <button type="submit" className="absolute right-3 top-3 text-gray-400">
                                <FiSearch />
                            </button>
                        </form>
        
                        <div className="inline-flex items-center">
                            <Link to={`/publish`}>
                                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition hover:-translate-y-1">
                                    Create
                                </button>
                            </Link>
        
                            <Avatar size={"big"} name="Harshit" />
        
                            <Link to="/signin" className="ml-6 text-2xl">
                                <FiLogOut />
                            </Link>
                        </div>
        
                    </div>
        
        
                
                    <nav className="border-b border-neutral-700">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            {/* Logo */}
                            <div className="flex items-center space-x-3">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                                <Link to="/blogs" className="text-2xl font-extrabold tracking-wide cursor-pointer text-gray-900 dark:text-white">
                                    Blogify
                                </Link>
                            </div>
        
        
        
                            {/* Navigation Menu (Hidden on md by default, toggles on mobile) */}
                            <div className={`w-full md:flex md:w-auto mt-4 md:mt-0 ${menuOpen ? "block" : "hidden"}`}>
        
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
                                <button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                                    Create
                                </button>
                            </div>
        
                        </div>
                    </nav>
        
                </>
            );
        };
        