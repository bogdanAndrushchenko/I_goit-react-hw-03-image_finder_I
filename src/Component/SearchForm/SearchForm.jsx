import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './SearchForm.scss';

const INITIAL_STATE_FORM = {
  searchImage: '',
};

class SearchForm extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  state = {
    ...INITIAL_STATE_FORM,
  };

  handleInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ searchImage: value.toLowerCase() });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    const { onFormSubmit } = this.props;
    const { searchImage } = this.state;
    if (searchImage.trim() === '') {
      toast.dark('Please enter request', { autoClose: 2000 });
      return;
    }
    onFormSubmit(searchImage);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ ...INITIAL_STATE_FORM });
  };

  render() {
    const { searchImage } = this.state;
    return (
      <form className="SearchForm" onSubmit={this.handleSubmitForm}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">{/*Search*/}</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchImage"
          value={searchImage}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

export default SearchForm;
