import React from 'react';

const NavBtn = ({ onClick, children, ...otherProps }) => {
  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };
  return (
    <button
      onKeyPress={onKeyPress}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default NavBtn;
