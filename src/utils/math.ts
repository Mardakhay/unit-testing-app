export function add(a: number, b: number): number {
    return a + b
}

export function multiply(a: number, b: number): number {
    return a * b
}

export function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error('Sıfıra bölmək olmaz!')
    }

    return a / b
}

export function factorial(n: number): number {
    if (n < 0) {
        throw new Error('Mənfi ədədin faktorialı yoxdur!')
    }

    if (n === 0 || n === 1) {
        return 1
    }

    return n * factorial(n - 1)
}