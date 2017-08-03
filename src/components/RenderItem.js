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
    /* The style property contains the item's absolute position */
  const itemProps = children[index] || {};
  const handleOnClick = props => (event) => {
    // event.stopPropagation();
    console.log('onClickEvemt', event);
    selectIndex(index);
    onClick(props);
  };
  const onFocus = idx => event => handleFocus(idx, event);
  return (
    <div
      key={itemProps.id}
      style={{ ...style, 'box-sizing': 'border-box' }}
      onFocus={onFocus(index)}
      role='button'
      tabIndex={-1}
    >
      <Child
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
