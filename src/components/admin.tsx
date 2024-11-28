import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { app } from '../../firebase';
import Loader from './loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from '../css/protectedRoute.module.css';

const Admin = () => {
    const [bannerTitle, setBannerTitle] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [bannerText, setBannerText] = useState<string | null>(null);
    const [bannerBackground, setBannerBackground] = useState<string | null>(null);
    const [goalsBackground, setGoalsBackground] = useState<string | null>(null);
    const [carrouselBackground, setCarrouselBackground] = useState<string | null>(null);
    interface Tool { name: string, url: string }
    const [carrouselTools, setCarrouselTools] = useState<Tool[]>([]);
    const [newTitle, setNewTitle] = useState<string>('');
    const [newImage, setNewImage] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [newText, setNewText] = useState<string>('');
    const [newToolName, setNewToolName] = useState<string>('');
    const [newToolImage, setToolImage] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
    const [goalsBackgroundPreview, setGoalsBackgroundPreview] = useState<string | null>(null);
    const [carrouselBackgroundPreview, setCarrouselBackgroundPreview] = useState<string | null>(null);

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

        // Obtener el background desde la ruta '/goals/background'
        const goalsBackgroundRef = ref(db, 'goals/background');
        get(goalsBackgroundRef).then((snapshot) => {
            if (snapshot.exists()) {
                setGoalsBackground(snapshot.val());
            } else {
                console.log('No se encontró el background en la base de datos');
            }
        }).catch((error) => {
            console.error('Error al obtener el background: ', error);
        });

        // Obtener el background desde la ruta '/carrousel/background'
        const carrouselBackgroundRef = ref(db, 'carrousel/background');
        get(carrouselBackgroundRef).then((snapshot) => {
            if (snapshot.exists()) {
                setCarrouselBackground(snapshot.val());
            } else {
                console.log('No se encontró el background en la base de datos');
            }
        }).catch((error) => {
            console.error('Error al obtener el background: ', error);
        });

        // Obtener el background desde la ruta '/carrousel/tools'
        const toolsRef = ref(db, 'carrousel/tools');
        get(toolsRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const toolsData = snapshot.val();
                    // Convertir los datos a un formato adecuado
                    const toolsArray: Tool[] = Object.keys(toolsData).map(key => ({
                        name: key,
                        url: toolsData[key],
                    }));
                    setCarrouselTools(toolsArray); // Almacenar el array de objetos con 'name' y 'url'
                } else {
                    console.log('No se encontraron tools en la base de datos');
                }
        }).catch((error) => {
            console.error('Error al obtener tools: ', error);
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

    // Función para agregar una herramienta a Firebase
    const addTool = () => {
        if (!newToolName || !newToolImage) {
            toast.error('Por favor, completa ambos campos antes de agregar la herramienta');
            return;
        }
        const db = getDatabase(app);
        const newToolKey = newToolName;
        const toolsRef = ref(db, `carrousel/tools/${newToolKey}`);

        // Añadir la nueva herramienta a Firebase
        set(toolsRef, newToolImage)
        .then(() => {
            // Actualizar el estado con la nueva herramienta
            setCarrouselTools((prevTools) => [
                ...prevTools,
                { name: newToolName, url: newToolImage },
            ]);
            setNewToolName('');
            setToolImage('');
            toast.success('Herramienta agregada correctamente');
        })
        .catch((error) => {
            console.error('Error al agregar la herramienta: ', error);
            toast.error('Error al agregar la herramienta');
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

    // Función para actualizar el background de goals en Firebase
    const updateGoalsBackground = () => {
        const db = getDatabase(app);
        const goalsBackgroundRef = ref(db, 'goals/background');
        set(goalsBackgroundRef, newImage)
            .then(() => {
                setGoalsBackground(newImage);
                setNewImage('');
                setGoalsBackgroundPreview(null);
                toast.success('Background de goals actualizado correctamente');
            })
            .catch((error) => {
                console.error('Error al actualizar el background de goals: ', error);
                toast.error('Error al actualizar el background de goals');
            });
    };

    // Función para actualizar el background de carrousel en Firebase
    const updateCarrouselBackground = () => {
        const db = getDatabase(app);
        const carrouselBackgroundRef = ref(db, 'carrousel/background');
        set(carrouselBackgroundRef, newImage)
            .then(() => {
                setCarrouselBackground(newImage);
                setNewImage('');
                setCarrouselBackgroundPreview(null);
                toast.success('Background de carrousel actualizado correctamente');
            })
            .catch((error) => {
                console.error('Error al actualizar el background de carrousel: ', error);
                toast.error('Error al actualizar el background de carrousel');
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

    // Función para manejar el cambio de imagen de background y convertirla a base64
    const handleBackgroundBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    };

    // Función para manejar el cambio de imagen de background de goals y convertirla a base64
    const handleBackgroundGoalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                setNewImage(base64Image);
                setGoalsBackgroundPreview(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    // Función para manejar el cambio de imagen de background de carrousel y convertirla a base64
    const handleBackgroundCarrouselChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                setNewImage(base64Image);
                setCarrouselBackgroundPreview(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className={Style.adminL}>
            <ToastContainer />
            <div className={Style.bannerContent}>
                <h1 className={Style.adminTitle}>Hola {userName}</h1>

                <h2>Banner Section:</h2>

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
                            <img src={bannerImage} alt="Logo" className={Style.bannerImage} />
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
                                <img src={imagePreview} className={Style.previewImage} alt="Previsualización" />
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
                            onChange={handleBackgroundBannerChange}
                            className={Style.inputFile}
                        />
                        {backgroundPreview && (
                            <div className={Style.previewContainer}>
                                <h3>Previsualización:</h3>
                                <img src={backgroundPreview} className={Style.previewImage} alt="Previsualización" />
                            </div>
                        )}
                        <button className={Style.updateButton} onClick={updateBackground}>Actualizar Background</button>
                    </div>
                </div>
            </div>

            <div className={Style.adminGoals}>
                <h2>Goals Section:</h2>

                {/* Formulario para actualizar la imagen de fondo */}
                <div className={Style.actualizarImagen2}>
                    <h2>¿Quieres actualizar la imagen de background?</h2>
                    {/* Mostrar la imagen de background de Firebase */}
                    <div className={Style.imagenBanner}>
                        {goalsBackground ? (
                            <img src={goalsBackground} alt="Goals" className={Style.bannerImage} />
                        ) : (
                            <Loader />
                        )}
                    </div>
                    <div className={Style.botonActualizar}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundGoalsChange}
                            className={Style.inputFile}
                        />
                        {goalsBackgroundPreview && (
                            <div className={Style.previewContainer}>
                                <h3>Previsualización:</h3>
                                <img src={goalsBackgroundPreview} className={Style.previewImage} alt="Previsualización" />
                            </div>
                        )}
                        <button className={Style.updateButton} onClick={updateGoalsBackground}>Actualizar Background</button>
                    </div>
                </div>
            </div>

            <div className={Style.adminCarrousel}>
                <h2>Carrousel Section:</h2>
                <span>
                    <p>Los íconos los pueden tomar de: </p>
                    <a href="https://github.com/devicons/devicon/tree/v2.16.0/icons" target="_blank" rel="noopener noreferrer">SVG´s icons</a>
                </span>

                {/* Mostrar las herramientas de Firebase */}
                <div className={Style.tituloBanner}>
                    {carrouselTools.length > 0 ? (
                        <>
                            <p>Las herramientas actuales son:</p>
                            <div className={Style.toolsContainer}>
                                {carrouselTools.map((tool, index) => (
                                    <div key={index} className={Style.toolItem}>
                                        <img
                                            src={tool.url}
                                            alt={tool.name}
                                            height="50"
                                            className={Style.toolImage}
                                        />
                                        <p>{tool.name}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>

                {/* Formulario para agragar tools */}
                <div className={Style.actualizarBanner}>
                    <h2>¿Quieres agregar una nueva herramienta?</h2>
                    <input
                        type="text"
                        value={newToolName}
                        onChange={(e) => setNewToolName(e.target.value)}
                        placeholder="Nombre de la nueva herramienta"
                        className={Style.inputFile}
                    />
                    <input
                        type="text"
                        value={newToolImage}
                        onChange={(e) => setToolImage(e.target.value)}
                        placeholder="URL de la nueva herramienta"
                        className={Style.inputFile}
                    />
                    <button className={Style.updateButton} onClick={addTool}>Agregar herramienta</button>
                </div>

                {/* Formulario para actualizar la imagen de fondo */}
                <div className={Style.actualizarImagen}>
                    <h2>¿Quieres actualizar la imagen de background?</h2>
                    {/* Mostrar la imagen de background de Firebase */}
                    <div className={Style.imagenBanner}>
                        {carrouselBackground ? (
                            <img src={carrouselBackground} alt="Goals" className={Style.bannerImage} />
                        ) : (
                            <Loader />
                        )}
                    </div>
                    <div className={Style.botonActualizar}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundCarrouselChange}
                            className={Style.inputFile}
                        />
                        {carrouselBackgroundPreview && (
                            <div className={Style.previewContainer}>
                                <h3>Previsualización:</h3>
                                <img src={carrouselBackgroundPreview} className={Style.previewImage} alt="Previsualización" />
                            </div>
                        )}
                        <button className={Style.updateButton} onClick={updateCarrouselBackground}>Actualizar Background</button>
                    </div>
                </div>
            </div>

            <div className={Style.adminJobs}>
                <h2>Jobs Section:</h2>
            </div>

        </section>
    );
};

export default Admin;
