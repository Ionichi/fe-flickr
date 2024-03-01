import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

const ImageFeed = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/images', { params: { page: currentPage } });
                setImages(response.data.items);
                setCurrentPage(response.data.currentPage);
                setTotalPage(response.data.total_page);
            }
            catch (error) {
                console.error("Error fetching images: ", error);
            }
        };
        
        fetchImages();
    }, [currentPage]);

    const prevPage = () => {
        setCurrentPage((page_index) => Math.max(page_index - 1, 1));
    };

    const nextPage = () => {
        setCurrentPage((page_index) => page_index + 1);
    };

    const choosePage = (page_index) => {
        setCurrentPage(page_index);
    };

    
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

            <div className="row justify-content-center mt-3">
                <nav aria-label='...'>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button onClick={prevPage} disabled={currentPage === 1} className="page-link">Previous</button>
                        </li>

                        {[...Array(totalPage)].map((_, index) => (
                            <li className={`page-item ${(index + 1 === currentPage) ? 'active': ''}`} key={index + 1} onClick={() => choosePage(index + 1)}>
                                <span className="page-link">{index + 1}</span>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                            <button onClick={nextPage} disabled={currentPage === totalPage} className="page-link">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ImageFeed;