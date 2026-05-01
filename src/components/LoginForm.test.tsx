import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('LoginForm komponenti', () => {
  const mockSubmit = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    mockSubmit.mockClear()
    render(<LoginForm onSubmit={mockSubmit} />)
  })

  describe('form render yoxlamaları', () => {
    test('başlıq göstərilir', () => {
      expect(screen.getByRole('heading', { name: 'Daxil ol' })).toBeInTheDocument()
    })

    test('email sahəsi render olur', () => {
      const emailInput = screen.getByLabelText('Email')
      expect(emailInput).toBeInTheDocument()
    })

    test('şifrə sahəsi render olur', () => {
      const passwordInput = screen.getByLabelText('Şifrə')
      expect(passwordInput).toBeInTheDocument()
    })

    test('göndər düyməsi render olur', () => {
      expect(screen.getByRole('button', { name: 'Daxil ol' })).toBeInTheDocument()
    })

    test('başlanğıcda xəta mesajı göstərilmir', () => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    test('hər iki sahə boş olduqda düymə disabled olur', () => {
      const button = screen.getByRole('button', { name: 'Daxil ol' })
      expect(button).toBeDisabled()
    })
  })

  describe('form validasiyası', () => {
    test('email doldurulub şifrə boş olduqda xəta göstərilir', async () => {
      await user.type(screen.getByLabelText('Email'), 'test@mail.com')
      await user.click(screen.getByRole('button', { name: 'Daxil ol' }))

      expect(screen.getByRole('alert')).toHaveTextContent('Bütün sahələri doldurun!')
      expect(mockSubmit).not.toHaveBeenCalled()
    })

    test('qısa şifrə ilə göndərdikdə xəta göstərilir', async () => {
      await user.type(screen.getByLabelText('Email'), 'test@mail.com')
      await user.type(screen.getByLabelText('Şifrə'), '123')
      await user.click(screen.getByRole('button', { name: 'Daxil ol' }))

      expect(screen.getByRole('alert')).toHaveTextContent('Şifrə minimum 6 simvol olmalıdır!')
      expect(mockSubmit).not.toHaveBeenCalled()
    })
  })

  describe('uğurlu form göndərmə', () => {
    test('düzgün məlumatlarla onSubmit çağırılır', async () => {
      await user.type(screen.getByLabelText('Email'), 'user@test.com')
      await user.type(screen.getByLabelText('Şifrə'), 'password123')

      await user.click(screen.getByRole('button', { name: 'Daxil ol' }))

      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'user@test.com',
        password: 'password123',
      })
    })

    test('uğurlu göndərmədə onSubmit tam 1 dəfə çağırılır', async () => {
      await user.type(screen.getByLabelText('Email'), 'user@test.com')
      await user.type(screen.getByLabelText('Şifrə'), 'password123')
      await user.click(screen.getByRole('button', { name: 'Daxil ol' }))

      expect(mockSubmit).toHaveBeenCalledTimes(1)
    })

    test('uğurlu göndərmədə xəta mesajı göstərilmir', async () => {
      await user.type(screen.getByLabelText('Email'), 'user@test.com')
      await user.type(screen.getByLabelText('Şifrə'), 'password123')
      await user.click(screen.getByRole('button', { name: 'Daxil ol' }))

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('input dəyər yoxlamaları', () => {
    test('yazılan mətn input-da görünür', async () => {
      const emailInput = screen.getByLabelText('Email')
      await user.type(emailInput, 'test@mail.com')

      expect(emailInput).toHaveValue('test@mail.com')
    })

    test('ən azı bir sahə doldurulduqda düymə enabled olur', async () => {
      await user.type(screen.getByLabelText('Email'), 't')

      expect(screen.getByRole('button', { name: 'Daxil ol' })).toBeEnabled()
    })
  })
})