"use client";

export default function AdminDashboard() {
    const stats = [
        { label: "총 제품", value: "24", color: "bg-ePrimary" },
        { label: "문의 내역", value: "156", color: "bg-g950" },
        { label: "대기중 문의", value: "8", color: "bg-g400" },
        { label: "금주 신규 문의", value: "12", color: "bg-ePrimary" },
    ];

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">대시보드</h1>
                    <p className="text-base text-g400">관리자 페이지에 오신 것을 환영합니다</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-ePrimary">
                            <h3 className="text-small text-g400 font-medium mb-2">{stat.label}</h3>
                            <p className="text-titleXl font-bold text-g950">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-titleSmall font-semibold text-g950 mb-6">빠른 실행</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a
                            href="/admin/products/create"
                            className="p-6 border-2 border-g200 rounded-lg hover:border-ePrimary transition-colors group"
                        >
                            <div className="text-large font-semibold text-g950 mb-2 group-hover:text-ePrimary">제품 생성</div>
                            <p className="text-base text-g400">새로운 제품을 등록합니다</p>
                        </a>
                        <a
                            href="/admin/contact/history"
                            className="p-6 border-2 border-g200 rounded-lg hover:border-ePrimary transition-colors group"
                        >
                            <div className="text-large font-semibold text-g950 mb-2 group-hover:text-ePrimary">문의 내역</div>
                            <p className="text-base text-g400">고객 문의를 확인합니다</p>
                        </a>
                        <a
                            href="/admin/products"
                            className="p-6 border-2 border-g200 rounded-lg hover:border-ePrimary transition-colors group"
                        >
                            <div className="text-large font-semibold text-g950 mb-2 group-hover:text-ePrimary">제품 관리</div>
                            <p className="text-base text-g400">제품 목록을 관리합니다</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
