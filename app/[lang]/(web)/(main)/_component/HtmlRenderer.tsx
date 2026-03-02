'use client';

import { useEffect, useRef, useState } from 'react';

interface HtmlRendererProps {
    src?: string;
    html?: string;
}

function parseHtml(raw: string): string {
    let html = raw.trim();

    // 백엔드에서 이중 인코딩된 경우 디코딩
    // JSON 스타일: "\"<!DOCTYPE html>...\""
    // CSV/SQL 스타일: "<!DOCTYPE html>...class=""container"" ..."
    if (html.startsWith('"') && html.endsWith('"')) {
        try {
            html = JSON.parse(html);
        } catch {
            // JSON 파싱 실패 → CSV/SQL 스타일 처리: 바깥 따옴표 제거 + "" → "
            html = html.slice(1, -1).replace(/""/g, '"');
        }
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const styles = Array.from(doc.querySelectorAll('style'))
        .map((el) => el.outerHTML.replace(/:root/g, ':host'))
        .join('');
    return styles + doc.body.innerHTML;
}

export default function HtmlRenderer({ src, html: htmlProp }: HtmlRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState('');

    // html prop이 바뀌면 파싱해서 적용
    useEffect(() => {
        if (htmlProp !== undefined) {
            setContent(parseHtml(htmlProp));
        }
    }, [htmlProp]);

    // src prop이 바뀌면 fetch 후 파싱해서 적용
    useEffect(() => {
        if (!src) return;
        fetch(src)
            .then((res) => res.text())
            .then((text) => setContent(parseHtml(text)))
            .catch((err) => console.error('HtmlRenderer fetch error:', err));
    }, [src]);

    // content가 바뀌면 Shadow DOM에 주입
    useEffect(() => {
        const el = containerRef.current;
        if (!el || !content) return;

        const shadow = el.shadowRoot ?? el.attachShadow({ mode: 'open' });
        shadow.innerHTML = content;
    }, [content]);

    if (!content) return null;

    return <div ref={containerRef} />;
}
