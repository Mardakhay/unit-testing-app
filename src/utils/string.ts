export function capitalize(
    str: string | null | undefined
): string {
    if (!str) return ''

    return str[0].toUpperCase() + str.slice(1)
}

export function truncate(
    str: string,
    maxLength: number
): string {
    if (str.length <= maxLength) return str

    return str.slice(0, maxLength) + '...'
}

export function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function reverseString(str: string): string {
    return str.split('').reverse().join('')
}

export function countWords(str: string): number {
    const trimmed = str.trim()

    if (trimmed === '') return 0

    return trimmed.split(/\s+/).length
}