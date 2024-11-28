import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { app } from '../../firebase';
import Loader from './loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from '../css/protectedRoute.module.css';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [bannerTitle, setBannerTitle] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [bannerText, setBannerText] = useState<string | null>(null);
    const [bannerBackground, setBannerBackground] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState<string>('');
    const [newImage, setNewImage] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [newText, setNewText] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);

    useEffect(() => {
        const db = getDatabase(app);
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (user) {
            setUserName(user.displayName || user.email || 'Usuario desconocido');
        }

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

        // Obtener el texto desde la ruta '/banner/texto'
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

    // Función para actualizar el título en Firebase
    const updateTitle = () => {
        const db = getDatabase(app);
        const titleRef = ref(db, 'banner/titulo');
        set(titleRef, newTitle)
            .then(() => {
                setBannerTitle(newTitle);
                setNewTitle('');
                toast.success('Título actualizado correctamente');
            })
            .catch((error) => {
                console.error('Error al actualizar el título: ', error);
                toast.error('Error al actualizar el título');
            });
    };

    //Función para actualizar el texto en Firebase
    const updateText = () => {
        const db = getDatabase(app);
        const textRef = ref(db, 'banner/texto');
        set(textRef, newText)
            .then(() => {
                setBannerText(newText);
                setNewText('');
                toast.success('Texto actualizado correctamente');
            })
            .catch((error) => {
                console.error('Error al actualizar el texto: ', error);
                toast.error('Error al actualizar el texto');
            });
    };

    // Función para actualizar la imagen en Firebase
    const updateImage = () => {
        const db = getDatabase(app);
        const imageRef = ref(db, 'banner/imagen');
        set(imageRef, newImage)
            .then(() => {
                setBannerImage(newImage);
                setNewImage('');
                setImagePreview(null);
                toast.success('Imagen actualizada correctamente');
            })
            .catch((error) => {
                console.error('Error al actualizar la imagen: ', error);
                toast.error('Error al actualizar la imagen');
            });
    };

    // Función para actualizar el background en Firebase
    const updateBackground = () => {
        const db = getDatabase(app);
        const backgroundRef = ref(db, 'banner/background');
        set(backgroundRef, newImage)
            .then(() => {
                setBannerBackground(newImage);
                setNewImage('');
                setBackgroundPreview(null);
                toast.success('Background actualizado correctamente');
            })
            .catch((error) => {
                console.error('Error al actualizar el background: ', error);
                toast.error('Error al actualizar el background');
            });
    };

    // Función para manejar el cambio de imagen y convertirla a base64
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                setNewImage(base64Image);
                setImagePreview(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    // Función para manejar el cambio de background y convertirla a base64
    const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                setNewImage(base64Image);
                setBackgroundPreview(base64Image);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <section className={Style.adminL}>
            <ToastContainer />
            <div className={Style.bannerContent}>
                <h1 className={Style.adminTitle}>Hola {userName}</h1>

                {/* Mostrar el título de Firebase */}
                <div className={Style.tituloBanner}>
                    {bannerTitle ? (
                        <p>El título actual del banner es: "{bannerTitle}"</p>
                    ) : (
                        <Loader />
                    )}
                </div>

                {/* Formulario para actualizar el título */}
                <div className={Style.actualizarBanner}>
                    <h2>¿Quieres actualizar el título?</h2>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Nuevo título"
                        className={Style.inputFile}
                    />
                    <button className={Style.updateButton} onClick={updateTitle}>Actualizar Título</button>
                </div>

                {/* Mostrar el texto de Firebase */}
                <div className={Style.tituloBanner}>
                    {bannerText ? (
                        <p>El texto actual del banner es: "{bannerText}"</p>
                    ) : (
                        <Loader />
                    )}
                </div>

                {/* Formulario para actualizar el texto */}
                <div className={Style.actualizarBanner}>
                    <h2>¿Quieres actualizar el texto?</h2>
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="Nuevo texto"
                        className={Style.inputFile}
                    />
                    <button className={Style.updateButton} onClick={updateText}>Actualizar Texto</button>
                </div>

                {/* Formulario para actualizar la imagen */}
                <div className={Style.actualizarImagen}>
                    <h2>¿Quieres actualizar la imagen?</h2>
                    {/* Mostrar la imagen de Firebase */}
                    <div className={Style.imagenBanner}>
                        {bannerImage ? (
                            <img src={bannerImage} alt="Banner" className={Style.bannerImage} />
                        ) : (
                            <Loader />
                        )}
                    </div>
                    <div className={Style.botonActualizar}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={Style.inputFile}
                        />
                        {imagePreview && (
                            <div className={Style.previewContainer}>
                                <h3>Previsualización:</h3>
                                <img src={imagePreview} className={Style.previewImage} alt="Previsualización" style={{ width: '150px', height: 'auto' }} />
                            </div>
                        )}
                        <button className={Style.updateButton} onClick={updateImage}>Actualizar Imagen</button>
                    </div>
                </div>

                {/* Formulario para actualizar la imagen de fondo */}
                <div className={Style.actualizarImagen}>
                    <h2>¿Quieres actualizar la imagen de background?</h2>
                    {/* Mostrar la imagen de background de Firebase */}
                    <div className={Style.imagenBanner}>
                        {bannerBackground ? (
                            <img src={bannerBackground} alt="Banner" className={Style.bannerImage} />
                        ) : (
                            <Loader />
                        )}
                    </div>
                    <div className={Style.botonActualizar}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundChange}
                            className={Style.inputFile}
                        />
                        {imagePreview && (
                            <div className={Style.previewContainer}>
                                <h3>Previsualización:</h3>
                                <img src={imagePreview} className={Style.previewImage} alt="Previsualización" style={{ width: '150px', height: 'auto' }} />
                            </div>
                        )}
                        <button className={Style.updateButton} onClick={updateBackground}>Actualizar Background</button>
                    </div>
                </div>
            </div>

            <div className={Style.adminGoals}>
                <h2>Goals</h2>
            </div>

            <div className={Style.adminCarrousel}>
                <h2>Carrousel</h2>
                <span>
                    <p>Los íconos los pueden tomar de: </p>
                    <Link to="https://github.com/devicons/devicon/tree/v2.16.0/icons">SVG´s icons</Link>
                </span>
            </div>

            <div className={Style.adminJobs}>
                <h2>Jobs</h2>
            </div>
            
        </section>
    );
};

export default Admin;
