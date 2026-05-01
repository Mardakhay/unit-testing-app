import { useState } from 'react'

interface Todo {
    id: number
    text: string
    done: boolean
}

function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [input, setInput] = useState('')

    const addTodo = () => {
        if (!input.trim()) return

        setTodos([
            ...todos,
            { id: Date.now(), text: input.trim(), done: false },
        ])

        setInput('')
    }

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, done: !t.done } : t
            )
        )
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((t) => t.id !== id))
    }

    const remaining = todos.filter((t) => !t.done).length

    return (
        <div className="todo-card">
            <h2>Tapşırıqlar</h2>

            <div className="todo-input-row">
                <input
                    aria-label="Yeni tapşırıq"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Nə etmək lazımdır?"
                />

                <button onClick={addTodo}>Əlavə et</button>
            </div>

            <ul className="todo-list">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={todo.done ? 'done' : ''}
                    >
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => toggleTodo(todo.id)}
                            aria-label={`${todo.text} tamamla`}
                        />

                        <span
                            style={{
                                textDecoration: todo.done
                                    ? 'line-through'
                                    : 'none',
                            }}
                        >
                            {todo.text}
                        </span>

                        <button
                            onClick={() => deleteTodo(todo.id)}
                            aria-label={`${todo.text} sil`}
                            className="delete-btn"
                        >
                            Sil
                        </button>
                    </li>
                ))}
            </ul>

            <p className="todo-count">
                {remaining} tapşırıq qalıb
            </p>
        </div>
    )
}

export default TodoApp