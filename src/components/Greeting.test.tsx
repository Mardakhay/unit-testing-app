import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'

describe('Greeting komponenti', () => {
    describe('render yoxlamaları', () => {
        test('komponent uğurla render olur', () => {
            render(<Greeting name="Ali" />)

            const heading = screen.getByRole('heading')
            expect(heading).toBeInTheDocument()
        })
    })

    describe('istifadəçi daxil olmayıb (isLoggedIn=false)', () => {
        test('daxil olma mesajı göstərilir', () => {
            render(<Greeting name="Ali" />)

            expect(
                screen.getByText('Zəhmət olmasa daxil olun')
            ).toBeInTheDocument()
        })

        test('xoş gəldiniz mesajı göstərilmir', () => {
            render(<Greeting name="Ali" isLoggedIn={false} />)

            const welcomeMsg = screen.queryByText(/Hesabınıza uğurla/)
            expect(welcomeMsg).not.toBeInTheDocument()
        })

        test('çıxış düyməsi göstərilmir', () => {
            render(<Greeting name="Ali" />)

            const logoutBtn = screen.queryByRole('button', { name: 'Çıxış' })
            expect(logoutBtn).not.toBeInTheDocument()
        })

        test('daxil ol linki düzgün href-ə malikdir', () => {
            render(<Greeting name="Ali" />)

            const link = screen.getByRole('link', { name: 'daxil olun' })
            expect(link).toHaveAttribute('href', '/login')
        })
    })

    describe('istifadəçi daxil olub (isLoggedIn=true)', () => {
        test('istifadəçinin adı ilə xoş gəldiniz mesajı göstərilir', () => {
            render(<Greeting name="Nigar" isLoggedIn={true} />)

            const heading = screen.getByRole('heading')
            expect(heading).toHaveTextContent('Xoş gəldiniz, Nigar!')
        })

        test('uğurlu daxil olma mesajı göstərilir', () => {
            render(<Greeting name="Ali" isLoggedIn={true} />)

            expect(
                screen.getByText('Hesabınıza uğurla daxil oldunuz.')
            ).toBeInTheDocument()
        })

        test('çıxış düyməsi göstərilir', () => {
            render(<Greeting name="Ali" isLoggedIn={true} />)

            const logoutBtn = screen.getByRole('button', { name: 'Çıxış' })
            expect(logoutBtn).toBeInTheDocument()
        })

        test('çıxış düyməsi logout-btn klasına malikdir', () => {
            render(<Greeting name="Ali" isLoggedIn={true} />)

            const logoutBtn = screen.getByRole('button', { name: 'Çıxış' })
            expect(logoutBtn).toHaveClass('logout-btn')
        })

        test('daxil ol linki göstərilmir', () => {
            render(<Greeting name="Ali" isLoggedIn={true} />)

            const loginLink = screen.queryByRole('link', { name: 'daxil olun' })
            expect(loginLink).not.toBeInTheDocument()
        })
    })

    describe('müxtəlif adlarla render', () => {
        test('fərqli adlar düzgün göstərilir', () => {
            const { unmount } = render(
                <Greeting name="Əli" isLoggedIn={true} />
            )
            expect(
                screen.getByText('Xoş gəldiniz, Əli!')
            ).toBeInTheDocument()

            unmount()

            render(<Greeting name="Vəli" isLoggedIn={true} />)
            expect(
                screen.getByText('Xoş gəldiniz, Vəli!')
            ).toBeInTheDocument()
        })
    })
})