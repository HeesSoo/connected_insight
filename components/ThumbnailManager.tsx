"use client";

import { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export interface ThumbnailItem {
    uuid?: string; // 기존 이미지 UUID
    order: number;
    s3_url?: string; // 미리보기용
    file?: File; // 새 업로드 파일
    file_index?: number; // 백엔드 전송용
}

interface ThumbnailManagerProps {
    thumbnails: ThumbnailItem[];
    onChange: (thumbnails: ThumbnailItem[]) => void;
    maxCount?: number;
}

function SortableItem({
    item,
    onRemove,
}: {
    item: ThumbnailItem;
    onRemove: () => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: item.uuid });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // 미리보기 URL 생성
    const previewUrl = item.s3_url || (item.file ? URL.createObjectURL(item.file) : "");

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative group bg-white border-2 border-g200 rounded-lg overflow-hidden hover:border-ePrimary transition-colors cursor-grab active:cursor-grabbing"
        >
            {/* 순서 표시 */}
            <div className="absolute top-2 left-2 bg-g950 text-white text-xs font-semibold px-2 py-1 rounded z-1 pointer-events-none">
                {item.order + 1}
            </div>

            {/* 드래그 아이콘 표시 */}
            <div className="absolute top-2 right-2 bg-white/90 p-2 rounded z-1 pointer-events-none">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 3.5C6 4.05228 5.55228 4.5 5 4.5C4.44772 4.5 4 4.05228 4 3.5C4 2.94772 4.44772 2.5 5 2.5C5.55228 2.5 6 2.94772 6 3.5Z"
                        fill="#374151"
                    />
                    <path
                        d="M12 3.5C12 4.05228 11.5523 4.5 11 4.5C10.4477 4.5 10 4.05228 10 3.5C10 2.94772 10.4477 2.5 11 2.5C11.5523 2.5 12 2.94772 12 3.5Z"
                        fill="#374151"
                    />
                    <path
                        d="M6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8Z"
                        fill="#374151"
                    />
                    <path
                        d="M12 8C12 8.55228 11.5523 9 11 9C10.4477 9 10 8.55228 10 8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8Z"
                        fill="#374151"
                    />
                    <path
                        d="M6 12.5C6 13.0523 5.55228 13.5 5 13.5C4.44772 13.5 4 13.0523 4 12.5C4 11.9477 4.44772 11.5 5 11.5C5.55228 11.5 6 11.9477 6 12.5Z"
                        fill="#374151"
                    />
                    <path
                        d="M12 12.5C12 13.0523 11.5523 13.5 11 13.5C10.4477 13.5 10 13.0523 10 12.5C10 11.9477 10.4477 11.5 11 11.5C11.5523 11.5 12 11.9477 12 12.5Z"
                        fill="#374151"
                    />
                </svg>
            </div>

            {/* 삭제 버튼 */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors z-2 opacity-0 group-hover:opacity-100 pointer-events-auto"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2 4H14M5.333 4V2.667C5.333 2.298 5.631 2 6 2H10C10.369 2 10.667 2.298 10.667 2.667V4M12.667 4V13.333C12.667 13.702 12.369 14 12 14H4C3.631 14 3.333 13.702 3.333 13.333V4H12.667Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* 이미지 미리보기 */}
            <div className="aspect-square relative">
                {previewUrl ? (
                    <Image
                        src={previewUrl}
                        alt={`Thumbnail ${item.order + 1}`}
                        width={100}
                        height={100}
                        className="absolute object-cover w-full h-auto top-[50%] translate-y-[-50%]"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-g400">
                        No Image
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ThumbnailManager({
    thumbnails,
    onChange,
    maxCount = 6,
}: ThumbnailManagerProps) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 8px 이동해야 드래그 시작
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = thumbnails.findIndex((item) => item.uuid === active.id);
            const newIndex = thumbnails.findIndex((item) => item.uuid === over.id);

            const reordered = arrayMove(thumbnails, oldIndex, newIndex);
            // order 재정렬
            const updated = reordered.map((item, index) => ({
                ...item,
                order: index,
            }));
            onChange(updated);
        }
    };

    const handleRemove = (id: string) => {
        const filtered = thumbnails.filter((item) => item.uuid !== id);
        // order 재정렬
        const updated = filtered.map((item, index) => ({
            ...item,
            order: index,
        }));
        onChange(updated);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const files = Array.from(e.target.files);
        const remaining = maxCount - thumbnails.length;

        if (files.length > remaining) {
            alert(`최대 ${maxCount}개까지만 업로드 가능합니다.`);
            return;
        }

        const newThumbnails: ThumbnailItem[] = files.map((file, index) => ({
            uuid: `new-${Date.now()}-${index}`,
            order: thumbnails.length + index,
            file,
            file_index: index,
        }));

        onChange([...thumbnails, ...newThumbnails]);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-titleSmall text-ePrimary font-semibold">
                    제품 이미지
                </h3>
                <span className="text-base text-g400">
                    {thumbnails.length} / {maxCount}
                </span>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={thumbnails.map((item) => item.uuid)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {thumbnails.map((item) => (
                            <SortableItem
                                key={item.uuid}
                                item={item}
                                onRemove={() => handleRemove(item.uuid)}
                            />
                        ))}

                        {/* 업로드 버튼 */}
                        {thumbnails.length < maxCount && (
                            <label
                                htmlFor="thumbnail-upload"
                                className="aspect-square border-2 border-dashed border-g300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-ePrimary hover:bg-g50 transition-colors"
                            >
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-g400 mb-2"
                                >
                                    <path
                                        d="M24 14V34M14 24H34"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="text-base text-g400 font-medium">
                                    이미지 추가
                                </span>
                                <input
                                    type="file"
                                    id="thumbnail-upload"
                                    accept="image/*"
                                    // multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </SortableContext>
            </DndContext>

            <p className="text-small text-g400">
                • 이미지를 드래그하여 순서를 변경할 수 있습니다.
                <br />
                • 최대 {maxCount}개까지 업로드 가능합니다. (JPG, PNG, 최대 10MB)
            </p>
        </div>
    );
}
