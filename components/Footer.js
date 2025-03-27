import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          {/* Logo and Description */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold">Buy Me a Drink</h2>
            <p className="text-sm mt-2 text-gray-400">
              Connecting creators with their supporters. Empowering you to fund creativity, share ideas, and grow communities one drink at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition duration-300"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition duration-300"
                >
                  Explore Creators
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition duration-300"
                >
                  Become a Creator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition duration-300"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>Email: support@buymeadrink.com</li>
              <li>Phone: +1 (555) 987-6543</li>
              <li>Address: 456 Creator Lane, Inspiration City</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Buy Me a Drink. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              Creator Guidelines
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

