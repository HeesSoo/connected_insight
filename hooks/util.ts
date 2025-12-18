export const formatDateToYYMMDD = (date: string | Date): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    const year = String(d.getFullYear()).slice(-2);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
};
