import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";

export const Appbar = () => {
    return <div className="border-b flex justify-between px-8 py-4 shadow-md">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-bold text-3xl tracking-wide">
                Blogify
        </Link>
        <div className="inline-flex">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 hover:-translate-y-1 transition">New</button>
            </Link>

            <Avatar size={"big"} name="Harshit" />

            <Link to="/signin" className="ml-6 mt-2.5 text-2xl"><FiLogOut/></Link>
        </div>
    </div>
}