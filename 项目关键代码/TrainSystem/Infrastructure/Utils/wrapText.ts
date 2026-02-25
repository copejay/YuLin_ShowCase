/**
 * 自动按最大长度进行换行
 * @param text 原文本
 * @param maxLen 每行最大字符数
 * @returns 自动带换行符的文本
 */
export function wrapText(text: string, maxLen: number): string {
    if (!text || maxLen <= 0) return text;

    let result: string[] = [];
    let current = "";

    for (const char of text) {
        current += char;
        if (current.length >= maxLen) {
            result.push(current);
            current = "";
        }
    }

    if (current.length > 0) {
        result.push(current);
    }

    return result.join("\n");
}
