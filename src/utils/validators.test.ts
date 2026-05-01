import {
    isEmail,
    isStrongPassword,
    isInRange,
    isEmpty,
} from './validators'

describe('Validators', () => {
    describe('isEmail() funksiyası', () => {
        test('düzgün email formatını qəbul edir', () => {
            expect(isEmail('test@mail.com')).toBeTruthy()
        })

        test('subdomain olan emaili qəbul edir', () => {
            expect(isEmail('user@sub.domain.com')).toBeTruthy()
        })

        test('@ olmayan stringi rədd edir', () => {
            expect(isEmail('invalid-email')).toBeFalsy()
        })

        test('domain olmayan emaili rədd edir', () => {
            expect(isEmail('user@')).toBeFalsy()
        })

        test('boşluq olan emaili rədd edir', () => {
            expect(isEmail('user @mail.com')).toBeFalsy()
        })

        test('boş stringi rədd edir', () => {
            expect(isEmail('')).toBeFalsy()
        })
    })

    describe('isStrongPassword() funksiyası', () => {
        test('güclü şifrəni qəbul edir', () => {
            const netice = isStrongPassword('Sifre1')

            expect(netice).toEqual({
                valid: true,
                errors: [],
            })
        })

        test('güclü şifrə üçün valid = true olur', () => {
            const netice = isStrongPassword('Test123')
            expect(netice.valid).toBeTruthy()
        })

        test('qısa şifrədə errors massivi boş olmur', () => {
            const netice = isStrongPassword('Ab1')

            expect(netice.valid).toBeFalsy()
            expect(netice.errors).toContain('Minimum 6 simvol olmalıdır')
        })

        test('böyük hərf olmayan şifrəni rədd edir', () => {
            const netice = isStrongPassword('sifre123')

            expect(netice.errors).toContain(
                'Ən azı 1 böyük hərf olmalıdır'
            )
        })

        test('rəqəm olmayan şifrəni rədd edir', () => {
            const netice = isStrongPassword('SifreSiz')

            expect(netice.errors).toContain(
                'Ən azı 1 rəqəm olmalıdır'
            )
        })

        test('çox zəif şifrədə birdən çox xəta olur', () => {
            const netice = isStrongPassword('ab')

            expect(netice.errors).toHaveLength(3)
        })
    })

    describe('isInRange() funksiyası', () => {
        test('aralıqdakı dəyər true qaytarır', () => {
            expect(isInRange(5, 1, 10)).toBe(true)
        })

        test('minimum sərhəd daxildir', () => {
            expect(isInRange(1, 1, 10)).toBeTruthy()
        })

        test('maximum sərhəd daxildir', () => {
            expect(isInRange(10, 1, 10)).toBeTruthy()
        })

        test('aralıqdan kənar dəyər false qaytarır', () => {
            expect(isInRange(11, 1, 10)).toBeFalsy()
        })

        test('mənfi aralıqda da işləyir', () => {
            expect(isInRange(-5, -10, 0)).toBeTruthy()
        })
    })

    describe('isEmpty() funksiyası', () => {
        test('null üçün true qaytarır', () => {
            expect(isEmpty(null)).toBe(true)
        })

        test('undefined üçün true qaytarır', () => {
            expect(isEmpty(undefined)).toBe(true)
        })

        test('boş string üçün true qaytarır', () => {
            expect(isEmpty('')).toBe(true)
        })

        test('yalnız boşluqlardan ibarət string üçün true qaytarır', () => {
            expect(isEmpty('   ')).toBe(true)
        })

        test('boş array üçün true qaytarır', () => {
            expect(isEmpty([])).toBe(true)
        })

        test('dolu string üçün false qaytarır', () => {
            expect(isEmpty('salam')).not.toBe(true)
        })

        test('elementli array üçün false qaytarır', () => {
            expect(isEmpty([1, 2, 3])).toBeFalsy()
        })
    })
})