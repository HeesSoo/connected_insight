"use client";

import DownloadButton from "@/components/DownloadButton";
import { ProductDetail } from "./ProductDetailClient";

const formatDateToYYMMDD = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = String(d.getFullYear()).slice(-2);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
};

const type = {
    'drawing': 'Drawing',
    'manual': 'Manual',
    'catalog': 'Catalog',
    'sdk': 'SDK',
    'etc': 'ETC',
}

export default function ProductDownloads({ data }: { data: ProductDetail }) {
    const downloadNames = ['drawing', 'manual', 'catalog', 'sdk', 'etc'];

    const downloadMap = downloadNames.map(name => data[name] || null);
    
    return (
        <div className="w-full flex mt-[80px]">
            <h2 className="flex-1 pl-9 text-title font-bold text-g950">Documents</h2>
            <div className="w-[955px] flex flex-col gap-6">
                {downloadMap.map((v, index) => {
                    return (
                        v ?
                        (<div key={index} className="w-full flex justify-between items-center pb-6 border-b border-g200">
                            <div>
                                <div className="text-sm font-medium text-g400 mb-1">{formatDateToYYMMDD(v.created_at)} Updated</div>
                                <h3 className="text-large font-bold text-g950">{type[v.type]}</h3>
                            </div>
                            <DownloadButton file={{ url: v.s3_url, name: v.name }} />
                        </div>)
                        : null
                    );
                })}
            </div>
        </div>
    );
}
