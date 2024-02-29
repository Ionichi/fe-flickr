import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

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
        <div className='container p-3'>
            <h1 className='mb-3'>Gambar Feeds</h1>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 500: 2, 750: 3, 900: 3, 1000: 4, 1200: 5}}>    
                <Masonry gutter='10px'>
                    {images.map((image, index) => (
                        <div className="column" key={`column ${index}`}>
                            <div className="photo">
                                <img key={index} src={image.media.m} alt={`Gambar ${index}`} height={200} className='img-fluid' />
                            </div>
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
};

export default ImageFeed;