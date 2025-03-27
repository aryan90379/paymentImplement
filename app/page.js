import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="h-[44vh] flex flex-col items-center justify-center space-y-4 text-white px-4 sm:px-16">
        <div className="flex items-center space-x-4">
          <h1 className="font-bold text-3xl sm:text-5xl">Nexora</h1>
        </div>
        <p className="text-lg">A crowdfunding platform for creators.</p>
        <div className="flex space-x-4">
          <Link href={"/login"}>
            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 group hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:text-white dark:focus:ring-purple-800">
              <span className="relative px-5 py-2.5 bg-white rounded-md group-hover:bg-opacity-0 dark:bg-gray-900">
                Start now
              </span>
            </button>
          </Link>
          <Link href={"/about"}>
            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 group hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:text-white dark:focus:ring-purple-800">
              <span className="relative px-5 py-2.5 bg-white rounded-md group-hover:bg-opacity-0 dark:bg-gray-900">
                Read More
              </span>
            </button>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full mb-12 mt-6 border-t-2 border-gray-500"></div>

      {/* Features Section */}
      <section className="flex flex-col items-center justify-center space-y-4 text-white px-4 sm:px-16">
        <h2 className="text-4xl mb-6 font-semibold text-center">
          Get the support you deserve from your fans
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-4 w-full sm:w-1/3"
            >
              <Image
                className="bg-slate-400 rounded-full p-4"
                width={80}
                height={80}
                src={index === 1 ? "/coin.gif" : "/man.gif"}
                alt={index === 1 ? "Coin animation" : "Man animation"}
              />
              <p className="text-xl font-bold">Your Fans want to help you</p>
              <p className="text-md text-center">
                Your fans are available to support you and your work.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="w-full mb-12 mt-16 border-t-2 border-gray-500"></div>

      {/* About Section */}
      <section className="flex flex-col items-center justify-center pb-16 space-y-4 text-white px-4 sm:px-16">
        <h2 className="text-3xl font-semibold text-center">
          Learn more about us
        </h2>
        <div class="w-full lg:w-1/2 mx-auto aspect-video relative">
          <iframe
            class="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/Fd57NOavMWs?si=P5Cz6ybXYq0qYAWo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </section>
    </>
  );
}
