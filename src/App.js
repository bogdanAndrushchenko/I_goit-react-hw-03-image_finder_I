import { Component } from 'react';
import Searchbar from './Component/Searchbar';

import './App.css';

class App extends Component {
  state = {
    searchImage: '',
  };

  handleFormSearch = searchImage => {
    this.setState({ searchImage });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onFormSubmit={this.handleFormSearch} />
      </div>
    );
  }
}

export default App;
