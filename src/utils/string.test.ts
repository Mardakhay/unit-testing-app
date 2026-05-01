import {
    capitalize,
    truncate,
    slugify,
    reverseString,
    countWords,
} from './string'

describe('String Utils', () => {
    describe('capitalize() funksiyası', () => {
        test('ilk hərfi böyük edir: "hello" → "Hello"', () => {
            expect(capitalize('hello')).toBe('Hello')
        })

        test('artıq böyük olan hərfi dəyişmir: "Hello" → "Hello"', () => {
            expect(capitalize('Hello')).toBe('Hello')
        })

        test('boş string üçün boş string qaytarır', () => {
            expect(capitalize('')).toBe('')
        })

        test('null üçün boş string qaytarır', () => {
            expect(capitalize(null)).toBe('')
        })

        test('undefined üçün boş string qaytarır', () => {
            expect(capitalize(undefined)).toBe('')
        })
    })

    describe('truncate() funksiyası', () => {
        test('uzun stringi kəsib "..." əlavə edir', () => {
            const netice = truncate('Salam Dünya!', 5)
            expect(netice).toBe('Salam...')
        })

        test('qısa stringi dəyişmədən qaytarır', () => {
            const netice = truncate('Hi', 10)
            expect(netice).toBe('Hi')
        })

        test('kəsilmiş stringin uzunluğu maxLength + 3 olur', () => {
            const netice = truncate('Uzun bir cümlə', 4)
            expect(netice).toHaveLength(7)
        })

        test('kəsilmiş string "..." ilə bitir', () => {
            const netice = truncate('Uzun bir cümlə', 4)
            expect(netice).toContain('...')
        })

        test('qısa stringdə "..." olmur', () => {
            const netice = truncate('Qısa', 10)
            expect(netice).not.toContain('...')
        })
    })

    describe('slugify() funksiyası', () => {
        test('boşluqları tire ilə əvəz edir', () => {
            expect(slugify('Hello World')).toBe('hello-world')
        })

        test('böyük hərfləri kiçik edir', () => {
            const netice = slugify('BÖYÜK HƏRF')
            expect(netice).not.toContain('B')
        })

        test('xüsusi simvolları silir', () => {
            expect(slugify('Hello, World!')).toBe('hello-world')
        })

        test('baş və sondakı boşluqları silir', () => {
            expect(slugify('  hello world  ')).toBe('hello-world')
        })
    })

    describe('reverseString() funksiyası', () => {
        test('stringi tərsinə çevirir: "abc" → "cba"', () => {
            expect(reverseString('abc')).toBe('cba')
        })

        test('palindrom eyni qalır', () => {
            const palindrom = 'aba'
            expect(reverseString(palindrom)).toEqual(palindrom)
        })

        test('boş string boş qalır', () => {
            expect(reverseString('')).toBe('')
        })
    })

    describe('countWords() funksiyası', () => {
        test('söz sayını düzgün hesablayır', () => {
            expect(countWords('Salam dünya necəsən')).toBe(3)
        })

        test('boş string üçün 0 qaytarır', () => {
            expect(countWords('')).toBe(0)
        })

        test('yalnız boşluqlar üçün 0 qaytarır', () => {
            expect(countWords('   ')).toBe(0)
        })

        test('artıq boşluqları ignore edir', () => {
            expect(countWords('  Salam   dünya  ')).toBe(2)
        })
    })
})