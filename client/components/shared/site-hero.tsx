import React from "react";
import HeroInput from "../hero-input";
import Image from "next/image";
import SiteFeatures from "./site-features";
const SiteHero = () => {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-sm text-indigo-600 font-medium">
            Uncover the Power of AI in Content Exploration
          </h1>
          <h2 className="text-4xl dark:text-white text-gray-800 font-extrabold mx-auto md:text-5xl">
            AI-Driven YouTube Video Summarizer with Next.js and OpenAI:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
              Extracting Insights in a Glance
            </span>
          </h2>
          <p className="max-w-2xl mx-auto">
            Effortlessly distill key insights from YouTube videos using an
            intelligent summarization engine powered by Next.js and the OpenAI
            API.
          </p>
          {/* <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <div>
              <Input
                className=" text-black dark:text-white w-full"
                placeholder="Paste your url here.."
                color="white"
              />
            </div>
            <Link
              href={"/generate"}
              className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
            >
              Generate
            </Link>
            <Link
              href={"/"}
              className="block py-2 px-4 dark:text-white hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
            >
              Get access
            </Link>
          </div> */}
          <HeroInput />
        </div>
        <div className="mt-14">
          <Image
            src="/hero-img.png"
            className="w-full shadow-lg rounded-lg border"
            alt=""
            width={1440}
            height={800}
          />
        </div>
      </div>
      <section>
        <SiteFeatures />
      </section>
    </section>
  );
};

export default SiteHero;
