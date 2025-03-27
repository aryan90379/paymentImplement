"use client"
import React from 'react';
import Link from 'next/link';

const Contact = () => {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="h-[50vh] flex flex-col items-center justify-center space-y-4 text-center px-4 sm:px-16">
        <h1 className="font-bold text-4xl sm:text-6xl bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          We'd love to hear from you! If you have any questions or need assistance, feel free to reach out.
        </p>
      </section>

      {/* Divider */}
      <hr className="w-full my-6 border-gray-500" />

      {/* Contact Information */}
      <section className="flex flex-col items-center space-y-8 px-4 sm:px-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">Get in Touch</h2>
        <div className="space-y-6 max-w-3xl text-center mx-auto">
          <p className="text-lg sm:text-xl">
            <span className="font-semibold">Email:</span> support@yourdomain.com
          </p>
          <p className="text-lg sm:text-xl">
            <span className="font-semibold">Phone:</span> +1 234 567 890
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="w-full my-12 border-gray-500" />

      {/* Contact Form */}
      <section className="flex flex-col items-center space-y-8 px-4 sm:px-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">Send Us a Message</h2>
        <form className="space-y-6 max-w-3xl w-full" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col space-y-4">
            <label htmlFor="name" className="text-lg sm:text-xl">
              Full Name:
              <input
                type="text"
                id="name"
                className="mt-2 px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your Name"
                aria-label="Your Name"
                required
              />
            </label>
            <label htmlFor="email" className="text-lg sm:text-xl">
              Email:
              <input
                type="email"
                id="email"
                className="mt-2 px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your Email"
                aria-label="Your Email"
                required
              />
            </label>
            <label htmlFor="message" className="text-lg sm:text-xl">
              Message:
              <textarea
                id="message"
                className="mt-2 px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your Message"
                rows="6"
                aria-label="Your Message"
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 group focus:ring-4 focus:outline-none focus:ring-purple-200"
          >
            <span className="relative px-5 py-2.5 bg-white rounded-md group-hover:bg-opacity-0 dark:bg-gray-900">
              Send Message
            </span>
          </button>
        </form>
      </section>

      {/* Divider */}
      <hr className="w-full my-12 border-gray-500" />

      {/* Call to Action */}
      <section className="flex flex-col items-center space-y-8 px-4 sm:px-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">We're Here to Help</h2>
        <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto">
          Whether it's a quick question or a detailed inquiry, we're happy to assist you. Don't hesitate to get in touch.
        </p>
        <Link href="/" className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 group focus:ring-4 focus:outline-none focus:ring-purple-200">
          
            <span className="relative px-5 py-2.5 bg-white rounded-md group-hover:bg-opacity-0 dark:bg-gray-900">
              Return to Home
            </span>
          
        </Link>
      </section>
    </div>
  );
};

export default Contact;
