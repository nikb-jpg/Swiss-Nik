import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swiss Nik | Advanced German Learning",
  description: "B1+ German Immersion and Active Recall",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-red-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight">Swiss Nik 🇨🇭</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li><a href="#" className="hover:underline">Immersion</a></li>
                  <li><a href="#" className="hover:underline">Recall</a></li>
                  <li><a href="#" className="hover:underline">Shadowing</a></li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-6">
            {children}
          </main>
          <footer className="bg-gray-100 p-4 text-center text-gray-500 text-sm">
            © 2026 Swiss Nik. Built for Excellence.
          </footer>
        </div>
      </body>
    </html>
  );
}
