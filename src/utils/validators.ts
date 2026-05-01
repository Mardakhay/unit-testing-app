export function isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(value)
}

export function isStrongPassword(
    password: string
): {
    valid: boolean
    errors: string[]
} {
    const errors: string[] = []

    if (password.length < 6) {
        errors.push('Minimum 6 simvol olmalıdır')
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Ən azı 1 böyük hərf olmalıdır')
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Ən azı 1 rəqəm olmalıdır')
    }

    return {
        valid: errors.length === 0,
        errors,
    }
}

export function isInRange(
    value: number,
    min: number,
    max: number
): boolean {
    return value >= min && value <= max
}

export function isEmpty(value: unknown): boolean {
    if (value === null || value === undefined) return true

    if (typeof value === 'string') {
        return value.trim() === ''
    }

    if (Array.isArray(value)) {
        return value.length === 0
    }

    return false
}