
import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../firebase';
import { FaBullseye, FaUsers, FaRocket, FaLaptopCode } from 'react-icons/fa';
import Style from '../css/goals.module.css';

interface SectionProps {
    id: string;
}

const Goals: React.FC<SectionProps> = ({ id }) => {

    const [goalsBackground, setGoalsBackground] = useState<string | null>(null);

    useEffect(() => {
        const db = getDatabase(app);

        // Obtener el background desde la ruta '/goals/background'
        const backgroundRef = ref(db, 'goals/background');
        get(backgroundRef).then((snapshot) => {
            if (snapshot.exists()) {
                setGoalsBackground(snapshot.val());
            } else {
                console.log('No se encontró el background en la base de datos');
            }
        }).catch((error) => {
            console.error('Error al obtener el background: ', error);
        });
    }, []);

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
        <section className={Style.sectionG} id={id} style={{
            backgroundImage: goalsBackground ? `url(${goalsBackground})` : 'none'}}>
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
