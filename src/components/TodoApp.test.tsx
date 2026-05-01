import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoApp from './TodoApp'

describe('TodoApp komponenti', () => {
    const user = userEvent.setup()

    beforeEach(() => {
        render(<TodoApp />)
    })

    describe('başlanğıc render', () => {
        test('başlıq göstərilir', () => {
            expect(
                screen.getByRole('heading', { name: 'Tapşırıqlar' })
            ).toBeInTheDocument()
        })

        test('input sahəsi boş başlayır', () => {
            const input = screen.getByLabelText('Yeni tapşırıq')
            expect(input).toHaveValue('')
        })

        test('əlavə et düyməsi render olur', () => {
            expect(
                screen.getByRole('button', { name: 'Əlavə et' })
            ).toBeInTheDocument()
        })

        test('başlanğıcda siyahı boşdur', () => {
            expect(
                screen.queryByRole('listitem')
            ).not.toBeInTheDocument()
        })

        test('başlanğıcda 0 tapşırıq qalıb göstərilir', () => {
            expect(
                screen.getByText('0 tapşırıq qalıb')
            ).toBeInTheDocument()
        })
    })

    describe('tapşırıq əlavə etmə', () => {
        test('düymə ilə yeni tapşırıq əlavə edir', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')
            await user.type(input, 'Jest öyrən')

            await user.click(
                screen.getByRole('button', { name: 'Əlavə et' })
            )

            expect(
                screen.getByText('Jest öyrən')
            ).toBeInTheDocument()
        })

        test('əlavə etdikdən sonra input təmizlənir', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')
            await user.type(input, 'Test yaz')

            await user.click(
                screen.getByRole('button', { name: 'Əlavə et' })
            )

            expect(input).toHaveValue('')
        })

        test('Enter ilə tapşırıq əlavə edir', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')

            await user.type(input, 'RTL öyrən{enter}')

            expect(
                screen.getByText('RTL öyrən')
            ).toBeInTheDocument()
        })

        test('boş input ilə tapşırıq əlavə olunmur', async () => {
            await user.click(
                screen.getByRole('button', { name: 'Əlavə et' })
            )

            expect(
                screen.queryByRole('listitem')
            ).not.toBeInTheDocument()

            expect(
                screen.getByText('0 tapşırıq qalıb')
            ).toBeInTheDocument()
        })

        test('yalnız boşluqlardan ibarət input əlavə olunmur', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')
            await user.type(input, '   {enter}')

            expect(
                screen.queryByRole('listitem')
            ).not.toBeInTheDocument()
        })

        test('bir neçə tapşırıq əlavə etmək mümkündür', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')

            await user.type(input, 'Birinci{enter}')
            await user.type(input, 'İkinci{enter}')
            await user.type(input, 'Üçüncü{enter}')

            const items = screen.getAllByRole('listitem')
            expect(items).toHaveLength(3)

            expect(
                screen.getByText('3 tapşırıq qalıb')
            ).toBeInTheDocument()
        })
    })

    describe('tapşırıq tamamlama (toggle)', () => {
        test('checkbox ilə tapşırığı tamamlamaq olur', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')
            await user.type(input, 'Test yaz{enter}')

            const checkbox = screen.getByRole('checkbox', {
                name: 'Test yaz tamamla',
            })

            expect(checkbox).not.toBeChecked()

            await user.click(checkbox)

            expect(checkbox).toBeChecked()
        })

        test('tamamlanan tapşırıq sayğacı azalır', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')

            await user.type(input, 'Tapşırıq 1{enter}')
            await user.type(input, 'Tapşırıq 2{enter}')

            expect(
                screen.getByText('2 tapşırıq qalıb')
            ).toBeInTheDocument()

            await user.click(
                screen.getByRole('checkbox', {
                    name: 'Tapşırıq 1 tamamla',
                })
            )

            expect(
                screen.getByText('1 tapşırıq qalıb')
            ).toBeInTheDocument()
        })

        test('toggle geri qaytarmaq olur', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')
            await user.type(input, 'Geri qaytar{enter}')

            const checkbox = screen.getByRole('checkbox', {
                name: 'Geri qaytar tamamla',
            })

            await user.click(checkbox)
            expect(checkbox).toBeChecked()

            await user.click(checkbox)
            expect(checkbox).not.toBeChecked()
        })
    })

    describe('tapşırıq silmə', () => {
        test('sil düyməsi ilə tapşırıq silinir', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')
            await user.type(input, 'Silinəcək{enter}')

            expect(
                screen.getByText('Silinəcək')
            ).toBeInTheDocument()

            await user.click(
                screen.getByRole('button', {
                    name: 'Silinəcək sil',
                })
            )

            expect(
                screen.queryByText('Silinəcək')
            ).not.toBeInTheDocument()
        })

        test('silmə sayğacı yenilənir', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')

            await user.type(input, 'Silinəcək{enter}')
            await user.type(input, 'Qalacaq{enter}')

            expect(
                screen.getByText('2 tapşırıq qalıb')
            ).toBeInTheDocument()

            await user.click(
                screen.getByRole('button', {
                    name: 'Silinəcək sil',
                })
            )

            expect(
                screen.getByText('1 tapşırıq qalıb')
            ).toBeInTheDocument()
        })
    })

    describe('tam istifadəçi ssenarisi', () => {
        test('əlavə et → tamamla → sil', async () => {
            const input = screen.getByLabelText('Yeni tapşırıq')

            await user.type(input, 'Alış-veriş{enter}')
            await user.type(input, 'Dərs oxu{enter}')

            expect(screen.getAllByRole('listitem')).toHaveLength(2)
            expect(
                screen.getByText('2 tapşırıq qalıb')
            ).toBeInTheDocument()

            await user.click(
                screen.getByRole('checkbox', {
                    name: 'Alış-veriş tamamla',
                })
            )

            expect(
                screen.getByText('1 tapşırıq qalıb')
            ).toBeInTheDocument()

            await user.click(
                screen.getByRole('button', {
                    name: 'Alış-veriş sil',
                })
            )

            expect(
                screen.queryByText('Alış-veriş')
            ).not.toBeInTheDocument()

            expect(screen.getAllByRole('listitem')).toHaveLength(1)
            expect(
                screen.getByText('1 tapşırıq qalıb')
            ).toBeInTheDocument()
        })
    })
})
