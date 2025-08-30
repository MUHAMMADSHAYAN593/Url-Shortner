import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 bg-purple-700 shadow-md flex justify-between items-center px-4 sm:px-6 md:px-8">
      {/* Logo / Brand */}
      <div className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide cursor-pointer">
        Bit<span className="text-purple-300">Links</span>
      </div>

      {/* Navigation Links (Hidden on Mobile) */}
      <ul className="hidden sm:flex gap-3 sm:gap-5 md:gap-8 items-center text-white text-sm sm:text-base md:text-lg font-medium">
        <Link href="/">
          <li className="cursor-pointer hover:text-purple-300 transition duration-300">
            Home
          </li>
        </Link>
        <Link href="/">
          <li className="cursor-pointer hover:text-purple-300 transition duration-300">
            About
          </li>
        </Link>
        <Link href="/">
          <li className="cursor-pointer hover:text-purple-300 transition duration-300">
            Shorten
          </li>
        </Link>
      </ul>

      {/* Buttons */}
      <div className="flex gap-3 sm:gap-4">
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 md:px-5 py-1.5 rounded-lg font-medium shadow-md transition duration-300 text-xs sm:text-sm md:text-base">
          GitHub
        </button>
        <button className="bg-purple-300 hover:bg-purple-400 text-purple-900 px-3 sm:px-4 md:px-5 py-1.5 rounded-lg font-semibold shadow-md transition duration-300 text-xs sm:text-sm md:text-base">
          Try Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
