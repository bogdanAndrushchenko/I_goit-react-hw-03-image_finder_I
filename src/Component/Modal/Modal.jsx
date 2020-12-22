import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import './Modal.scss';

const modalRoot = document.getElementById('#modal-root');

const Modal = ({ url, alt, onClose }) => {
  const handleCloseModal = e => {
    const { code, target, currentTarget } = e;
    if (code === 'Escape' || currentTarget === target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  });

  return createPortal(
    <div className="Overlay" onClick={handleCloseModal}>
      <div className="Modal">
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
