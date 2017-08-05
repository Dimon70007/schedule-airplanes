import React from 'react';

const RenderItem = ({
  children,
  Child,
  handleFocus,
  onClick,
  selectedIndex,
  selectIndex,
  ...otherProps
}) => ({ index, style }) => {
  const handleOnClick = props => () => {
    // event.stopPropagation();
    selectIndex(index);
    onClick(props);
  };
    /* The style property contains the item's absolute position */
  const itemProps = children[index] || {};
  const onFocus = idx => event => handleFocus(idx, event);
  return (
    <div
      key={itemProps.id}
      style={{ ...style, boxSizing: 'border-box' }}
    >
      <Child
        onFocus={onFocus(index)}
        onClick={handleOnClick(itemProps)}
        key={itemProps.id}
        selected={index === selectedIndex}
        index={index}
        {...itemProps}
        {...otherProps}
      />
    </div>);
};

export default RenderItem;
