"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import Logo from "@/public/svgs/logo.svg";
import ArrowDown from "@/public/svgs/arrow-down.svg";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Logo width={116} height={40} />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 ml-[80px]">
                        <Link href="/" className="flex items-center text-primary-950 transition-colors duration-200 gap-[8px] text-base">
                            <span>Solutions</span>
                            <ArrowDown width={24} height={24} />
                        </Link>
                        <Link href="/about" className="flex items-center text-primary-950 transition-colors duration-200 gap-[8px] text-base">
                            <span>Products</span>
                            <ArrowDown width={24} height={24} />
                        </Link>
                        <Link href="/services" className="flex items-center text-primary-950 transition-colors duration-200 gap-[8px] text-base">
                            <span>Support</span>
                            <ArrowDown width={24} height={24} />
                        </Link>
                        <Link href="/contact" className="flex items-center text-primary-950 transition-colors duration-200 gap-[8px] text-base">
                            <span>Contact</span>
                            <ArrowDown width={24} height={24} />
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
