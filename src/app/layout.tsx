'use client'; // This layout uses client-side hooks and event listeners

import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { useMotionValue, useSpring } from "framer-motion"; // motion dihapus karena tidak digunakan
import Image from "next/image";
import GooeyNav from "@/blocks/Components/GooeyNav/GooeyNav";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { gilroy } from "@/fonts/fonts";

const items = [
  { label: "Home", href: "/" },
  { label: "Awards", href: "/Hackathons" },
  { label: "Contact", href: "/Contact" },
];

const socialLinks = [
  { platform: "GitHub", href: "https://github.com/serevinaash", iconPath: "/icons/github_icon.svg" },
  { platform: "LinkedIn", href: "https://www.linkedin.com/in/serevinasherly/", iconPath: "/icons/linkedin_icon.svg" },
  { platform: "Gmail", href: "mailto:serevinasherly01@gmail.com", iconPath: "/icons/gmail_icon.svg" },
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const activeIndex = items.findIndex(item => item.href === pathname);

  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      lenis.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.current?.destroy();
      };
    }
  }, []);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const dotSpringConfig = { damping: 25, stiffness: 200 };
  const outlineSpringConfig = { damping: 35, stiffness: 400 };

  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const outlineX = useSpring(dotX, outlineSpringConfig);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const outlineY = useSpring(dotY, outlineSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    setTimeout(() => {
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    }, 0);

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gilroy.variable} antialiased font-gilroy bg-black`}
        style={{ cursor: 'auto' }}
      >
        <header className="sticky top-0 z-50 flex w-full items-center justify-between px-4 py-2 md:px-8 md:py-3 bg-transparent backdrop-blur-[3px]">
          <Link href="/" passHref>
            <Image
              src="/logo/lauv-logo2.svg"
              alt="Lauv Logo"
              width={35}
              height={35}
              className="m-4 md:m-10 transition-all duration-300 hover:scale-150 hover:rotate-10 hover:brightness-125"
            />
          </Link>

          <div className="hidden md:block font-medium" style={{ height: '70px', width: '400px', position: 'relative' }}>
            <GooeyNav
              items={items}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={activeIndex !== -1 ? activeIndex : 0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          <button
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ease-in-out"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ease-in-out"></div>
            <div className="w-6 h-0.5 bg-white transition-all duration-300 ease-in-out"></div>
          </button>
        </header>

        {mobileMenuOpen && (
          <div className="md:hidden bg-transparent backdrop-blur-[10px] pt-10 fixed top-[72px] sm:top-[80px] md:top-[96px] right-0 left-0 z-40 p-4 sm:p-5 overflow-y-auto h-[calc(100vh - 72px)] sm:h-[calc(100vh - 80px)] md:h-[calc(100vh - 96px)]">
            <nav className="flex flex-col space-y-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-white hover:text-gray-300 py-2 px-4 font-medium text-base sm:text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {children}

        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-black/60 border border-white/[.30] border-dashed rounded-full p-2 md:p-4 flex flex-col items-center space-y-7 md:space-y-5">
          {socialLinks.map((link) => (
            <Link
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-110"
            >
              <Image
                src={link.iconPath}
                alt={`${link.platform} icon`}
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
              />
            </Link>
          ))}
        </div>
      </body>
    </html>
  );
}
