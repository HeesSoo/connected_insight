"use client";

import Button from "@/components/Button";
import ContactUs from "@/public/main/contact_us.png";
import ArrowRight from "@/public/svgs/arrow-right.svg";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";

export default function Contactus() {
    return (
        <div className="w-full h-[360px] mx-auto relative">
            <div className="absolute w-full h-[360px] p-[60px]">
                <h3 className="text-title font-semibold text-white mb-6">Contact Us</h3>
                <div className="text-large text-white mb-12">
                    정밀 머신비전 솔루션에 대한 궁금한 점이 있나요?
                    <br />
                    EYEON이 도와드리겠습니다.
                </div>
                <Link href="/contact">
                    <Button
                        // label={t.contactUs}
                        label="문의하기"
                        btnType="secondary"
                        icRight={<ArrowRight />}
                        onClick={() => {
                            router.push("/contact");
                        }}
                        size="large"
                        className="text-titleSmall"
                    />
                </Link>
            </div>
            <Image src={ContactUs.src} alt="Contact Us" width={1440} height={400} className="w-full h-[360px]" />
        </div>
    );
}
