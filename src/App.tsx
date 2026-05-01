import Greeting from './components/Greeting'
import Counter from './components/Counter'
import LoginForm from './components/LoginForm'
import TodoApp from './components/TodoApp'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Week 19 — Unit Testing Demo</h1>
        <p>
          Jest + React Testing Library ilə test edilən komponentlər
        </p>
        <code>npm test</code> ilə testləri çalışdırın
      </header>

      <main className="app-main">
        <section className="demo-section">
          <div className="section-badge">
            Component Render
          </div>
          <Greeting name="Tələbə" isLoggedIn={true} />
        </section>

        <section className="demo-section">
          <div className="section-badge">
            User Actions — Click
          </div>
          <Counter />
        </section>

        <section className="demo-section">
          <div className="section-badge">
            User Actions — Form
          </div>
          <LoginForm
            onSubmit={(data) =>
              alert(`Email: ${data.email}`)
            }
          />
        </section>

        <section className="demo-section">
          <div className="section-badge">
            Full CRUD
          </div>
          <TodoApp />
        </section>
      </main>
    </div>
  )
}

export default App
