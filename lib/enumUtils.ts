// Enum 아이템 타입 정의
export interface EnumItem {
    label: string;
    value: string | number;
}

/**
 * Enum 배열에서 value에 해당하는 label을 찾는 함수
 * @param enumArray - Enum 배열
 * @param value - 찾을 value
 * @returns label 또는 빈 문자열
 */
export function getEnumLabel(enumArray: EnumItem[] | undefined | null, value: string | number | undefined | null): string {
    if (!enumArray || !value) return "";

    const item = enumArray.find((item) => item.value === value);
    return item?.label || "";
}

/**
 * Enum 배열에서 value에 해당하는 전체 item을 찾는 함수
 * @param enumArray - Enum 배열
 * @param value - 찾을 value
 * @returns EnumItem 또는 undefined
 */
export function getEnumItem(enumArray: EnumItem[] | undefined | null, value: string | number | undefined | null): EnumItem | undefined {
    if (!enumArray || !value) return undefined;

    return enumArray.find((item) => item.value === value);
}

/**
 * 여러 value에 해당하는 label들을 쉼표로 연결해서 반환
 * @param enumArray - Enum 배열
 * @param values - 찾을 value 배열
 * @param separator - 구분자 (기본값: ", ")
 * @returns label들을 구분자로 연결한 문자열
 */
export function getEnumLabels(
    enumArray: EnumItem[] | undefined | null,
    values: (string | number)[] | undefined | null,
    separator: string = ", "
): string {
    if (!enumArray || !values || values.length === 0) return "";

    const labels = values
        .map((value) => getEnumLabel(enumArray, value))
        .filter((label) => label !== "");

    return labels.join(separator);
}

/**
 * label로 value를 찾는 함수 (역방향 검색)
 * @param enumArray - Enum 배열
 * @param label - 찾을 label
 * @returns value 또는 undefined
 */
export function getEnumValue(enumArray: EnumItem[] | undefined | null, label: string | undefined | null): string | number | undefined {
    if (!enumArray || !label) return undefined;

    const item = enumArray.find((item) => item.label === label);
    return item?.value;
}
