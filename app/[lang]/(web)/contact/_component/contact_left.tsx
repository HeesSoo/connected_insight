"use client";

import { useTranslation } from "@/hooks/useTranslation";
import contactLeft from "@/public/contact/contact.png";
import Image from "next/image";

const ContactLeft: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full relative">
            <Image src={contactLeft.src} alt="EYEON" width={560} height={560} className="w-full h-[402px] object-cover" />
            <div className="text-white text-large text-center mx-auto py-[48px] bg-g950">
                {t["contact-guide-1"]}
                <br />
                {t["contact-guide-2"]}
            </div>
        </div>
    );
};

export default ContactLeft;
