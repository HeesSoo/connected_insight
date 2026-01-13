"use client";

import Button from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import ContactUs from "@/public/main/contact_us.png";
import ArrowRight from "@/public/svgs/arrow-right.svg";
import { ArrowRightIco } from "@/icons/icons";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function Contactus() {
    const { t } = useTranslation();
    const localizedPath = useLocalizedPath();
    return (
        <div className="w-full h-[360px] mx-auto relative max-md:h-[250px]">
            <div className="absolute w-full h-[360px] p-[60px] flex flex-col justify-between max-md:h-full max-md:px-4 max-md:py-5">
                <div>
                    <h3 className="text-title font-semibold text-white mb-6 max-md:text-large">
                        Contact Us
                    </h3>
                    <div className="text-large text-white whitespace-pre-line max-md:text-base">
                        {t["main-contact-us-guide_1"].replace("  \n", "")}
                    </div>
                </div>
                <Link href={localizedPath('/contact')} className="w-fit block">
                    <Button
                        label={t["main-contact-us-inquiry"]}
                        btnType="secondary"
                        icRight={
                            <ArrowRightIco
                                fill="#FFF"
                                className="w-9 h-9 max-md:w-6 max-md:h-6"
                            />
                        }
                        onClick={() => {
                            router.push(`${localizedPath('/contact')}`);
                        }}
                        size="large"
                        className="text-titleSmall max-md:text-base max-md:h-[40px]"
                    />
                </Link>
            </div>
            <Image
                src={ContactUs.src}
                alt="Contact Us"
                width={1440}
                height={400}
                className="w-full h-[360px] max-md:h-full max-md:object-cover"
            />
        </div>
    );
}
