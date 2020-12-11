import PropTypes from 'prop-types';

import './ Magnifier.scss';

const Magnifier = ({ title }) => {
  return (
    <div className="Magnifier">
      <h3>{title}</h3>
      <div className="loadingio-spinner-magnify-fbxdd69ymcl">
        <div className="ldio-fccru7n993">
          <div>
            <div>
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Magnifier.propTypes = {
  title: PropTypes.string,
};

export default Magnifier;
