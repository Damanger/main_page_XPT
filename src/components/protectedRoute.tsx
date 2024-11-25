import React, { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import Loader from './loader';
import Style from '../css/protectedRoute.module.css';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('Sesión cerrada');
            navigate('/');
        } catch (error: any) {
            console.error('Error al cerrar sesión:', error.message);
        }
    };

    if (isAuthenticated === null) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return (
            <>
                <div className={Style.loading}>No estás autorizado. Inicia sesión para continuar.</div>
                <Link to="/login" className={Style.loginLink}>
                    Ir a Login
                </Link>
            </>
        );
    }

    return (
        <>
            <div className={Style.container}>
                <button onClick={handleLogout} className={Style.logoutButton}>
                    Cerrar Sesión
                </button>
                {children}
            </div>
        </>
    );
};

export default ProtectedRoute;
