import './Button.scss';

const Button = ({ onBtnClick }) => {
  return (
    <button type="button" className="Button" onClick={onBtnClick}>
      Load more
    </button>
  );
};

export default Button;
