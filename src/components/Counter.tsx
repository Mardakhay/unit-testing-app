import { useState } from 'react'

interface CounterProps {
    initialCount?: number
    step?: number
}

function Counter({ initialCount = 0, step = 1 }: CounterProps) {
    const [count, setCount] = useState(initialCount)

    const increment = () => setCount((c) => c + step)
    const decrement = () => setCount((c) => c - step)
    const reset = () => setCount(initialCount)

    return (
        <div className="counter-card">
            <h2>Sayğac</h2>

            <p className="count-display">
                Dəyər: <strong>{count}</strong>
            </p>

            <div className="counter-buttons">
                <button onClick={decrement}>Azalt</button>
                <button onClick={reset}>Sıfırla</button>
                <button onClick={increment}>Artır</button>
            </div>

            {count < 0 && (
                <p role="alert" className="warning-text">
                    Dəyər mənfidir!
                </p>
            )}
        </div>
    )
}

export default Counter