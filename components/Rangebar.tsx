import { useEffect, useRef, useState } from "react";

type RangebarValue = [number, number];

export type RangebarProps = {
    label?: string;
    min: number;
    max: number;
    step?: number;
    value: RangebarValue;
    onChange: (value: RangebarValue) => void;
    unit?: string; // e.g. "kHz", "mm"
    disabled?: boolean;
    smooth?: boolean; // apply smooth transition
    className?: string;
    formatValue?: (value: number) => string;
    parseValue?: (text: string) => number;
};

export default function Rangebar({
    label,
    min,
    max,
    step = 1,
    value,
    onChange,
    unit,
    disabled,
    smooth = true,
    className,
    formatValue,
    parseValue,
}: RangebarProps) {
    const [local, setLocal] = useState<RangebarValue>(value);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const draggingRef = useRef<null | "min" | "max">(null);

    useEffect(() => {
        setLocal(value);
    }, [value[0], value[1]]);

    const clamp = (v: number) => Math.min(max, Math.max(min, v));
    const snapToStep = (v: number) => {
        const snapped = Math.round((v - min) / step) * step + min;
        return clamp(snapped);
    };

    const handleMinChange = (next: number) => {
        const clamped = snapToStep(Math.min(next, local[1]));
        const updated: RangebarValue = [clamped, local[1]];
        setLocal(updated);
        onChange(updated);
    };

    const handleMaxChange = (next: number) => {
        const clamped = snapToStep(Math.max(next, local[0]));
        const updated: RangebarValue = [local[0], clamped];
        setLocal(updated);
        onChange(updated);
    };

    const displayed = (n: number) => (typeof formatValue === "function" ? formatValue(n) : String(Math.round(n)));

    const parsed = (t: string) => {
        if (typeof parseValue === "function") return parseValue(t);
        // Default: strip non-number except dot and minus
        const cleaned = t.replace(/[^0-9.-]/g, "");
        const num = Math.round(Number(cleaned));
        return Number.isFinite(num) ? num : 0;
    };

    // Compute filled track position in %
    const range = max - min;
    const leftPercent = ((local[0] - min) / range) * 100;
    const rightPercent = ((local[1] - min) / range) * 100;

    return (
        <div className={className}>
            {label && <div className="mb-4 text-base leading-6 font-semibold text-g950">{label}</div>}

            {/* Slider */}
            <div className="relative h-6 select-none">
                {/* Base track */}
                <div ref={trackRef} className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded bg-g200" />
                {/* Active range */}
                <div
                    className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-ePrimary"
                    style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
                />
                {/* Click/drag overlay to move nearest thumb */}
                <div
                    className="absolute left-0 top-0 h-6 w-full cursor-pointer z-0"
                    onPointerDown={(e) => {
                        if (!trackRef.current) return;
                        const rect = trackRef.current.getBoundingClientRect();
                        const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                        const val = snapToStep(min + ratio * range);
                        const distMin = Math.abs(val - local[0]);
                        const distMax = Math.abs(val - local[1]);
                        const target: "min" | "max" = distMin <= distMax ? "min" : "max";
                        draggingRef.current = target;
                        if (target === "min") {
                            handleMinChange(val);
                        } else {
                            handleMaxChange(val);
                        }
                        const handleMove = (ev: PointerEvent) => {
                            if (!trackRef.current || !draggingRef.current) return;
                            const r = trackRef.current.getBoundingClientRect();
                            const rr = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
                            const v = snapToStep(min + rr * range);
                            if (draggingRef.current === "min") {
                                handleMinChange(v);
                            } else {
                                handleMaxChange(v);
                            }
                        };
                        const handleUp = () => {
                            draggingRef.current = null;
                            window.removeEventListener("pointermove", handleMove);
                            window.removeEventListener("pointerup", handleUp);
                            window.removeEventListener("pointercancel", handleUp);
                        };
                        window.addEventListener("pointermove", handleMove);
                        window.addEventListener("pointerup", handleUp);
                        window.addEventListener("pointercancel", handleUp);
                    }}
                />
                {/* Min thumb */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={local[0]}
                    disabled={disabled}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className={`absolute left-0 top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:relative z-10 ${
                        smooth ? "transition-all" : ""
                    }`}
                    aria-label={label ? `${label} minimum` : "minimum"}
                />
                {/* Max thumb */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={local[1]}
                    disabled={disabled}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className={`absolute left-0 top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:relative z-10 ${
                        smooth ? "transition-all" : ""
                    }`}
                    aria-label={label ? `${label} maximum` : "maximum"}
                />
            </div>

            {/* Inputs */}
            <div className="mt-5 grid grid-cols-2 gap-2">
                <div>
                    <div className="mb-1 text-sm text-g400 px-1">Min</div>
                    <div className="w-full h-9 rounded-sm border border-g200 bg-white px-3 py-2 flex items-center gap-2 min-w-0">
                        <input
                            type="text"
                            inputMode="numeric"
                            className="min-w-0 flex-1 h-5 text-right text-sm text-g950 outline-none"
                            value={displayed(local[0])}
                            onChange={(e) => setLocal([snapToStep(parsed(e.target.value)), local[1]])}
                            onBlur={(e) => handleMinChange(parsed(e.target.value))}
                            disabled={disabled}
                        />
                        {unit && <span className="pointer-events-none text-sm text-g400">{unit}</span>}
                    </div>
                </div>
                <div>
                    <div className="mb-1 text-sm text-g400 px-1">Max</div>
                    <div className="w-full h-9 rounded-sm border border-g200 bg-white px-3 py-2 flex items-center gap-2 min-w-0">
                        <input
                            type="text"
                            inputMode="numeric"
                            className="min-w-0 flex-1 h-5 text-right text-sm text-g950 outline-none"
                            value={displayed(local[1])}
                            onChange={(e) => setLocal([local[0], snapToStep(parsed(e.target.value))])}
                            onBlur={(e) => handleMaxChange(parsed(e.target.value))}
                            disabled={disabled}
                        />
                        {unit && <span className="pointer-events-none text-sm text-g400">{unit}</span>}
                    </div>
                </div>
            </div>

            {/* Slider styles (scoped) */}
            <style jsx>{`
                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    pointer-events: none;
                }
                input[type="range"]::-webkit-slider-runnable-track {
                    height: 0;
                }
                input[type="range"]::-moz-range-track {
                    height: 0;
                    background: transparent;
                }
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 9999px;
                    background: white; /* rose-600 */
                    border: 4px solid #e83837; /* rose-300 ring-like edge */
                    cursor: pointer;
                    box-shadow: none;
                    margin-top: -10px; /* align to custom track */
                    pointer-events: auto;
                }
                input[type="range"]::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 9999px;
                    background: white;
                    border: 4px solid #e83837;
                    cursor: pointer;
                    box-shadow: none;
                    pointer-events: auto;
                }
            `}</style>
        </div>
    );
}
