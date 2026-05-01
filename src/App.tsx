import { Counter } from './components/Counter'
import { Greeting } from './components/Greeting'
import { LoginForm } from './components/LoginForm'
import { TodoApp } from './components/TodoApp'

export default function App() {
  return (
    <main className="app grid">
      <h1>Unit Testing App</h1>
      <Greeting name="Mardakhay" />
      <Counter />
      <LoginForm />
      <TodoApp />
    </main>
  )
}
