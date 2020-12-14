import { Component } from 'react';
import { toast } from 'react-toastify';
import { Loader, Magnifier } from '../Loaders';
import Button from '../Button';
import ImageGalleryItem from '../ImageGalleryItem';

import ari_service from '../../API_service/api_service';

import './ImageGallery.scss';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    currentPage: 1,
    searchImage: '',
  };

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
          searchImage: query,
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  componentDidUpdate(prevProps, prevState) {
    // const {searchImage} = this.state;
    const { query } = this.props;
    // this.setState({images: [], currentPage: 1})
    if (prevProps.query !== query) {
      this.setState({ status: 'pending' });
      console.log('componentDidUpdate');
      this.getAPI();
    }
  }

  render() {
    const { images, error, status } = this.state;
    console.log(status, error, images);

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
          <ul className="ImageGallery">
            <ImageGalleryItem images={images} />
          </ul>
          <Button onBtnClick={this.getAPI} />
        </>
      );
    }
  }
}

export default ImageGallery;
