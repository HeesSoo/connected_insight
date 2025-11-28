"use client";

import Button from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import ContactUs from "@/public/main/contact_us.png";
import ArrowRight from "@/public/svgs/arrow-right.svg";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";

export default function Contactus() {
    const { t } = useTranslation();
    return (
        <div className="w-full h-[360px] mx-auto relative">
            <div className="absolute w-full h-[360px] p-[60px]">
                <h3 className="text-title font-semibold text-white mb-6">
                    Contact Us
                </h3>
                <div className="text-large text-white mb-12">
                    {t["main-contact-us-guide_1"].replace("  \n", "")}
                    <br />
                    {t["main-contact-us-guide_2"]}
                </div>
                <Link href="/contact" className="w-fit block">
                    <Button
                        label={t["main-contact-us-inquiry"]}
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
            <Image
                src={ContactUs.src}
                alt="Contact Us"
                width={1440}
                height={400}
                className="w-full h-[360px]"
            />
        </div>
    );
}
