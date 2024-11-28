import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../firebase';
import Loader from './loader';
import Style from '../css/carrousel.module.css';

const Carrousel = () => {

    const [carrouselTools, setCarrouselTools] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [carrouselsBackground, setCarrouselBackground] = useState<string | null>(null);

    useEffect(() => {
        const db = getDatabase(app);
        const toolsRef = ref(db, 'carrousel/tools');

        get(toolsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const toolsData = snapshot.val();
                    const toolsArray = Object.values(toolsData) as string[];
                    setCarrouselTools(toolsArray);
                } else {
                    console.log('No se encontraron tools en la base de datos');
                }
            })
            .catch((error) => {
                console.error('Error al obtener tools: ', error);
            })
            .finally(() => {
                setLoading(false);
            });

            // Obtener el background desde la ruta '/carrousel/background'
        const backgroundRef = ref(db, 'carrousel/background');
        get(backgroundRef).then((snapshot) => {
            if (snapshot.exists()) {
                setCarrouselBackground(snapshot.val());
            } else {
                console.log('No se encontró el background en la base de datos');
            }
        }).catch((error) => {
            console.error('Error al obtener el background: ', error);
        });

    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className={Style.sectionC} style={{
            backgroundImage: carrouselsBackground ? `url(${carrouselsBackground})` : 'none'}}>
            <div style={{ display: 'grid', placeItems: 'center', textAlign: 'center', color: 'white' }}>
                <h1 className={Style.titleC}>Herramientas conocidas por el equipo</h1>
            </div>
            <div className={Style.tools}>
                {[...Array(2)].map((_, i) => (
                    <div key={`slide-${i}`} className={Style.toolsSlide}>
                        {carrouselTools.map((src, index) => (
                            <img key={index} src={src} height="50" alt={`logo`} />
                        ))}
                    </div>
                ))}
            </div>
            <div className={Style.tools}>
                {[...Array(2)].map((_, i) => (
                    <div key={`slide2-${i}`} className={Style.toolsSlide2}>
                        {carrouselTools.map((src, index) => (
                            <img key={index} src={src} height="50" alt={`logo`} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carrousel;
