import { useState } from 'react'

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Bütün sahələri doldurun!')
      return
    }

    if (password.length < 6) {
      setError('Şifrə minimum 6 simvol olmalıdır!')
      return
    }

    setError('')
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Daxil ol</h2>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
        />
      </div>

      <div className="form-field">
        <label htmlFor="password">Şifrə</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimum 6 simvol"
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={!email && !password}>
        Daxil ol
      </button>
    </form>
  )
}