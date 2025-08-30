"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [URL, setURL] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");

  // Generate short URL
  const Generate = () => {
    if (!URL || !shortUrl) {
      toast.error("Please fill in both fields!");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: URL,
      shorturl: shortUrl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          if (result.dummy) {
            toast.success("Dummy URL generated (DB offline) 🎭");
            setGeneratedUrl(`${window.location.origin}/${shortUrl}`);
          } else {
            toast.success("URL generated successfully 🎉");
            setGeneratedUrl(`${window.location.origin}/${shortUrl}`);
          }

          setGenerated(true);
          setURL("");
          setShortUrl("");
        } else {
          toast.error(result.message || "Failed to generate URL!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-purple-700 text-white">
        <div className="flex flex-col gap-4 md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug font-['Paytone_One']">
            The Best <span className="text-purple-300">URL Shortener</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 font-[Roboto]">
            We provide the most straightforward and efficient way to shorten your URLs.
          </p>

          <div className="flex gap-4 justify-center md:justify-start mt-4">
            <Link href="/">
              <button className="bg-purple-300 hover:bg-purple-400 text-purple-900 font-semibold px-5 py-2 rounded-lg transition duration-300 shadow-md">
                Try Now
              </button>
            </Link>
            <Link href="https://github.com/" target="_blank">
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-5 py-2 rounded-lg transition duration-300 shadow-md">
                GitHub
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <Image
            alt="URL Shortener Vector"
            src="/vector.png"
            width={350}
            height={350}
            className="drop-shadow-lg"
          />
        </div>
      </section>

      {/* URL Shortener Section */}
      <section className="w-full max-w-3xl px-6 md:px-0 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 font-['Paytone_One']">
          Generate Your Short URL
        </h2>

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your URL"
            onChange={(e) => setURL(e.target.value)}
            value={URL}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
          />

          <input
            type="text"
            placeholder="Enter your preferred short URL text"
            onChange={(e) => setShortUrl(e.target.value)}
            value={shortUrl}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
          />

          <button
            onClick={Generate}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 shadow-md"
          >
            Generate
          </button>

          {generated && (
            <div className="mt-4 text-center">
              <p className="text-lg text-gray-800 font-[Roboto]">
                Your short URL:{" "}
                <a
                  href={generatedUrl}
                  target="_blank"
                  className="font-semibold text-purple-600 hover:underline"
                >
                  {generatedUrl}
                </a>
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
