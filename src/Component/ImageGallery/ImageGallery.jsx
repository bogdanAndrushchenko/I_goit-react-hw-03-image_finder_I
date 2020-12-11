import { Component } from 'react';
import { toast } from 'react-toastify';
import { Loader, Magnifier } from '../Loaders';
// import  from "../Loaders";
import ImageGalleryItem from '../ImageGalleryItem';

import ari_service from '../../API_service/api_service';

import './ImageGallery.scss';
import Button from '../Button';

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchImage } = this.props;
    if (prevProps.searchImage !== searchImage) {
      this.setState({ status: 'pending' });
      ari_service
        .getResource(searchImage)
        .then(images => {
          const { hits } = images;
          if (hits.length === 0) {
            toast.error('error', { autoClose: 2000 });
            this.setState({ status: 'rejected' });
            return;
          }
          this.setState({
            images: hits,
            status: 'resolved',
          });
          console.log(images);
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, error, status } = this.state;
    console.log(status, error);

    if (status === 'idle')
      return <Magnifier title={'Введите имя для поиска'} />;
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
          <ul className="ImageGallery">
            <ImageGalleryItem images={images} />
          </ul>
          <Button />
        </>
      );
    }
  }
}

export default ImageGallery;
