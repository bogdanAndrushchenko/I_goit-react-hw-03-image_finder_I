import PropTypes from 'prop-types';

import './ImageGalleryItem.scss';

const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images &&
        images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <li className="ImageGalleryItem" key={id}>
            <img
              src={webformatURL}
              alt={tags}
              data-source={largeImageURL}
              className="ImageGalleryItem-image"
            />
          </li>
        ))}
    </>
  );
};
ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
export default ImageGalleryItem;
