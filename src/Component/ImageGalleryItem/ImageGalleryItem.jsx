import { Component } from 'react';
import PropTypes from 'prop-types';

import './ImageGalleryItem.scss';
import Modal from '../Modal';

class ImageGalleryItem extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    modal: false,
    url: '',
    alt: '',
  };

  toggleModal = () => {
    this.setState(({ modal }) => ({
      modal: !modal,
    }));
  };

  setOptionsModal = e => {
    const { dataset, alt } = e.target;

    this.setState({
      url: dataset.source,
      alt: alt,
    });
  };

  render() {
    const { images } = this.props;
    const { modal, url, alt } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {images &&
            images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <li
                className="ImageGalleryItem"
                key={id}
                onClick={e => {
                  this.toggleModal();
                  this.setOptionsModal(e);
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
        {modal && <Modal url={url} alt={alt} onClose={this.toggleModal} />}
      </>
    );
  }
}

export default ImageGalleryItem;
