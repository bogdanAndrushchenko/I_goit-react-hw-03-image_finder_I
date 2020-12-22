import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Loader, Magnifier } from '../Loaders';
import Button from '../Button';
import ImageGalleryItem from '../ImageGalleryItem';

import ari_service from '../../API_service/api_service';

import './ImageGallery.scss';

const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    scrollToNextPage();
  });

  useEffect(() => {
    console.log('useEffect');
    if (!query) {
      return;
    }
    setImages([]);
    setCurrentPage(1);
    setStatus('pending');
    getAPI();
    console.log(currentPage);
  }, [query]);

  useEffect(() => {});

  // const loadMore = () => {
  //     setCurrentPage(page => page + 1)
  // }

  const getAPI = () => {
    ari_service
      .getResource(query, currentPage)
      .then(images => {
        const { hits } = images;
        if (hits.length === 0) {
          toast.error('error', { autoClose: 2000 });
          setStatus('rejected');
          return;
        }
        setImages(images => [...images, ...hits]);
        setCurrentPage(p => p + 1);
        setStatus('resolved');
        console.log('getAPI()', currentPage);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const scrollToNextPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  if (status === 'idle')
    return <Magnifier title={'Введите имя картинки для поиска'} />;
  if (status === 'pending') return <Loader />;
  if (status === 'rejected') {
    return (
      <>
        {error ? (
          error.message
        ) : (
          <Magnifier title={'Ненайдено! Попробуйте еще'} />
        )}
      </>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <ImageGalleryItem images={images} />
        {images.length > 0 && <Button onLoadMore={getAPI} />}
      </>
    );
  }
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
