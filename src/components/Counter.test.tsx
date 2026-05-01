import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter komponenti', () => {
    const user = userEvent.setup()

    describe('başlanğıc render', () => {
        test('sayğac 0 ilə başlayır (default props)', () => {
            render(<Counter />)

            expect(screen.getByText('Dəyər:')).toBeInTheDocument()
            expect(screen.getByText('0')).toBeInTheDocument()
        })

        test('başlıq "Sayğac" göstərilir', () => {
            render(<Counter />)

            expect(screen.getByRole('heading', { name: 'Sayğac' })).toBeInTheDocument()
        })

        test('üç düymə render olur: Azalt, Sıfırla, Artır', () => {
            render(<Counter />)

            expect(screen.getByRole('button', { name: 'Azalt' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Sıfırla' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Artır' })).toBeInTheDocument()
        })

        test('başlanğıcda xəbərdarlıq mesajı göstərilmir', () => {
            render(<Counter />)

            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
    })

    describe('Artır düyməsi', () => {
        test('bir klikdə dəyər 1 artır', async () => {
            render(<Counter />)
            const artırBtn = screen.getByRole('button', { name: 'Artır' })

            await user.click(artırBtn)

            expect(screen.getByText('1')).toBeInTheDocument()
        })

        test('üç klikdə dəyər 3 olur', async () => {
            render(<Counter />)
            const artırBtn = screen.getByRole('button', { name: 'Artır' })

            await user.click(artırBtn)
            await user.click(artırBtn)
            await user.click(artırBtn)

            expect(screen.getByText('3')).toBeInTheDocument()
        })
    })

    describe('Azalt düyməsi', () => {
        test('bir klikdə dəyər -1 olur', async () => {
            render(<Counter />)
            const azaltBtn = screen.getByRole('button', { name: 'Azalt' })

            await user.click(azaltBtn)

            expect(screen.getByText('-1')).toBeInTheDocument()
        })

        test('mənfi dəyərdə xəbərdarlıq mesajı göstərilir', async () => {
            render(<Counter />)
            const azaltBtn = screen.getByRole('button', { name: 'Azalt' })

            await user.click(azaltBtn)

            const alert = screen.getByRole('alert')
            expect(alert).toBeInTheDocument()
            expect(alert).toHaveTextContent('Dəyər mənfidir!')
        })
    })

    describe('Sıfırla düyməsi', () => {
        test('artırılmış dəyəri sıfırlayır', async () => {
            render(<Counter />)

            await user.click(screen.getByRole('button', { name: 'Artır' }))
            await user.click(screen.getByRole('button', { name: 'Artır' }))
            expect(screen.getByText('2')).toBeInTheDocument()

            await user.click(screen.getByRole('button', { name: 'Sıfırla' }))
            expect(screen.getByText('0')).toBeInTheDocument()
        })

        test('mənfi dəyəri sıfırladıqda xəbərdarlıq yox olur', async () => {
            render(<Counter />)

            await user.click(screen.getByRole('button', { name: 'Azalt' }))
            expect(screen.getByRole('alert')).toBeInTheDocument()

            await user.click(screen.getByRole('button', { name: 'Sıfırla' }))
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
    })

    describe('custom props ilə davranış', () => {
        test('initialCount prop ilə fərqli başlanğıc dəyəri', () => {
            render(<Counter initialCount={10} />)

            expect(screen.getByText('10')).toBeInTheDocument()
        })

        test('step prop ilə fərqli addım ölçüsü', async () => {
            render(<Counter step={5} />)

            await user.click(screen.getByRole('button', { name: 'Artır' }))
            expect(screen.getByText('5')).toBeInTheDocument()

            await user.click(screen.getByRole('button', { name: 'Artır' }))
            expect(screen.getByText('10')).toBeInTheDocument()
        })

        test('sıfırla initialCount dəyərinə qaytarır (10)', async () => {
            render(<Counter initialCount={10} />)

            await user.click(screen.getByRole('button', { name: 'Artır' }))
            expect(screen.getByText('11')).toBeInTheDocument()

            await user.click(screen.getByRole('button', { name: 'Sıfırla' }))
            expect(screen.getByText('10')).toBeInTheDocument()
        })
    })
})
