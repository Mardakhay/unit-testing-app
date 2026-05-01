interface GreetingProps {
    name: string
    isLoggedIn?: boolean
}

function Greeting({ name, isLoggedIn = false }: GreetingProps) {
    return (
        <div className="greeting-card">
            <h2>
                {isLoggedIn
                    ? `Xoş gəldiniz, ${name}!`
                    : 'Zəhmət olmasa daxil olun'}
            </h2>

            {isLoggedIn && (
                <p className="welcome-message">
                    Hesabınıza uğurla daxil oldunuz.
                </p>
            )}

            {!isLoggedIn && (
                <p>
                    Davam etmək üçün <a href="/login">daxil olun</a>.
                </p>
            )}

            {isLoggedIn && (
                <button className="logout-btn">Çıxış</button>
            )}
        </div>
    )
}

export default Greeting