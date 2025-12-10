"use client";

import Button from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import ContactUs from "@/public/main/contact_us.png";
import ArrowRight from "@/public/svgs/arrow-right.svg";
import { ArrowRightIco } from "@/icons/icons";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";

export default function Contactus() {
    const { t } = useTranslation();
    return (
        <div className="w-full h-[360px] mx-auto relative max-sm:h-[250px]">
            <div className="absolute w-full h-[360px] p-[60px] max-sm:h-full max-sm:px-4 max-sm:py-5">
                <h3 className="text-title font-semibold text-white mb-6 max-sm:text-large">
                    Contact Us
                </h3>
                <div className="text-large text-white mb-12 max-sm:text-base">
                    {t["main-contact-us-guide_1"].replace("  \n", "")}
                    <br />
                    {t["main-contact-us-guide_2"]}
                </div>
                <Link href="/contact" className="w-fit block">
                    <Button
                        label={t["main-contact-us-inquiry"]}
                        btnType="secondary"
                        icRight={
                            <ArrowRightIco
                                fill="#FFF"
                                className="w-9 h-9 max-sm:w-6 max-sm:h-6"
                            />
                        }
                        onClick={() => {
                            router.push("/contact");
                        }}
                        size="large"
                        className="text-titleSmall max-sm:text-base max-sm:h-[40px]"
                    />
                </Link>
            </div>
            <Image
                src={ContactUs.src}
                alt="Contact Us"
                width={1440}
                height={400}
                className="w-full h-[360px] max-sm:h-full max-sm:object-cover"
            />
        </div>
    );
}
