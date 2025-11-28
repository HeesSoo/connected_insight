"use client";

import Image from "next/image";
import case1 from "@/public/solutions/cis-application/cis_case_1.png";
import Button from "@/components/Button";

const Support: React.FC = () => {
    return (
        <div className="w-full px-8">
            <div className="w-full max-w-[1440px] pt-[120px] pb-[160px] mx-auto text-g950">
                {/* Main Image */}
                <Image
                    src={case1}
                    alt="Main Case"
                    width={1440}
                    height={420}
                    className="w-full h-[420px]"
                />

                {/* EYEON Vision */}
                <div className="mt-12 w-full flex mb-[160px]">
                    <div className="mr-[137px] w-[591px]">
                        <h3 className="mb-2 text-h3 font-bold">
                            EYEON Vision & Robotics Lab
                        </h3>
                        <div className="text-titleSmall font-bold">
                            핵심 컴포넌트 기술을 경험하는 공간
                        </div>
                    </div>

                    <div className="text-large font-[500]">
                        주식회사 아이온은 산업 자동화의 핵심이 되는&nbsp;
                        <span className="text-ePrimary font-[600]">
                            머신비전 CIS카메라와
                        </span>
                        <br />
                        <span className="text-ePrimary font-[600]">
                            고성능 리니어 액츄에이터 컴포넌트
                        </span>
                        를 전문적으로 공급하는 기업입니다.
                        <br />
                        저희의 기술력이 집약된 공간, EYEON Vision & Robotics
                        Lab을 소개합니다.
                        <br />
                        <br />
                        이곳은 고객 여러분이 저희 컴포넌트의 실제 성능과 적용
                        가능성을 직접 확인하고,
                        <br />
                        최적의 시스템 구축 방안을 논의할 수 있도록 조성된{" "}
                        <span className="text-ePrimary font-[600]">
                            기술 시연 및 협력 허브
                        </span>
                        입니다.
                    </div>
                </div>

                {/* 컴포넌트 연구 파트 */}
                <div className="w-full flex mb-[160px]">
                    <div className="mr-[137px] w-[591px] h-[520px] bg-black"></div>
                    <div className="flex-1 h-auto flex flex-col justify-between">
                        <div>
                            <h3 className="text-h3 font-bold mb-2">
                                VISION 컴포넌트 연구 파트
                            </h3>
                            <div className="text-large font-[500] mb-5">
                                이 파트에서는 저희가 먼저 취급하는 머신비전
                                카메라 및 관련 광학 컴포넌트의 성능과
                                <br />
                                최신 기술 동향을 체험할 수 있습니다.
                            </div>
                            <Button
                                label="Go to Products"
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
                                onClick={() => {}}
                            />
                        </div>

                        <div>
                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="bg-g50 p-4">
                                    <h5 className="text-base font-semibold text-ePrimary mb-3">
                                        다양한 산업용 카메라 시연
                                    </h5>
                                    <div className="text-base font-[500] text-g800">
                                        고해상도, 고속, 특수 파장 대역 등 산업
                                        현장의 요구에 맞는 다양한 비전 카메라
                                        제품군을 전시하고 성능을 시연합니다.
                                    </div>
                                </div>
                                <div className="bg-g50 p-4">
                                    <h5 className="text-base font-semibold text-ePrimary mb-3">
                                        컴포넌트별 성능 비교
                                    </h5>
                                    <div className="text-base font-[500] text-g800">
                                        고객사 환경에 적합한 최적의 카메라와
                                        렌즈 조합을 찾을 수 있도록, 실시간으로
                                        이미지 품질, 속도, 정밀도 등을 비교하여
                                        보여드립니다.
                                    </div>
                                </div>
                            </div>

                            <div className="bg-g50 p-4 mt-4">
                                <h5 className="text-base font-semibold text-ePrimary mb-3">
                                    통합 솔루션 구상
                                </h5>
                                <div className="text-base font-[500] text-g800">
                                    고객이 보유한 시스템에 저희 비전 컴포넌트가
                                    어떻게 통합되어야 가장 높은 효율을 낼 수
                                    있는지,
                                    <br />
                                    기술 전문가와 함께 구체적인 적용 방안을
                                    협의할 수 있습니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 데모 스테이션 */}
                <div className="w-full flex mb-[160px]">
                    <div className="mr-[137px] w-[591px] h-[520px] bg-black"></div>
                    <div className="flex-1 h-auto flex flex-col justify-between">
                        <div>
                            <h3 className="text-h3 font-bold mb-2">
                                Linear Actuator 데모 스테이션
                            </h3>
                            <div className="text-large font-[500] mb-5">
                                자동화 시스템의 움직임을 담당하는 리니어
                                액츄에이터 컴포넌트를 직접 구동해보고,
                                <br />그 정밀도를 확인할 수 있는 공간입니다.
                            </div>
                            <Button
                                label="Go to Linear Actuator"
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
                                            d="M16.145 7.80375L6.8123 17.127C6.6738 17.2653 6.4998 17.3329 6.2903 17.3298C6.08063 17.3266 5.90655 17.2558 5.76805 17.1173C5.62971 16.9788 5.56055 16.8063 5.56055 16.6C5.56055 16.3937 5.62971 16.2213 5.76805 16.0828L15.0913 6.75H6.89505C6.68255 6.75 6.50438 6.67808 6.36055 6.53425C6.21688 6.39042 6.14505 6.21225 6.14505 5.99975C6.14505 5.78708 6.21688 5.609 6.36055 5.4655C6.50438 5.32183 6.68255 5.25 6.89505 5.25H16.741C16.9972 5.25 17.2119 5.33658 17.385 5.50975C17.5584 5.68308 17.645 5.89775 17.645 6.15375V16C17.645 16.2125 17.5731 16.3906 17.4293 16.5343C17.2855 16.6781 17.1073 16.75 16.8948 16.75C16.6821 16.75 16.504 16.6781 16.3603 16.5343C16.2168 16.3906 16.145 16.2125 16.145 16V7.80375Z"
                                            fill="white"
                                        />
                                    </svg>
                                }
                                onClick={() => {}}
                            />
                        </div>

                        <div>
                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="bg-g50 p-4">
                                    <h5 className="text-base font-semibold text-ePrimary mb-3">
                                        산업용 액츄에이터 실물 전시 및 데모
                                    </h5>
                                    <div className="text-base font-[500] text-g800">
                                        저희가 공급하는 다양한 종류의 리니어
                                        액츄에이터(예: 볼스크류, 리니어 모터 등)
                                        제품의 정밀하고 빠른 동작 데모를 직접
                                        체험하실 수 있습니다.
                                    </div>
                                </div>
                                <div className="bg-g50 p-4">
                                    <h5 className="text-base font-semibold text-ePrimary mb-3">
                                        기술 컨설팅
                                    </h5>
                                    <div className="text-base font-[500] text-g800">
                                        자동화 장비의 설계 단계에서 최적의
                                        리니어 액츄에이터 컴포넌트를 선택하고
                                        시스템에 통합하는 방법에 대해 심도 있는
                                        기술 컨설팅을 제공합니다.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 방문 예약 안내 */}
                <div className="w-full h-[464px] mx-auto relative mb-[80px]">
                    <div className="absolute w-full h-[464px] py-12 flex flex-col text-white text-center">
                        <h3 className="mb-3 text-h3 font-bold">
                            방문 예약 안내
                        </h3>

                        <div className="text-g200 text-large font-[500] mb-12">
                            EYEON Lab 방문을 예약하시고, VISION 기술을
                            경험해보세요.
                        </div>

                        <div className="mx-auto flex gap-8 items-center mb-12">
                            <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold">
                                방문예약
                            </div>
                            <ArrowIco />
                            <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold">
                                영업팀 상담
                            </div>
                            <ArrowIco />
                            <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold">
                                랩 방문
                            </div>
                            <ArrowIco />
                            <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold">
                                Test 진행
                            </div>
                            <ArrowIco />
                            <div className="w-[140px] h-[140px] rounded-full bg-white text-g950 flex items-center justify-center text-large font-bold">
                                Test
                                <br />
                                결과 안내
                            </div>
                        </div>

                        <Button
                            label="Contact"
                            size="medium"
                            btnType="white"
                            className="w-fit mx-auto"
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
                                        fill="#111111"
                                    />
                                </svg>
                            }
                            onClick={() => {}}
                        />
                    </div>
                    <div className="w-full h-[464px] bg-black"></div>
                </div>
            </div>
        </div>
    );
};

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

export default Support;
