import { add, multiply, divide, factorial } from './math'

describe('Math Utils', () => {
    describe('add() funksiyası', () => {
        test('iki müsbət ədədi toplayır: 2 + 3 = 5', () => {
            const netice = add(2, 3)
            expect(netice).toBe(5)
        })

        test('mənfi ədədlərlə işləyir: -1 + -2 = -3', () => {
            expect(add(-1, -2)).toBe(-3)
        })

        test('sıfır ilə topladıqda dəyişmir: 5 + 0 = 5', () => {
            expect(add(5, 0)).toBe(5)
        })

        test('onluq ədədləri toplayır: 0.1 + 0.2 ≈ 0.3', () => {
            expect(add(0.1, 0.2)).toBeCloseTo(0.3)
        })
    })

    describe('multiply() funksiyası', () => {
        test('iki ədədi vurur: 4 * 5 = 20', () => {
            expect(multiply(4, 5)).toBe(20)
        })

        test('sıfır ilə vurma: 100 * 0 = 0', () => {
            expect(multiply(100, 0)).toBe(0)
        })

        test('mənfi ədədlərlə vurma: -3 * 4 = -12', () => {
            expect(multiply(-3, 4)).toBe(-12)
        })
    })

    describe('divide() funksiyası', () => {
        test('iki ədədi bölür: 10 / 2 = 5', () => {
            expect(divide(10, 2)).toBe(5)
        })

        test('onluq nəticə qaytarır: 7 / 2 = 3.5', () => {
            expect(divide(7, 2)).toBe(3.5)
        })

        test('sıfıra bölmək error atır', () => {
            expect(() => divide(10, 0)).toThrow('Sıfıra bölmək olmaz!')
        })

        test('error tipi yoxlanır', () => {
            expect(() => divide(5, 0)).toThrow(Error)
        })
    })

    describe('factorial() funksiyası', () => {
        let neticeler: Record<number, number>

        beforeEach(() => {
            neticeler = {
                0: 1,
                1: 1,
                5: 120,
                10: 3628800,
            }
        })

        test('0! = 1 qaytarır (base case)', () => {
            expect(factorial(0)).toBe(neticeler[0])
        })

        test('1! = 1 qaytarır', () => {
            expect(factorial(1)).toBe(neticeler[1])
        })

        test('5! = 120 qaytarır', () => {
            expect(factorial(5)).toBe(neticeler[5])
        })

        test('10! = 3628800 qaytarır', () => {
            expect(factorial(10)).toBe(neticeler[10])
        })

        test('mənfi ədəd üçün error atır', () => {
            expect(() => factorial(-1)).toThrow('Mənfi ədədin faktorialı yoxdur!')
        })
    })
})