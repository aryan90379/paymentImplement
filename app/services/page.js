import React from 'react';

const Services = () => {
  return (
    <div className="text-white"> {/* Keep text white for contrast */}
      {/* Hero Section */}
      <section className="h-[50vh] flex flex-col items-center justify-center space-y-4 text-center px-4 sm:px-16">
        <h1 className="font-bold text-4xl sm:text-6xl bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Our Services
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Discover the wide range of services we offer to help you bring your vision to life. We are here to support your journey every step of the way.
        </p>
      </section>

      {/* Divider */}
      <div className="w-full mb-12 mt-6 border-t-2 border-gray-500"></div>

      {/* Services List */}
      <section className="flex flex-col items-center justify-center space-y-8 text-white px-4 sm:px-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">
          What We Offer
        </h2>
        <div className="space-y-6 max-w-3xl text-center mx-auto">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Crowdfunding Platform
            </h3>
            <p className="text-lg sm:text-xl">
              A platform that allows creators to connect with their audience, raise funds, and bring their creative projects to life.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-teal-500 text-transparent bg-clip-text">
              Marketing & Promotion
            </h3>
            <p className="text-lg sm:text-xl">
              We offer marketing services to help spread the word about your project, ensuring that it reaches a wider audience.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              Creator Support
            </h3>
            <p className="text-lg sm:text-xl">
              Our team offers 1-on-1 support to guide creators through every stage of their journey, from setup to successful funding.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full mb-12 mt-16 border-t-2 border-gray-500"></div>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center space-y-8 text-white px-4 sm:px-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">
          Ready to Get Started?
        </h2>
        <p className="text-lg sm:text-xl text-center sm:w-3/4 mx-auto">
          If you're ready to bring your ideas to life, we're here to help! Get in touch with us today to learn more about our services.
        </p>
        <a href="/contact">
          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 group hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200">
            <span className="relative px-5 py-2.5 bg-white rounded-md group-hover:bg-opacity-0 dark:bg-gray-900">
              Contact Us
            </span>
          </button>
        </a>
      </section>
    </div>
  );
}

export default Services;
