import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

// ✅ Import Google Fonts via Next.js font optimization
import { Geist, Geist_Mono, Inter, Roboto, Paytone_One } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

const paytoneOne = Paytone_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Bitlinks - Your Trusted URL Shortener",
  description: "Bitlinks helps you to shorten your URLs easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${roboto.className} ${paytoneOne.className} antialiased`}
      >
        {/* ✅ Navbar */}
        <Navbar />

        {/* ✅ Page Content */}
        {children}

        {/* ✅ Toast Notifications */}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
