import Style from '../css/error.module.css';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <section className={Style.error}>
            <div className={Style.errorContainer}>
                <h1>Kernel Panic</h1>
                <p>Your computer has encountered an error and needs to restart.</p>
                <p>Error Code: <code>0x0000000A</code><span className={Style.blink}> _</span></p>
                <Link to='/' className={Style.link}>Restart</Link>
            </div>
        </section>
    );
};

export default Error;