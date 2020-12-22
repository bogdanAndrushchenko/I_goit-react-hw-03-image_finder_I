import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Component/Searchbar';
import ImageGallery from './Component/ImageGallery';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchImage, setSearchImage] = useState('');

  return (
    <div className="App">
      <Searchbar onFormSubmit={setSearchImage} />
      <ImageGallery query={searchImage} />

      <ToastContainer />
    </div>
  );
};

export default App;
