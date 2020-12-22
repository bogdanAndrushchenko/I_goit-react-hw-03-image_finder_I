import { useState } from 'react';
import PropTypes from 'prop-types';

import './ImageGalleryItem.scss';
import Modal from '../Modal';

const ImageGalleryItem = ({ images }) => {
  const [modal, setModal] = useState(false);
  const [url, setURL] = useState('');
  const [alt, setAlt] = useState('');

  const toggleModal = () => {
    setModal(modal => !modal);
  };

  const setOptionsModal = e => {
    const { dataset, alt } = e.target;

    setURL(dataset.source);
    setAlt(alt);
  };

  return (
    <>
      <ul className="ImageGallery">
        {images &&
          images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li
              className="ImageGalleryItem"
              key={id}
              onClick={e => {
                toggleModal();
                setOptionsModal(e);
              }}
            >
              <img
                src={webformatURL}
                alt={tags}
                data-source={largeImageURL}
                className="ImageGalleryItem-image"
              />
            </li>
          ))}
      </ul>
      {modal && <Modal url={url} alt={alt} onClose={toggleModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGalleryItem;
