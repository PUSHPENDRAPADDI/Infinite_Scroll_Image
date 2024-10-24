import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

const items = process.env.REACT_APP_OPTION_TYPE.split(',');
const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [firstVisit, setFirstVisit] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  const [random, setRandom] = useState(Math.floor(Math.random() * items.length));

  const fetchImages = useCallback(async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${items[random]}&image_type=photo&orientation=horizontal&pretty=true&page=${pageNumber}`);
      const data = await response.json();
      if (data.hits.length === 0) {
        setPage(1);
        setRandom(Math.floor(Math.random() * items.length));
        setImages([]);
      } else {
        setImages((prevImages) => [...prevImages, ...data.hits]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, random]);

  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage({});
  };
  useEffect(() => {
    fetchImages(page);
  }, [fetchImages, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (firstVisit && window.scrollY > 0) {
        setFirstVisit(false);
      }
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        if (!loading) {
          setRandom(Math.floor(Math.random() * items.length));
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, firstVisit]);

  return (
    <div className="App">
      {firstVisit && (
        <div className="header">
          <h2>Let’s start scrolling for images</h2>
        </div>
      )}

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image-block" key={index}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => openModal(image)} />
            <div className="overlays">
              <span>&#128065; <span className='text-image'> {image.likes}</span></span>
              <span>&#10084; <span className='text-image'> {image.likes}</span></span>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={currentImage.largeImageURL} alt="Modal" />
        </div>
      )}
      {loading && <div className="loader-container"><div className="loader"></div></div>}
    </div>
  );
};

export default App;

