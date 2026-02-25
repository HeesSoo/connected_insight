'use client';

import { useEffect, useState } from 'react';

interface HtmlRendererProps {
    src: string;
}

export default function HtmlRenderer({ src }: HtmlRendererProps) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        fetch(src)
            .then((res) => res.text())
            .then((text) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');

                const styles = Array.from(doc.querySelectorAll('style'))
                    .map((el) => el.outerHTML)
                    .join('');

                setHtml(styles + doc.body.innerHTML);
            })
            .catch((err) => console.error('HtmlRenderer fetch error:', err));
    }, [src]);

    if (!html) return null;

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
