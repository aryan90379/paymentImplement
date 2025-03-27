import React from 'react';
import Link from "next/link";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="h-[50vh] flex flex-col items-center justify-center space-y-4 text-white px-4 sm:px-16 bg-gradient-to-br from-blue-600 to-teal-600">
        <h1 className="font-bold text-4xl sm:text-6xl">About Us</h1>
        <p className="text-lg sm:text-xl max-w-2xl text-center">
          Welcome to our platform! We are dedicated to creating meaningful connections and empowering individuals to bring their ideas to life. Discover how we make a difference every day.
        </p>
      </section> 

      {/* Divider */}
      <div className="w-full mb-12 mt-6 border-t-2 border-gray-500"></div>

      {/* Our Mission Section */}
      <section className="flex flex-col items-center justify-center space-y-8 text-white px-4 sm:px-16 bg-gray-800">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">
          Our Mission
        </h2>
        <p className="text-lg sm:text-xl text-center sm:w-3/4">
          Our goal is to empower creators, innovators, and dreamers by providing a platform that connects them directly with those who believe in their vision. We believe in the power of community support and the potential to make a real difference together.
        </p>
      </section>

      {/* Divider */}
      <div className="w-full mb-12 mt-16 border-t-2 border-gray-500"></div>

      {/* Our Values Section */}
      <section className="flex flex-col items-center justify-center space-y-8 text-white px-4 sm:px-16 bg-gradient-to-br from-purple-600 to-pink-600">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">
          Our Values
        </h2>
        <div className="space-y-6 max-w-3xl text-center">
          <p className="text-lg sm:text-xl">
            <span className="font-bold">Integrity:</span> We are committed to being transparent, honest, and authentic in all our interactions.
          </p>
          <p className="text-lg sm:text-xl">
            <span className="font-bold">Community:</span> Our platform thrives because of the collaborative nature of its users. Together, we achieve more.
          </p>
          <p className="text-lg sm:text-xl">
            <span className="font-bold">Innovation:</span> We continuously strive for innovation, offering fresh solutions to meet the evolving needs of our users.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full mb-12 mt-16 border-t-2 border-gray-500"></div>

      {/* Get Involved Section */}
      <section className="flex flex-col items-center justify-center space-y-8 text-white px-4 sm:px-16 bg-gray-900">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">
          Get Involved
        </h2>
        <p className="text-lg sm:text-xl text-center sm:w-3/4">
          Whether you’re a creator or a supporter, there’s a place for you. Join our community and help bring amazing ideas to life. Together, we can achieve extraordinary things.
        </p>
        <Link href="/contact">
          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-yellow-500 to-red-500 group hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:text-white dark:focus:ring-red-800">
            <span className="relative px-5 py-2.5 bg-white rounded-md group-hover:bg-opacity-0 dark:bg-gray-900">
              Contact Us
            </span>
          </button>
        </Link>
      </section>

      {/* Divider */}
      <div className="w-full mb-12 mt-16 border-t-2 border-gray-500"></div>

      {/* Footer */}
      <footer className="flex items-center justify-center text-white py-8 bg-gradient-to-br from-teal-600 to-blue-600">
        <p className="text-lg sm:text-xl">© 2025 Our Platform. All rights reserved.</p>
      </footer>
    </>
  );
}

export default AboutUs;


export const metadata = {
  title: 'Nexora-About',
  description: 'this consits the about info about my website',
}