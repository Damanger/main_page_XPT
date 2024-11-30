import HeroSection from './hero'
import Goals from './goals'
import Carrousel from './carrousel'
import Jobs from './jobs'
//import Style from '../css/landing.module.css'

const Landing = () => {
    return (
        <>
            <HeroSection id="XPT" />
            <Goals id="Metas" />
            <Carrousel id="Herramientas" />
            <Jobs id="Trabajos" />
        </>
    )
}

export default Landing
