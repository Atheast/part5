import React,{useState, useImperativeHandle} from 'react';

// eslint-disable-next-line react/display-name
const Toggable = React.forwardRef((props,ref) => {
  const [display, setDisplay] = useState(false);

  const toggleVisibility = () => {
    setDisplay(!display);
  };

  const show = {
    display: (display) ? 'none' : ''
  };

  const hide = {
    display: (display) ? '' : 'none'
  };

  useImperativeHandle(ref, () => {
    return {toggleVisibility};
  });

  return(
    <div>
      <div style={hide}>
        {props.children.map(x => x)}
        <button className="cancel" onClick={toggleVisibility}>Cancel</button>
      </div>
      <div style={show}>
        <button className="show" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
    </div>
  );
});

export default Toggable;