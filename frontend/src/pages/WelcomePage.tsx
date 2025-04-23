import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";

function WelcomePage() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Delay showing the button after the Welcome component is displayed
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000); // 2-second delay before showing the button
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen  flex-col ">
      <div className="text-5xl md:text-7xl font-serif">
        <Welcome text="Welcome to Blogify " />
      </div>

      {/* Only show the Link button after the delay with an animated transition */}
      <div
        className={`mt-6 font-serif text-center transition-all duration-1000 ease-in-out transform ${
          showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="py-4">"Your thoughts, your words, your space."</div>
        <Link
          className="group relative inline-flex items-center justify-center overflow-hidden border border-black shadow px-16 py-3 font-medium transition duration-300 ease-out hover:border hover:border-double text-md"
          to="/signin"
        >
          <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-black text-white duration-500 group-hover:translate-x-0">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="ease absolute flex h-full w-full transform items-center justify-center transition-all duration-500 group-hover:translate-x-full border border-white">
            Get Started Quickly
          </span>
          <span className="invisible relative">Button Text</span>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
