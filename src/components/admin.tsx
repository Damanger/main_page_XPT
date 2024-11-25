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
    const [newTitle, setNewTitle] = useState<string>('');
    const [newImage, setNewImage] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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

    return (
        <div>
            <ToastContainer />
            <h1 className={Style.adminTitle}>Hola {userName}</h1>

            {/* Mostrar el título de Firebase */}
            <div className={Style.tituloBanner}>
                {bannerTitle ? (
                    <p>El título actual del banner es: {bannerTitle}</p> 
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

            {/* Mostrar la imagen de Firebase */}
            <div className={Style.imagenBanner}>
                {bannerImage ? (
                    <img src={bannerImage} alt="Banner" className={Style.bannerImage} />
                ) : (
                    <Loader />
                )}
            </div>

            {/* Formulario para actualizar la imagen */}
            <div className={Style.actualizarImagen}>
                <h2>¿Quieres actualizar la imagen?</h2>
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
        </div>
    );
};

export default Admin;
