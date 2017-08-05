import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';

var RenderItem = function RenderItem(_ref) {
  var children = _ref.children,
      Child = _ref.Child,
      handleFocus = _ref.handleFocus,
      onClick = _ref.onClick,
      selectedIndex = _ref.selectedIndex,
      selectIndex = _ref.selectIndex,
      otherProps = _objectWithoutProperties(_ref, ['children', 'Child', 'handleFocus', 'onClick', 'selectedIndex', 'selectIndex']);

  return function (_ref2) {
    var index = _ref2.index,
        style = _ref2.style;

    var handleOnClick = function handleOnClick(props) {
      return function () {
        // event.stopPropagation();
        selectIndex(index);
        onClick(props);
      };
    };
    /* The style property contains the item's absolute position */
    var itemProps = children[index] || {};
    var onFocus = function onFocus(idx) {
      return function (event) {
        return handleFocus(idx, event);
      };
    };
    return React.createElement(
      'div',
      {
        key: itemProps.id,
        style: _extends({}, style, { boxSizing: 'border-box' })
      },
      React.createElement(Child, _extends({
        onFocus: onFocus(index),
        onClick: handleOnClick(itemProps),
        key: itemProps.id,
        selected: index === selectedIndex,
        index: index
      }, itemProps, otherProps))
    );
  };
};

export default RenderItem;
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/components/RenderItem.js.map