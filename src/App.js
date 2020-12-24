import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Searchbar from './Component/Searchbar';
import ImageGallery from './Component/ImageGallery';
import { Loader, Magnifier } from './Component/Loaders';
import Button from './Component/Button';

import getResource from './API_service/api_service';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);

  const { IDLE, PENDING, REJECTED, RESOLVED } = STATUS;

  useEffect(() => {
    scrollToNextPage();
  });

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus(PENDING);
    getAPI();
  }, [query, currentPage]);

  const handleFormSubmit = searchImage => {
    setImages([]);
    setCurrentPage(1);
    setQuery(searchImage);
  };

  const getAPI = () => {
    getResource(query, currentPage)
      .then(hits => {
        if (hits.length === 0) {
          toast.error('error', { autoClose: 2000 });
          setStatus(REJECTED);
          return;
        }
        setImages(images => [...images, ...hits]);
        setStatus(RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(REJECTED);
      });
  };

  const scrollToNextPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const loadMore = () => {
    setCurrentPage(p => p + 1);
  };

  return (
    <div className="App">
      <Searchbar onFormSubmit={handleFormSubmit} />
      {status === IDLE && (
        <Magnifier title={'Введите имя картинки для поиска'} />
      )}
      {status === PENDING && <Loader />}
      {status === REJECTED && (
        <>
          {error ? (
            error.message
          ) : (
            <Magnifier title={'Ненайдено! Попробуйте еще'} />
          )}
        </>
      )}
      {status === RESOLVED && (
        <>
          <ImageGallery images={images} />
          {images.length > 0 && <Button onLoadMore={loadMore} />}
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default App;
