import React from 'react';
import { connect } from 'react-redux';
import VirtualList from 'react-tiny-virtual-list';
import { scrollToAction, scrollToPositionAction, generateLeftAction, generateRightAction, selectIndexAction } from '../actions';
import { CALENDAR_TRESHOLD, CALENDAR_ITEM_WIDTH, CALENDAR_ITEM_HEIGHT } from '../constants';
import RenderItem from './RenderItem';
import { idxToPosition, positionToIdx } from '../helpers';
import { CalendarCss, SpecialFontCss } from '../styles';

const noop = () => {};

class CalendarScroll extends React.Component {
  static defaultProps = {
    Child: {}, // required props
    children: [], // required props
    width: window.innerWidth, // required props
    overscanCount: CALENDAR_TRESHOLD * 2, // ownProps
    childWidth: CALENDAR_ITEM_WIDTH, // ownProps
    height: CALENDAR_ITEM_HEIGHT, // ownProps
    scrolledPosition: 0, // ownProps
    scrolledIndex: 0, // ownProps
    selectedIndex: -1, // ownProps
    scrollTo: noop, // ownProps
    generateLeft: noop, // ownProps
    generateRight: noop, // ownProps
    selectIndex: noop, // ownProps
  }
  constructor(props) {
    super(props);
    this.handleScroll = ::this.handleScroll;
    this.handleFocus = ::this.handleFocus;
  }

  componentWillReceiveProps(nextProps) {
    const {
      // selectedIndex: oldSelectedIndex,
      scrolledIndex,
      // scrolledPosition: oldPosition,
      } = this.props;
    const {
      scrolledPosition: nextPosition,
      scrollToPosition,
      width: nextWidth,
      scrolledIndex: nextIndex,
      // selectedIndex,
      scrollTo,
      generateLeft,
      generateRight,
      children: { length: nextLength },

    } = nextProps;
    if (scrolledIndex !== nextIndex) {
      if (nextIndex < CALENDAR_TRESHOLD) {
        const calculatedPosition = CALENDAR_TRESHOLD * CALENDAR_ITEM_WIDTH;
        const newPosition = calculatedPosition + nextPosition;
        generateLeft(CALENDAR_TRESHOLD);
        const currentIdx = positionToIdx(newPosition, nextWidth);
        scrollToPosition(newPosition);
        scrollTo(currentIdx);
      }
      if (nextIndex > nextLength - CALENDAR_TRESHOLD) {
        generateRight(CALENDAR_TRESHOLD);
      }
    }
  }

  scrollTimer(scrollOffset /* , event */) {
    const {
      width: appWidth,
      scrolledIndex,
      scrolledPosition,
      scrollToPosition,
      scrollTo = noop,
    } = this.props;
    const centerIdx = positionToIdx(
      scrollOffset,
      appWidth);
    if (scrolledIndex !== centerIdx ||
      scrolledPosition !== scrollOffset) {
      scrollToPosition(scrollOffset);
      scrollTo(centerIdx);
    }
  }

  handleScroll(scrolledPosition, event) {
    if (this.scrollTimerID) {
      clearTimeout(this.scrollTimerID);
    }
    this.scrollTimerID = setTimeout(() =>
      this.scrollTimer(scrolledPosition, event),
      200);
  }

  focusTimer(index) {
    if (this.props.scrolledIndex !== index) {
      this.props.scrollTo(index);
      const newPosition = idxToPosition(
        index,
        this.props.width);
      this.props.scrollToPosition(newPosition);
    }
  }

  handleFocus(index, event) {
    if (this.focusTimerID) {
      clearTimeout(this.focusTimerID);
    }
    this.focusTimerID = setTimeout(
      () => this.focusTimer(index, event),
      200);
  }

  render() {
    const {
    Child,
    children,
    width,
    scrollTo,
    overscanCount,
    childWidth,
    height,
    scrolledPosition,
    scrolledIndex,
    selectedIndex,
    selectIndex,
    ...otherProps // childProps
    } = this.props;

    const childrenLength = children.length;
    // const handleWheel = (event) => {
    //   event.preventDefault();
    //   const delta = event.deltaY;
    //   if (delta < 0 && scrolledIndex > 0) {
    //     scrollLeft(1);
    //   }
    //   if (delta > 0 && scrolledIndex < childrenLength - 1) {
    //     scrollRight(1);
    //   }
    // };

    const list = (
      <VirtualList
        width={width}
        height={height}
        itemCount={childrenLength}
        itemSize={childWidth} // Also supports variable heights (array or function getter)
        renderItem={RenderItem({
          children,
          Child,
          handleFocus: this.handleFocus,
          selectedIndex,
          selectIndex,
          ...otherProps,
        })}
        scrollDirection='horizontal'
        scrollOffset={scrolledPosition}
        overscanCount={overscanCount}
        onScroll={this.handleScroll}
        // onWheel={handleWheel}
      />);
    return (
      <div>
        <div className={CalendarCss.monthContainer}>
          <p className={CalendarCss.month}>
            <span className={SpecialFontCss.iconFont} >
              &#xf133;
            </span>
            {`   ${children[scrolledIndex].month}`}
          </p>
        </div>
        <div className={CalendarCss.container}>
          {list}
        </div>
        <div className={CalendarCss.margin} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  scrolledIndex: state.scrollState && state.scrollState.scrollToIndex,
  scrolledPosition: state.scrollState && state.scrollState.scrolledPosition,
  selectedIndex: state.scrollState && state.scrollState.selectedIndex,
});
const mapDispathcToProps = dispatch => ({
  scrollTo: payload => dispatch(scrollToAction(payload)),
  scrollToPosition: payload => dispatch(scrollToPositionAction(payload)),
  generateRight: payload => dispatch(generateRightAction(payload)),
  generateLeft: payload => dispatch(generateLeftAction(payload)),
  selectIndex: payload => dispatch(selectIndexAction(payload)),
});

export default connect(mapStateToProps, mapDispathcToProps)(CalendarScroll);
