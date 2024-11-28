import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../firebase';
import Loader from './loader';
import Style from '../css/hero.module.css';

const HeroSection = () => {
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [bannerTitle, setBannerTitle] = useState<string | null>(null);

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
    }, []);

    return (
        <section className={Style.sectionH}>
            <div className={Style.containerH}>
                {bannerTitle ? (
                    <h1>{bannerTitle}</h1>
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
