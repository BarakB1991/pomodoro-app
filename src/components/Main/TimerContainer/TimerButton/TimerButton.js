import './TimerButton.css';
import classNames from 'classnames';

const TimerButton = ({ name, children, onChange, active, className }) => {
  const classes = classNames('button', className, {
    button__secondary_clicked: active,
  });
  const handleClick = () => {
    onChange(name);
  };

  return (
    <button type='button' className={classes} onClick={handleClick}>
      {children}
    </button>
  );
};

export default TimerButton;

