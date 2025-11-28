"use client";

import { useState } from "react";
import { ContactUs } from "../page";
import { useRouter } from "next/navigation";

const statusText = {
    pending: "대기중",
    in_progress: "진행중",
    completed: "완료",
};

const statusColor = {
    pending: "bg-g400 text-white",
    in_progress: "bg-ePrimary text-white",
    completed: "bg-g950 text-white",
};

export default function ContactUsList({ data }: { data: ContactUs[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const router = useRouter();

    const handleViewDetail = (id: string) => {
        router.push(`/admin/contact/${id}`);
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">
                        Contact Us History
                    </h1>
                    <p className="text-base text-g400">
                        고객 문의 내역을 관리하세요
                    </p>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-g950 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-base font-semibold">
                                        번호
                                    </th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">
                                        이름
                                    </th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">
                                        이메일
                                    </th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">
                                        연락처
                                    </th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">
                                        문의 내용
                                    </th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">
                                        날짜
                                    </th>
                                    <th className="px-6 py-4 text-center text-base font-semibold">
                                        액션
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-g200">
                                {data.length > 0 ? (
                                    data.map((contact, index) => (
                                        <tr
                                            key={contact.uuid}
                                            className="hover:bg-g50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-base text-g700">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-base text-g900 font-medium">
                                                {contact.name}
                                            </td>
                                            <td className="px-6 py-4 text-base text-g700">
                                                {contact.email}
                                            </td>
                                            <td className="px-6 py-4 text-base text-g700">
                                                {contact.contact}
                                            </td>
                                            <td className="px-6 py-4 text-base text-g700 max-w-[300px] truncate">
                                                {contact.content}
                                            </td>
                                            <td className="px-6 py-4 text-base text-g700">
                                                {contact.updated_at.slice(
                                                    0,
                                                    10
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleViewDetail(
                                                                contact.uuid
                                                            )
                                                        }
                                                        className="px-3 py-1 bg-g950 text-white text-small rounded-[2px] hover:bg-ePrimary transition-colors"
                                                    >
                                                        상세보기
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-6 py-12 text-center text-base text-g400"
                                        >
                                            문의 내역이 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
