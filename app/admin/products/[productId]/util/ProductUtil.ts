import { useInput } from "@/hooks/hooks";
import { useState } from "react";

export const convertToCisWrap = (initialData: Record<string, any>) => {
    return {
        // 텍스트 필드
        uuid: useInput(initialData?.uuid || "") || undefined,
        name: useInput(initialData?.name || "") || undefined,
        mono_or_color: useInput(initialData?.mono_or_color || "") || undefined,
        interface: useInput(initialData?.interface || "") || undefined,
        type: useInput(initialData?.type || "") || undefined,
        // url: useInput(initialData?.url || "") || undefined,
        // description_ko: useInput(initialData?.description_ko || "") || undefined,
        // description_en: useInput(initialData?.description_en || "") || undefined,

        // 숫자 필드
        fov: useInput(initialData?.fov || "") || undefined,
        resolution: useInput(initialData?.resolution || "") || undefined,
        dof: useInput(initialData?.dof || "") || undefined,
        wd: useInput(initialData?.wd || "") || undefined,
        line_rate: useInput(initialData?.line_rate || "") || undefined,
        ws: useInput(initialData?.ws || "") || undefined,
        ethernet_port: useInput(initialData?.ethernet_port || "") || undefined,
        pixel: useInput(initialData?.pixel || "") || undefined,
        size_width: useInput(initialData?.size_width || "") || undefined,
        size_length: useInput(initialData?.size_length || "") || undefined,
        size_height: useInput(initialData?.size_height || "") || undefined,
        accuracy: useInput(initialData?.accuracy || "") || undefined,
        // index: useInput(initialData?.index || 0) || undefined,
    };
}

export const convertToExternalWrap = (initialData: Record<string, any>) => {
    return {
        // 텍스트 필드
        uuid: useInput(initialData?.uuid || "") || undefined,
        name: useInput(initialData?.name || "") || undefined,
        type: useInput(initialData?.type || "") || undefined,
        url: useInput(initialData?.url || "") || undefined,
        description_ko: useInput(initialData?.description_ko || "") || undefined,
        description_en: useInput(initialData?.description_en || "") || undefined,

        // 숫자 필드
        index: useInput(initialData?.index || 0) || undefined,

        // 파일 배열 필드
        file: useState<File>(initialData?.thumbnail || undefined),
    };
}