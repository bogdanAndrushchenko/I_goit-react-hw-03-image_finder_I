import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Component/Searchbar';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './Component/ImageGallery';

class App extends Component {
  state = {
    searchImage: '',
  };

  handleFormSearch = searchImage => {
    this.setState({ searchImage });
  };

  render() {
    const { searchImage } = this.state;
    return (
      <div className="App">
        <Searchbar onFormSubmit={this.handleFormSearch} />
        <ImageGallery query={searchImage} />

        <ToastContainer />
      </div>
    );
  }
}

export default App;
