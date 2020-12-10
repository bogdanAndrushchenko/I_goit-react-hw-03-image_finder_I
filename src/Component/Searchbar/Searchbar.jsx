import PropTypes from 'prop-types';

import SearchForm from '../SearchForm';

import './Searchbar.scss';

const Searchbar = ({ onFormSubmit }) => {
  return (
    <header className="Searchbar">
      <SearchForm onFormSubmit={onFormSubmit} />
    </header>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
