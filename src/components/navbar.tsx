import { Link } from 'react-router-dom'
import Style from '../css/navbar.module.css'

const Navbar = () => {
    return (
        <nav className={Style.navbar}>
            <Link to="/">
                <img src="XPT.webp" alt="XPT" className={Style.logo} />
            </Link>
        </nav>
    )
}

export default Navbar
