"use client";

import { useState } from "react";
import {
    CisData,
    LingchenData,
    TokkData,
} from "@/app/[lang]/(web)/product/_component/ProductListClient";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

type TabType = "cis" | "lingchen" | "tokk";

export default function ProductList({
    initialData,
}: {
    initialData: {
        cis?: CisData[];
        lingchen?: LingchenData[];
        tokk?: TokkData[];
    };
}) {
    const [activeTab, setActiveTab] = useState<TabType>("cis");
    const router = useRouter();

    const handleEdit = (uuid: string) => {
        console.log("Edit product:", uuid);
        // TODO: Navigate to edit page
        // router.push(`/admin/products/edit/${uuid}`);
    };

    const handleDelete = (uuid: string) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            console.log("Delete product:", uuid);
            // TODO: Implement delete logic
        }
    };

    const handleCreate = () => {
        router.push("/admin/products/create");
    };

    const renderCisTable = (data: CisData[]) => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-g950 text-white">
                    <tr>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            번호
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            제품명
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            타입
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            해상도
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            FOV
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            WD
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            Line Rate
                        </th>
                        <th className="px-6 py-4 text-center text-base font-semibold">
                            액션
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-g200">
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={item.uuid}
                                className="hover:bg-g50 transition-colors"
                            >
                                <td className="px-6 py-4 text-base text-g700">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 text-base text-g900 font-medium">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 text-base text-g700">
                                    {item.type}
                                </td>
                                <td className="px-6 py-4 text-base text-g700">
                                    {item.resolution}
                                </td>
                                <td className="px-6 py-4 text-base text-g700">
                                    {item.fov}
                                </td>
                                <td className="px-6 py-4 text-base text-g700">
                                    {item.wd}
                                </td>
                                <td className="px-6 py-4 text-base text-g700">
                                    {item.line_rate}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                handleEdit(item.uuid)
                                            }
                                            className="px-3 py-1 bg-ePrimary text-white text-small rounded-[2px] hover:bg-opacity-80 transition-colors"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.uuid)
                                            }
                                            className="px-3 py-1 bg-g400 text-white text-small rounded-[2px] hover:bg-opacity-80 transition-colors"
                                        >
                                            삭제
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
                                등록된 제품이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const renderLingchenTable = (data: LingchenData[]) => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-g950 text-white">
                    <tr>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            번호
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            제품명
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            타입
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            URL
                        </th>
                        <th className="px-6 py-4 text-center text-base font-semibold">
                            액션
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-g200">
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={item.uuid}
                                className="hover:bg-g50 transition-colors"
                            >
                                <td className="px-6 py-4 text-base text-g700">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 text-base text-g900 font-medium">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 text-base text-g700">
                                    {item.type}
                                </td>
                                <td className="px-6 py-4 text-base text-g700 max-w-[300px] truncate">
                                    {(item as any).url || "-"}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                handleEdit(item.uuid)
                                            }
                                            className="px-3 py-1 bg-ePrimary text-white text-small rounded-[2px] hover:bg-opacity-80 transition-colors"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.uuid)
                                            }
                                            className="px-3 py-1 bg-g400 text-white text-small rounded-[2px] hover:bg-opacity-80 transition-colors"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-6 py-12 text-center text-base text-g400"
                            >
                                등록된 제품이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const renderTokkTable = (data: TokkData[]) => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-g950 text-white">
                    <tr>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            번호
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            제품명
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            타입
                        </th>
                        <th className="px-6 py-4 text-left text-base font-semibold">
                            URL
                        </th>
                        <th className="px-6 py-4 text-center text-base font-semibold">
                            액션
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-g200">
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={item.uuid}
                                className="hover:bg-g50 transition-colors"
                            >
                                <td className="px-6 py-4 text-base text-g700">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 text-base text-g900 font-medium">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 text-base text-g700">
                                    {item.type}
                                </td>
                                <td className="px-6 py-4 text-base text-g700 max-w-[300px] truncate">
                                    {(item as any).url || "-"}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                handleEdit(item.uuid)
                                            }
                                            className="px-3 py-1 bg-ePrimary text-white text-small rounded-[2px] hover:bg-opacity-80 transition-colors"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.uuid)
                                            }
                                            className="px-3 py-1 bg-g400 text-white text-small rounded-[2px] hover:bg-opacity-80 transition-colors"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-6 py-12 text-center text-base text-g400"
                            >
                                등록된 제품이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-title font-semibold text-g950 mb-2">
                            제품 관리
                        </h1>
                        <p className="text-base text-g400">
                            제품을 관리하고 수정하세요
                        </p>
                    </div>
                    <Button
                        label="제품 생성"
                        onClick={handleCreate}
                        btnType="secondary"
                        size="medium"
                        className="px-6"
                    />
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex gap-2 border-b border-g200">
                        <button
                            onClick={() => setActiveTab("cis")}
                            className={`px-6 py-3 text-base font-semibold transition-colors relative ${
                                activeTab === "cis"
                                    ? "text-ePrimary"
                                    : "text-g400 hover:text-g700"
                            }`}
                        >
                            CIS
                            {activeTab === "cis" && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-ePrimary" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("lingchen")}
                            className={`px-6 py-3 text-base font-semibold transition-colors relative ${
                                activeTab === "lingchen"
                                    ? "text-ePrimary"
                                    : "text-g400 hover:text-g700"
                            }`}
                        >
                            LINGCHEN
                            {activeTab === "lingchen" && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-ePrimary" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("tokk")}
                            className={`px-6 py-3 text-base font-semibold transition-colors relative ${
                                activeTab === "tokk"
                                    ? "text-ePrimary"
                                    : "text-g400 hover:text-g700"
                            }`}
                        >
                            TOKK
                            {activeTab === "tokk" && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-ePrimary" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {activeTab === "cis" &&
                        renderCisTable(initialData.cis || [])}
                    {activeTab === "lingchen" &&
                        renderLingchenTable(initialData.lingchen || [])}
                    {activeTab === "tokk" &&
                        renderTokkTable(initialData.tokk || [])}
                </div>
            </div>
        </div>
    );
}
