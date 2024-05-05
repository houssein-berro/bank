import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import Button from "react-bootstrap/Button";
import 'react-bootstrap'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false); // Close menu if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Dependency array includes isOpen to re-run effect when it changes

  return (
    <nav className="bg-gray-900  py-3 shadow-lg relative">
      <div className="container flex justify-between align-middle px-20">
        <div className="flex items-center gap-3">
          <img
            src="logo_investmint-removebg.png"
            alt="Investmint Logo"
            className="h-12 w-auto object-cover"
          />
          <span className="text-white text-2xl font-bold leading-none">
            Investmint
          </span>
        </div>
        {/* Hamburger button for small screens */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-green-500 p-2"
        >
          <svg
            className="w-6 h-6 hover:stroke-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {/* Slide-out menu for small screens */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-64 bg-gray-800 bg-opacity-95 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out flex flex-col items-center justify-start py-7 md:hidden`}
          style={{ zIndex: isOpen ? 2000 : 1 }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 stroke-current text-white hover:text-green-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Menu Items */}
          <Link
            to="/"
            className="text-white text-lg mb-3 hover:text-green-300 hover:border-green-300 transition duration-300 ease-in-out border-b-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/test"
            className="text-white text-lg mb-3 hover:text-green-300 hover:border-green-300 transition duration-300 ease-in-out border-b-2"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to=""
            className="text-white text-lg mb-3 hover:text-green-300 hover:border-green-300 transition duration-300 ease-in-out border-b-2"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border border-green-700 rounded px-6">
            Login
          </button>
        </div>
        {/* Normal display of links for large screens */}
        <div className="flex align-middle justify-between">
          <div className="hidden md:flex justify-between  items-center gap-4">
            <Link
              to="/"
              className="text-white text-lg hover:text-green-300 transition duration-300 ease-in-out py-2 hover:underline underline-offset-8"
            >
              Home
            </Link>
            <Link
              to="/test"
              className="text-white text-lg hover:text-green-300 transition duration-300 ease-in-out py-2 hover:underline underline-offset-8"
            >
              About
            </Link>
            <Link
              to=""
              className="text-white text-lg hover:text-green-300 transition duration-300 ease-in-out py-2 hover:underline underline-offset-8"
            >
              Services
            </Link>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border border-green-700 rounded px-6">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
