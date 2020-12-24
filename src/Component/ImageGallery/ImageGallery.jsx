import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

import './ImageGallery.scss';

const ImageGallery = ({ images }) => {
  return (
    <ul>
      <ImageGalleryItem images={images} />
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
