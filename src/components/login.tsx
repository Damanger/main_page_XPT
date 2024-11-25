import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';
import Style from '../css/login.module.css';

const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Usuario logueado:', user);

            // Redirige al admin si el usuario está autorizado
            const allowedEmails = ["omar.cruzr97@gmail.com"];
            if (allowedEmails.includes(user.email as string)) {
                navigate('/admin'); // Redirige a /admin
            } else {
                await signOut(auth);
                navigate('/error');
            }
        } catch (error: any) {
            console.error('Error en el inicio de sesión:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={Style.container}>
            <h1>Inicio de Sesión con Google</h1>
            <button onClick={handleGoogleLogin} className={Style.loginButton} disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Iniciar Sesión con Google'}
            </button>
        </div>
    );
};

export default Login;
