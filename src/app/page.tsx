import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setError(null);
        
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
        } else {
   
            window.location.href = "/"; 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <div>
                <label htmlFor="email">Correo Electrónico</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginForm;
