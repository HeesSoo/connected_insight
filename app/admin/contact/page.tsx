"use client";

import { useState } from "react";
import Button from "@/components/Button";

// Sample data type
interface ContactHistory {
    id: number;
    name: string;
    email: string;
    contact: string;
    content: string;
    date: string;
    status: "pending" | "completed" | "in_progress";
}

// Sample data
const sampleData: ContactHistory[] = [
    {
        id: 1,
        name: "김철수",
        email: "kim@example.com",
        contact: "010-1234-5678",
        content: "제품 견적 문의드립니다.",
        date: "2024-10-15",
        status: "pending",
    },
    {
        id: 2,
        name: "이영희",
        email: "lee@example.com",
        contact: "010-2345-6789",
        content: "비전 소프트웨어 도입 상담 요청",
        date: "2024-10-14",
        status: "in_progress",
    },
    {
        id: 3,
        name: "박민수",
        email: "park@example.com",
        contact: "010-3456-7890",
        content: "기술 지원 문의",
        date: "2024-10-13",
        status: "completed",
    },
];

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

export default function ContactHistory() {
    const [contacts, setContacts] = useState<ContactHistory[]>(sampleData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleViewDetail = (id: number) => {
        // TODO: Implement detail view
        console.log("View detail:", id);
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">Contact Us History</h1>
                    <p className="text-base text-g400">고객 문의 내역을 관리하세요</p>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-g950 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-base font-semibold">번호</th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">이름</th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">이메일</th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">연락처</th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">문의 내용</th>
                                    <th className="px-6 py-4 text-left text-base font-semibold">날짜</th>
                                    <th className="px-6 py-4 text-center text-base font-semibold">액션</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-g200">
                                {contacts.length > 0 ? (
                                    contacts.map((contact, index) => (
                                        <tr key={contact.id} className="hover:bg-g50 transition-colors">
                                            <td className="px-6 py-4 text-base text-g700">{index + 1}</td>
                                            <td className="px-6 py-4 text-base text-g900 font-medium">{contact.name}</td>
                                            <td className="px-6 py-4 text-base text-g700">{contact.email}</td>
                                            <td className="px-6 py-4 text-base text-g700">{contact.contact}</td>
                                            <td className="px-6 py-4 text-base text-g700 max-w-[300px] truncate">{contact.content}</td>
                                            <td className="px-6 py-4 text-base text-g700">{contact.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleViewDetail(contact.id)}
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
                                        <td colSpan={8} className="px-6 py-12 text-center text-base text-g400">
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
