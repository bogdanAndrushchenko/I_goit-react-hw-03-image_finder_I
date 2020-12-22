import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './SearchForm.scss';

const SearchForm = ({ onFormSubmit }) => {
  const [searchImage, setSearchImage] = useState('');

  const handleInputChange = e => {
    const { value } = e.currentTarget;
    setSearchImage(value.toLowerCase());
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    if (searchImage.trim() === '') {
      toast.dark('Please enter request', { autoClose: 2000 });
      return;
    }
    onFormSubmit(searchImage);
    resetForm();
  };

  const resetForm = () => {
    setSearchImage('');
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmitForm}>
      <button type="submit" className="SearchForm-button">
        <span className="SearchForm-button-label">Search</span>
      </button>

      <input
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="searchImage"
        value={searchImage}
        onChange={handleInputChange}
      />
    </form>
  );
};

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
