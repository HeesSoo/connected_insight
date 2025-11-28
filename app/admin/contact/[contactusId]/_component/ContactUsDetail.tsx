"use client";

import { ContactUs } from "../../page";
import { useRouter } from "next/navigation";

export default function ContactUsDetail({ data }: { data: ContactUs | null }) {
    console.log("ContactUsDetail data:", data);
    const router = useRouter();

    if (!data) {
        return (
            <div className="min-h-screen">
                <div className="max-w-[1440px] mx-auto p-8">
                    <div className="text-center py-12">
                        <p className="text-base text-g400">
                            문의 내역을 찾을 수 없습니다.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-g50">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-title font-semibold text-g950 mb-2">
                        시스템 문의
                    </h1>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    {/* Status Badge */}
                    <div className="mb-6">
                        <span className="inline-block px-4 py-2 bg-ePrimary text-white text-small rounded">
                            접수완료
                        </span>
                    </div>

                    {/* Title & Date */}
                    <div className="flex justify-between items-start mb-4 pb-6 border-b border-g600">
                        <div className="flex-1 flex gap-2 items-center">
                            <div className="text-lg text-g700">시스템 문의</div>
                            <div className="w-[1px] h-4 bg-g200 mx-1"></div>
                            <div className="text-lg font-semibold text-g950">
                                {data.content}
                            </div>
                        </div>
                        <div className="text-base text-g400 ml-4">
                            {data.updated_at.slice(0, 10)}
                        </div>
                    </div>

                    {/* Files Section */}
                    {data.file && data.file.s3_url && (
                        <div className="mb-8 pb-4 border-b border-g200">
                            <div className="flex gap-3">
                                <a
                                    href={data.file.s3_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-g100 text-g700 text-small rounded hover:bg-g200 transition-colors"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14 10v2.667A1.333 1.333 0 0 1 12.667 14H3.333A1.333 1.333 0 0 1 2 12.667V10m2.667-4L8 9.333m0 0L11.333 6M8 9.333V2"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    {data.file.name}
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-4">{data.content}</div>
                </div>

                {/* Reply Section */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-large font-semibold text-g950">
                            운영 관리자
                        </h3>
                        <span className="text-base text-g400">
                            {data.updated_at.slice(0, 10)}
                        </span>
                    </div>
                    <p className="text-base text-g700 mb-4">
                        문의주신 내용에 대해서 답변드립니다.
                    </p>
                    <p className="text-base text-g700">감사합니다.</p>
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => router.push("/admin/contact")}
                        className="px-32 py-3 text-white text-base rounded bg-ePrimary hover:bg-ePrimary/90 transition-colors"
                    >
                        목록
                    </button>
                </div>
            </div>
        </div>
    );
}
