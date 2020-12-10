import { Component } from 'react';

import './ImageGallery.scss';

class ImageGallery extends Component {
  state = {
    searchImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchImage } = this.props;
    if (prevProps.searchImage !== searchImage) {
      fetch(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchImage}&page=12&key=18613871-d09d7f4d1ad86f8a51a1289a6`,
      )
        .then(res => res.json())
        .then(console.log);
    }
  }

  render() {
    const { searchImage } = this.props;
    return <ul className="ImageGallery">{searchImage}</ul>;
  }
}

export default ImageGallery;
