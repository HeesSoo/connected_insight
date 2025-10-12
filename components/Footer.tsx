"use client";

import React from "react";
import Logo from "@/public/svgs/logo.svg";
import Link from "next/link";

export default function Footer() {
    return (
        <footer role="contentinfo" className="bg-gray-950 text-white">
            <div className="max-w-max-full mx-auto pt-[60px] pb-[120px]">
                <div className="grid grid-cols-2">
                    <section className="company-info">
                        <div className="mb-[20px]">
                            <Logo width={134} height={56} />
                        </div>
                        <address className="contact-info not-italic">
                            <dl className="">
                                <div className="flex text-gray-300 text-small">
                                    <dt>주소&nbsp;:&nbsp;</dt>
                                    <dd>서울특별시 금천구 사원대로 390, 대륭 307호</dd>
                                </div>

                                <div className="flex text-gray-300 text-small">
                                    <dt>사업자등록번호&nbsp;:&nbsp;</dt>
                                    <dd>771-86-03145</dd>
                                </div>

                                <div className="flex text-gray-300 text-small mt-[20px]">
                                    <dt>대표자&nbsp;:&nbsp;</dt>
                                    <dd>김경배</dd>
                                </div>

                                <div className="flex gap-[24px]">
                                    <div className="flex text-gray-300 text-small">
                                        <dt>대표전화&nbsp;:&nbsp;</dt>
                                        <dd>070-8880-3145</dd>
                                    </div>

                                    <div className="flex text-gray-300 text-small">
                                        <dt>Email&nbsp;:&nbsp;</dt>
                                        <dd>sales@eyeon.co.kr</dd>
                                    </div>
                                </div>
                            </dl>
                        </address>
                    </section>

                    <nav className="footer-nav">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-[60px]">
                            <section className="nav-section">
                                <h3 className="text-white font-semibold mb-4 text-large">Solutions</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/solutions" className="text-gray-300 hover:text-white transition-colors text-small">
                                            CIS Application
                                        </Link>
                                    </li>
                                </ul>
                            </section>

                            <section className="nav-section">
                                <h3 className="text-white font-semibold mb-4 text-large">Products</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/product" className="text-gray-300 hover:text-white transition-colors text-small">
                                            CIS Cameras
                                        </Link>
                                    </li>
                                </ul>
                            </section>

                            <section className="nav-section">
                                <h3 className="text-white font-semibold mb-4 text-large">Support</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/support" className="text-gray-300 hover:text-white transition-colors text-small">
                                            Support
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/support/download" className="text-gray-300 hover:text-white transition-colors text-small">
                                            Downloads
                                        </Link>
                                    </li>
                                </ul>
                            </section>

                            <section className="nav-section">
                                <h3 className="text-white font-semibold mb-4 text-large">Contact</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-small">
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
