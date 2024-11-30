import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../firebase';
import Loader from './loader';
import Style from '../css/hero.module.css';

interface SectionProps {
    id: string;
}

const HeroSection: React.FC<SectionProps> = ({ id }) => {
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [bannerTitle, setBannerTitle] = useState<string | null>(null);
    const [bannerText, setBannerText] = useState<string | null>(null);
    const [bannerBackground, setBannerBackground] = useState<string | null>(null);

    useEffect(() => {
        const db = getDatabase(app);

        // Obtener la imagen desde la ruta '/banner/imagen'
        const imageRef = ref(db, 'banner/imagen');
        get(imageRef).then((snapshot) => {
            if (snapshot.exists()) {
                setBannerImage(snapshot.val());
            } else {
                console.log('No se encontró la imagen en la base de datos');
            }
        }).catch((error) => {
            console.error('Error al obtener la imagen: ', error);
        });

        // Obtener el título desde la ruta '/banner/titulo'
        const titleRef = ref(db, 'banner/titulo');
        get(titleRef).then((snapshot) => {
            if (snapshot.exists()) {
                setBannerTitle(snapshot.val());
            } else {
                console.log('No se encontró el título en la base de datos');
            }
        }).catch((error) => {
            console.error('Error al obtener el título: ', error);
        });

        // Obtener el texto desde la ruta '/banner/texto
        const textRef = ref(db, 'banner/texto');
        get(textRef).then((snapshot) => {
            if (snapshot.exists()) {
                setBannerText(snapshot.val());
            } else {
                console.log('No se encontró el texto en la base de datos');
            }
        }).catch((error) => {
            console.error('Error al obtener el texto: ', error);
        });

        // Obtener el background desde la ruta '/banner/background'
        const backgroundRef = ref(db, 'banner/background');
        get(backgroundRef).then((snapshot) => {
            if (snapshot.exists()) {
                setBannerBackground(snapshot.val());
            } else {
                console.log('No se encontró el background en la base de datos');
            }
        }).catch((error) => {
            console.error('Error al obtener el background: ', error);
        });
    }, []);

    return (
        <section className={Style.sectionH} id={id} style={{
            backgroundImage: bannerBackground ? `url(${bannerBackground})` : 'none'}}>
            <div className={Style.containerH}>
                {bannerTitle ? (
                    <span>
                        <h1>{bannerTitle}</h1>
                        <p>{bannerText}</p>
                    </span>
                ) : (
                    <Loader />
                )}

                {bannerImage ? (
                    <img src={bannerImage} alt="Banner" className={Style.bannerImage} />
                ) : (
                    <p></p>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
