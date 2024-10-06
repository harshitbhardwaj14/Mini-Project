import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";

function WelcomePage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 flex-col">
      <div className="text-5xl md:text-7xl">
        <Welcome text="Welcome to Blogify!" />
      </div>
      <div className="mt-24">
        <Link
          to="/signin"
          className="tracking-wide border border-black hover:ring-1 hover:ring-inset hover:ring-black px-8 py-4 hover:transition"
        >
          Get Started Quickly
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
