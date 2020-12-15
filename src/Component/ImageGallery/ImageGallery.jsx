import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Loader, Magnifier } from '../Loaders';
import Button from '../Button';
import ImageGalleryItem from '../ImageGalleryItem';

import ari_service from '../../API_service/api_service';

import './ImageGallery.scss';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    error: null,
    status: 'idle',
    currentPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { currentPage } = this.state;

    if (prevProps.query !== query) {
      this.setState(
        {
          status: 'pending',
          images: [],
          currentPage: 1,
        },
        this.getAPI,
      );
    }

    if (prevState.currentPage !== currentPage) {
      this.scrollToNextPage();
    }
  }

  getAPI = () => {
    const { query } = this.props;
    const { currentPage } = this.state;
    ari_service
      .getResource(query, currentPage)
      .then(images => {
        const { hits } = images;
        if (hits.length === 0) {
          toast.error('error', { autoClose: 2000 });
          this.setState({ status: 'rejected' });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: 'resolved',
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  scrollToNextPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, error, status } = this.state;

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
          {images.length > 0 ? null : <Button onLoadMore={this.getAPI} />}
        </>
      );
    }
  }
}

export default ImageGallery;
