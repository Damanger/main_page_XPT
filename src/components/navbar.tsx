import { useState, useEffect } from 'react';
import Style from '../css/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 430);
            if (window.innerWidth > 430) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsClosing(false);
                setIsOpen(false);
            }, 500);
        } else {
            setIsOpen(true);
        }
    };

    const closeMenu = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsClosing(false);
                setIsOpen(false);
            }, 500);
        }
    };

    return (
        <nav className={Style.navbar}>
            <Link to="/"><img src="XPT.webp" alt="XPT" className={Style.logo} /></Link>

            {/* Ocultar el navLinksDesktop en pantallas pequeñas */}
            {!isMobile && (
                <ul className={Style.navLinksDesktop}>
                    <li>
                        <a href="#XPT">XPT</a>
                    </li>
                    <li>
                        <a href="#Metas">Metas</a>
                    </li>
                    <li>
                        <a href="#Herramientas">Herramientas</a>
                    </li>
                    <li>
                        <a href="#Trabajos">Trabajos</a>
                    </li>
                </ul>
            )}

            {/* Mostrar el menú hamburguesa solo en pantallas pequeñas */}
            {isMobile && (
                <button className={Style.hamburger} onClick={toggleMenu}>
                    <span className={`${Style.bar} ${isOpen ? Style.barOpen : ''}`}></span>
                    <span className={`${Style.bar} ${isOpen ? Style.barOpen : ''}`}></span>
                    <span className={`${Style.bar} ${isOpen ? Style.barOpen : ''}`}></span>
                </button>
            )}

            {/* Menú hamburguesa que aparece solo en pantallas pequeñas */}
            <ul
                className={`${Style.navLinks} ${
                    isOpen ? (isClosing ? Style.hideMenu : Style.showMenu) : ''
                }`}
            >
                <li>
                    <a href="#XPT" onClick={closeMenu}>XPT</a>
                </li>
                <li>
                    <a href="#Metas" onClick={closeMenu}>Metas</a>
                </li>
                <li>
                    <a href="#Herramientas" onClick={closeMenu}>Herramientas</a>
                </li>
                <li>
                    <a href="#Trabajos" onClick={closeMenu}>Trabajos</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
