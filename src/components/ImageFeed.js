import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ImageFeed = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/images')
                setImages(response.data.items);
            }
            catch (error) {
                console.error("Error fetching images: ", error);
            }
        };
        fetchImages();
    }, []);

    return (
        <div>
            <h1>Image Feeds</h1>
            <div>
                {images.map((image, index) => (
                    <img key={index} src={image.media.m} alt={`Gambar ${index}`} />
                ))}
            </div>
        </div>
    );
};

export default ImageFeed;