"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { fetchuser } from "@/actions/useractions";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [username, setusername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const getData = async () => {
    if (session?.user?.email) {
      const user = await fetchuser(session.user.email);
      setusername(user.username);
    }
  };

  React.useEffect(() => {
    getData();
  }, [session]);

  return (
    <header className="bg-gray-900 text-white">
      <div className="w-full mx-auto flex items-center justify-between py-4 px-6 md:px-11">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Homepage"
          className="flex items-center text-2xl font-bold"
        >
          <span className="ml-2">Nexora</span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row md:items-center md:space-x-6 text-lg w-full md:w-auto`}
          aria-label="Main Navigation"
        >
          <div
            className={`${
              menuOpen ? "flex flex-col space-y-4 mt-4 md:mt-0" : "hidden"
            } md:flex md:flex-row md:space-y-0 md:space-x-6`}
          >
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/about-us" },
              { label: "Our Services", path: "/services" },
              { label: "Contact Us", path: "/contact-us" },
            ].map((link) => (
              <Link key={link.path} href={link.path} passHref>
                <span
                  className={`cursor-pointer hover:text-blue-500 transition duration-300 ${
                    pathname === link.path ? "text-blue-500 font-semibold" : ""
                  }`}
                  aria-current={pathname === link.path ? "page" : undefined}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {session ? (
            <div className="relative mt-4 md:mt-0">
              <button
                onClick={() => setShowDropDown(!showDropDown)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowDropDown(false);
                  }, 300);
                }}
                className="flex items-center text-white"
                aria-expanded={showDropDown}
                aria-controls="dropdownInformation"
              >
                {/* Profile Image */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={session?.user?.image || "/default-profile.png"}
                    alt={`${session?.user?.name || "User"}'s profile picture`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </button>

              <div
                id="dropdownInformation"
                className={`absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                  showDropDown ? "block" : "hidden"
                }`}
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{username}</div>
                  <div className="font-medium truncate">{session.user.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/user/${username}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Your page
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/earnings"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </Link>
                  </li>
                </ul>
                <div
                  className="py-2 cursor-pointer text-center text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => signOut()}
                >
                  Sign out
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 md:mt-0">
              <Link href="/login" passHref>
                <button
                  className="cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200"
                  aria-label="Login Page"
                >
                  Login
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
