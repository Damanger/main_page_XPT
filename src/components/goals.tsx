import { FaBullseye, FaUsers, FaRocket, FaLaptopCode } from 'react-icons/fa';
import Style from '../css/goals.module.css';

const Goals = () => {
    const goals = [
        {
            icon: <FaBullseye />,
            title: 'Objetivos Claros',
            description: 'Definir metas alcanzables para cada etapa del desarrollo de software.',
        },
        {
            icon: <FaUsers />,
            title: 'Trabajo en Equipo',
            description: 'Fomentar la colaboración efectiva entre todos los miembros del equipo.',
        },
        {
            icon: <FaRocket />,
            title: 'Entrega Rápida',
            description: 'Asegurar entregas continuas con alta calidad utilizando metodologías ágiles.',
        },
        {
            icon: <FaLaptopCode />,
            title: 'Excelencia Técnica',
            description: 'Mantener altos estándares de calidad en el código y las soluciones técnicas.',
        },
    ];

    return (
        <section className={Style.sectionG}>
            <h1 className={Style.titleG}>Metas del Equipo</h1>
            <div className={Style.cardsContainer}>
                {goals.map((goal, index) => (
                    <div key={index} className={Style.card}>
                        <div className={Style.icon}>{goal.icon}</div>
                        <h2 className={Style.cardTitle}>{goal.title}</h2>
                        <p className={Style.cardDescription}>{goal.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Goals;
