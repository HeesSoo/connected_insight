"use client";

import Button from "@/components/Button";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { ReservationItem } from "../page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslationStore } from "@/stores/translationStore";
import Support_ReservationLab_Banner from "@/public/support/reservation-lab/Reservationlab_Banner.png";
import Support_ReservationLab_ContactBg from "@/public/support/reservation-lab/Support_ReservationLab_ContactBg.png";
import MotionWrapper from "@/components/MotionWrapper";
import { useTranslation } from "@/hooks/useTranslation";

export default function Support_ReservationLab({
    data,
}: {
    data: ReservationItem[];
}) {
    const router = useRouter();
    const { currentLanguage } = useTranslationStore();
    const { t } = useTranslation();

    const [swipers, setSwipers] = useState<SwiperClass[]>([]);
    const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

    const handlePrev = ({ idx }: { idx: number }) => {
        swipers[idx]?.slidePrev();
    };

    const handleNext = ({ idx }: { idx: number }) => {
        swipers[idx]?.slideNext();
    };

    console.log(data, " : data");

    return (
        <>
            {/* Main Image */}
            <div className="w-full max-md:h-[300px]">
                <Image
                    src={Support_ReservationLab_Banner}
                    alt="EYEON Vision & Robotics Lab Banner"
                    width={1920}
                    height={400}
                    className="object-cover w-full h-[400px] max-md:h-[300px]"
                />
            </div>
            <div className="w-full px-8 max-md:px-4">
                <div className="w-full max-w-[1440px] pt-[120px] pb-[160px] mx-auto text-g950 max-md:pb-[96px] max-md:pt-9">
                    {/* EYEON Vision */}
                    <MotionWrapper
                        delay={200}
                        duration={0.8}
                        direction="up"
                        amount={0.05}
                    >
                        <div className="w-full flex mb-[160px] max-md:mb-[80px] max-md:flex-col">
                            <div className="mr-[137px] flex-1 max-md:mr-0 max-md-mb-[24px]">
                                <h3 className="mb-2 text-h3 font-bold max-md:text-lg max-md:mb-1">
                                    EYEON Vision & Robotics Lab
                                </h3>
                                <div className="text-titleSmall font-bold max-md:text-base">
                                    {/* 핵심 컴포넌트 기술을 경험하는 공간 */}
                                    {t["reservation-sub-title"]}
                                </div>
                            </div>

                            <div className="w-[712px] text-large font-[500] max-md:w-full max-md:text-base whitespace-pre-wrap">
                                {t["reservation-description-1"]
                                    .split("{0}")
                                    .map((part, index) => (
                                        <span key={index}>
                                            {part}
                                            {index === 0 && (
                                                <span className="text-ePrimary font-[600]">
                                                    {
                                                        t[
                                                            "reservation-desecription-core"
                                                        ]
                                                    }
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                <br />
                                <br />
                                {t["reservation-description-2"]}
                                {/* 주식회사 아이온은 산업 자동화의 핵심이
                                되는&nbsp;
                                <span className="text-ePrimary font-[600]">
                                    머신비전 CIS카메라와
                                </span>
                                <br className="max-md:hidden" />
                                <span className="hidden max-md:inline">
                                    &nbsp;
                                </span>
                                <span className="text-ePrimary font-[600]">
                                    고성능 리니어 액츄에이터 컴포넌트
                                </span>
                                를 전문적으로 공급하는 기업입니다.
                                <br />
                                저희의 기술력이 집약된 공간, EYEON Vision &
                                Robotics Lab을 소개합니다.
                                <br />
                                <br />
                                이곳은 고객 여러분이 저희 컴포넌트의 실제 성능과
                                적용 가능성을 직접 확인하고,
                                <br className="max-md:hidden" />
                                최적의 시스템 구축 방안을 논의할 수 있도록
                                조성된{" "}
                                <span className="text-ePrimary font-[600]">
                                    기술 시연 및 협력 허브
                                </span>
                                입니다. */}
                            </div>
                        </div>
                    </MotionWrapper>

                    {data &&
                        data.length > 0 &&
                        data.map((v, idx) => {
                            return (
                                <MotionWrapper
                                    delay={200}
                                    duration={0.8}
                                    direction="up"
                                    amount={0.05}
                                    key={v.uuid}
                                >
                                    <div
                                        className="w-full flex justify-between mb-[160px] max-md:block max-md:mb-[80px]"
                                        key={v.uuid}
                                    >
                                        <div className="w-[591px] h-[520px] bg-black relative max-md:w-full max-md:h-[304px]">
                                            <Swiper
                                                modules={[Navigation]}
                                                onSwiper={(e) => {
                                                    setSwipers((prev) => {
                                                        const newSwipers = [
                                                            ...prev,
                                                        ];
                                                        newSwipers[idx] = e;
                                                        return newSwipers;
                                                    });
                                                    setActiveIndexes((prev) => {
                                                        const newIndexes = [
                                                            ...prev,
                                                        ];
                                                        newIndexes[idx] = 0;
                                                        return newIndexes;
                                                    });
                                                }}
                                                onSlideChange={(swiper) => {
                                                    let activeIdxs =
                                                        activeIndexes;
                                                    activeIdxs[idx] =
                                                        swiper.activeIndex;
                                                    setActiveIndexes([
                                                        ...activeIdxs,
                                                    ]);
                                                }}
                                                className="w-full h-full max-md:mb-[56px]"
                                            >
                                                {v.images.map((image) => {
                                                    return (
                                                        <SwiperSlide
                                                            key={image.uuid}
                                                        >
                                                            <div>
                                                                <Image
                                                                    src={
                                                                        image
                                                                            .file
                                                                            .s3_url
                                                                    }
                                                                    alt="Alternative Image"
                                                                    width={591}
                                                                    height={444}
                                                                    className="object-cover max-md:w-full max-md:h-[256px]"
                                                                />
                                                                <div className="w-full py-5 text-center text-titleSmall text-white font-semibold max-md:py-3 max-md:text-base">
                                                                    {currentLanguage ===
                                                                    "en"
                                                                        ? image.name_en
                                                                        : image.name}
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    );
                                                })}
                                            </Swiper>

                                            <button
                                                className="absolute top-1/2 -translate-y-[50%] -left-[30px] z-[1] w-[60px] h-[60px] rounded-full bg-ePrimary hover:bg-ePrimary/90 transition-colors flex justify-center items-center cursor-pointer max-md:hidden"
                                                onClick={() =>
                                                    handlePrev({ idx })
                                                }
                                            >
                                                <svg
                                                    width="24"
                                                    height="18"
                                                    viewBox="0 0 24 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M9.23063 17.4808L10.8116 15.854L5.08275 10.1252H23.25V7.87516H5.08275L10.8116 2.14628L9.23063 0.519531L0.75 9.00016L9.23063 17.4808Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className="absolute top-1/2 -translate-y-[50%] -right-[30px] z-[1] w-[60px] h-[60px] rounded-full bg-ePrimary hover:bg-ePrimary/90 transition-colors flex justify-center items-center cursor-pointer max-md:hidden"
                                                onClick={() =>
                                                    handleNext({ idx })
                                                }
                                            >
                                                <svg
                                                    width="24"
                                                    height="18"
                                                    viewBox="0 0 24 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M14.7694 17.4808L13.1884 15.854L18.9173 10.1252H0.75V7.87516H18.9173L13.1884 2.14628L14.7694 0.519531L23.25 9.00016L14.7694 17.4808Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>

                                            <div className="hidden max-md:block">
                                                <div className="absolute -bottom-[20px] left-1/2 transform -translate-x-1/2 flex gap-3">
                                                    {v.images.map(
                                                        (image, imgIdx) => {
                                                            return (
                                                                <div
                                                                    key={imgIdx}
                                                                    className={`w-2 h-2 ${
                                                                        imgIdx ===
                                                                        activeIndexes[
                                                                            idx
                                                                        ]
                                                                            ? "bg-ePrimary"
                                                                            : "bg-g200"
                                                                    }`}
                                                                    onClick={() => {
                                                                        swipers[
                                                                            idx
                                                                        ]?.slideTo(
                                                                            imgIdx
                                                                        );
                                                                    }}
                                                                ></div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-[712px] h-auto flex flex-col justify-between ml-[40px] max-md:w-full max-md:mt-14 max-md:ml-0">
                                            <div className="mb-[40px]">
                                                <h3 className="text-h3 font-bold mb-2 max-md:text-large max-md:mb-1">
                                                    {currentLanguage === "en"
                                                        ? v.name_en
                                                        : v.name}
                                                </h3>
                                                <div className="text-large font-[500] mb-5 max-md:text-base max-md:mb-6">
                                                    {currentLanguage === "en"
                                                        ? v.description_en
                                                        : v.description}
                                                </div>
                                                <div className="flex gap-2 max-md:flex-col">
                                                    {v.buttons.map((button) => (
                                                        <>
                                                            <Button
                                                                label={
                                                                    currentLanguage ===
                                                                    "en"
                                                                        ? button.button_text_en
                                                                        : button.button_text
                                                                }
                                                                size="medium"
                                                                icRight={
                                                                    <svg
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M16.8165 12.7568H5.43945C5.22662 12.7568 5.04845 12.685 4.90495 12.5413C4.76129 12.3978 4.68945 12.2197 4.68945 12.0068C4.68945 11.794 4.76129 11.6158 4.90495 11.4723C5.04845 11.3287 5.22662 11.2568 5.43945 11.2568H16.8165L11.6472 6.08759C11.4985 5.93893 11.4251 5.76493 11.427 5.56559C11.429 5.36626 11.5075 5.18901 11.6625 5.03384C11.8176 4.88901 11.9933 4.81401 12.1895 4.80884C12.3856 4.80368 12.5613 4.87868 12.7165 5.03384L19.0567 11.3741C19.1504 11.4678 19.2164 11.5665 19.2547 11.6703C19.2932 11.7742 19.3125 11.8863 19.3125 12.0068C19.3125 12.1273 19.2932 12.2395 19.2547 12.3433C19.2164 12.4472 19.1504 12.5459 19.0567 12.6396L12.7165 18.9798C12.578 19.1183 12.4065 19.1892 12.202 19.1923C11.9975 19.1955 11.8176 19.1247 11.6625 18.9798C11.5075 18.8247 11.43 18.6465 11.43 18.4453C11.43 18.244 11.5075 18.0658 11.6625 17.9106L16.8165 12.7568Z"
                                                                            fill="white"
                                                                        />
                                                                    </svg>
                                                                }
                                                                className="w-[240px] max-md:h-10 max-md:px-4"
                                                                onClick={() => {
                                                                    router.push(
                                                                        `/${currentLanguage}${button.button_url.replace(
                                                                            "products",
                                                                            "product"
                                                                        )}`
                                                                    );
                                                                }}
                                                            />
                                                        </>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="w-full grid grid-cols-2 gap-4 max-md:grid-cols-1 max-md:mt-6 max-md:gap-2">
                                                {v.features.map(
                                                    (feature, idx) => {
                                                        const isLast =
                                                            idx ===
                                                            v.features.length -
                                                                1;
                                                        const isOdd =
                                                            v.features.length %
                                                                2 !==
                                                            0;

                                                        return (
                                                            <div
                                                                className={`bg-g50 p-4 ${
                                                                    isLast &&
                                                                    isOdd
                                                                        ? "col-span-2 max-md:col-span-1"
                                                                        : ""
                                                                }`}
                                                                key={
                                                                    feature.uuid
                                                                }
                                                            >
                                                                <h5 className="text-base font-semibold text-ePrimary mb-3">
                                                                    {currentLanguage ===
                                                                    "en"
                                                                        ? feature.title_en
                                                                        : feature.title}
                                                                </h5>
                                                                <div className="text-base font-[500] text-g800">
                                                                    {currentLanguage ===
                                                                    "en"
                                                                        ? feature.description_en
                                                                        : feature.description}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            );
                        })}

                    {/* 방문 예약 안내 */}
                    <div className="w-full h-[464px] mx-auto relative mb-[80px] max-md:mb-0 max-md:h-[274px]">
                        <div className="absolute w-full h-[464px] py-12 flex flex-col text-white text-center z-10 max-md:h-[274px] max-md:py-0 max-md:justify-center">
                            <h3 className="mb-3 text-h3 font-bold max-md:text-large">
                                {/* 방문 예약 안내 */}
                                {t["reservation-visit-title"]}
                            </h3>

                            <div className="text-g200 text-large font-[500] mb-12 max-md:text-base">
                                {/* EYEON Lab 방문을 예약하시고, */}
                                {t["reservation-visit-sub-title-1"]}
                                <br className="hidden max-md:block" />
                                {t["reservation-visit-sub-title-2"]}
                                {/* VISION 기술을 경험해보세요. */}
                            </div>

                            <div className="mx-auto flex gap-8 items-center mb-12 max-md:hidden">
                                <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold whitespace-pre-wrap">
                                    {/* 방문예약 */}
                                    {t["reservation-visit-process-1"]}
                                </div>
                                <ArrowIco />
                                <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold whitespace-pre-wrap">
                                    {/* 영업팀 상담 */}
                                    {t["reservation-visit-process-2"]}
                                </div>
                                <ArrowIco />
                                <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold whitespace-pre-wrap">
                                    {/* 랩 방문 */}
                                    {t["reservation-visit-process-3"]}
                                </div>
                                <ArrowIco />
                                <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold whitespace-pre-wrap">
                                    {/* Test 진행 */}
                                    {t["reservation-visit-process-4"]}
                                </div>
                                <ArrowIco />
                                <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold whitespace-pre-wrap">
                                    {/* Test
                                    <br />
                                    결과 안내 */}
                                    {t["reservation-visit-process-5"]}
                                </div>
                            </div>

                            <Button
                                label="Contact"
                                size="medium"
                                btnType="secondary"
                                className="w-fit mx-auto max-md:h-10 max-md:px-4"
                                icRight={
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.8165 12.7568H5.43945C5.22662 12.7568 5.04845 12.685 4.90495 12.5413C4.76129 12.3978 4.68945 12.2197 4.68945 12.0068C4.68945 11.794 4.76129 11.6158 4.90495 11.4723C5.04845 11.3287 5.22662 11.2568 5.43945 11.2568H16.8165L11.6472 6.08759C11.4985 5.93893 11.4251 5.76493 11.427 5.56559C11.429 5.36626 11.5075 5.18901 11.6625 5.03384C11.8176 4.88901 11.9933 4.81401 12.1895 4.80884C12.3856 4.80368 12.5613 4.87868 12.7165 5.03384L19.0567 11.3741C19.1504 11.4678 19.2164 11.5665 19.2547 11.6703C19.2932 11.7742 19.3125 11.8863 19.3125 12.0068C19.3125 12.1273 19.2932 12.2395 19.2547 12.3433C19.2164 12.4472 19.1504 12.5459 19.0567 12.6396L12.7165 18.9798C12.578 19.1183 12.4065 19.1892 12.202 19.1923C11.9975 19.1955 11.8176 19.1247 11.6625 18.9798C11.5075 18.8247 11.43 18.6465 11.43 18.4453C11.43 18.244 11.5075 18.0658 11.6625 17.9106L16.8165 12.7568Z"
                                            fill="#FFFFFF"
                                        />
                                    </svg>
                                }
                                onClick={() => {
                                    router.push(`/${currentLanguage}/contact`);
                                }}
                            />
                        </div>
                        <div className="absolute w-full h-[464px] bg-black opacity-30 z-[1] max-md:h-[274px]"></div>
                        <div className="w-full h-[464px] max-md:h-[274px]">
                            <Image
                                src={Support_ReservationLab_ContactBg}
                                alt="Contact Background"
                                width={1920}
                                height={464}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const ArrowIco = () => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M25.2237 19.1353H8.1582C7.83895 19.1353 7.5717 19.0275 7.35645 18.812C7.14095 18.5968 7.0332 18.3295 7.0332 18.0103C7.0332 17.691 7.14095 17.4238 7.35645 17.2085C7.5717 16.993 7.83895 16.8853 8.1582 16.8853H25.2237L17.4698 9.13139C17.2468 8.90839 17.1367 8.64739 17.1395 8.34839C17.1425 8.04939 17.2602 7.78352 17.4927 7.55077C17.7255 7.33352 17.989 7.22102 18.2832 7.21327C18.5775 7.20552 18.841 7.31802 19.0737 7.55077L28.5841 17.0611C28.7246 17.2016 28.8236 17.3498 28.8811 17.5055C28.9388 17.6613 28.9677 17.8295 28.9677 18.0103C28.9677 18.191 28.9388 18.3593 28.8811 18.515C28.8236 18.6708 28.7246 18.8189 28.5841 18.9594L19.0737 28.4698C18.866 28.6775 18.6087 28.7838 18.302 28.7885C17.9952 28.7933 17.7255 28.687 17.4927 28.4698C17.2602 28.237 17.144 27.9698 17.144 27.668C17.144 27.366 17.2602 27.0986 17.4927 26.8659L25.2237 19.1353Z"
            fill="white"
        />
    </svg>
);
