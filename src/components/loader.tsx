import Style from '../css/loader.module.css';

const Loader = () => {
    return (
        <>
            <div className={Style.spinnerCenter}>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
                <div className={Style.spinnerBlade}></div>
            </div>
        </>
    )
}

export default Loader
