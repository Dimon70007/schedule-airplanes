import React from 'react';
import { connect } from 'react-redux';
import VirtualList from 'react-tiny-virtual-list';
// import Visit from 'react-visit';
import { scrollLeftAction, scrollRightAction, scrollToAction, generateLeftAction, generateRightAction, selectIndexAction } from '../actions';
import { CALENDAR_TRESHOLD, VISIBLE_ITEMS_COUNT } from '../constants';
import NavBtn from './NavBtn';
import RenderItem from './RenderItem';
import { CalendarCss, SpecialFontCss } from '../styles';

const noop = () => {};

class CalendarScroll extends React.Component {

  constructor(props) {
    super(props);
    this.scrollLeftOne = ::this.scrollLeftOne;
    this.scrollRightOne = ::this.scrollRightOne;
    this.handleScroll = ::this.handleScroll;
    this.handleFocus = ::this.handleFocus;
  }

  componentDidUpdate() {
    const scrolledIndex = this.props.scrolledIndex;
    const length = this.props.children.length;
    if (scrolledIndex < VISIBLE_ITEMS_COUNT) {
      this.props.generateLeft(CALENDAR_TRESHOLD);
      this.props.scrollTo(CALENDAR_TRESHOLD + scrolledIndex);
    }
    if (scrolledIndex > length - VISIBLE_ITEMS_COUNT) {
      this.props.generateRight(CALENDAR_TRESHOLD);
    }
  }

  scrollLeftOne() { return this.props.scrolledIndex > 0 && this.props.scrollLeft(1); }

  scrollRightOne() {
    return this.props.scrolledIndex < this.props.children.length - 1 && this.props.scrollRight(1);
  }
  scrollTimer(scrolledPosition /* , event */) {
    const {
    children = [], // required props
    scrollTo = noop, // ownProps
  } = this.props;
    const childWidth = this.props.width / VISIBLE_ITEMS_COUNT;
    const viewportCenter = this.props.width / 2;
    const centerIdx = Math.trunc((scrolledPosition + viewportCenter) / childWidth);
    scrollTo(centerIdx);
  }

  handleScroll(scrolledPosition, event) {
    // event.preventDefault();
    event.stopPropagation();
    if (this.scrollTimerID) {
      clearTimeout(this.scrollTimerID);
    }
    this.scrollTimerID = setTimeout(() =>
      this.scrollTimer(scrolledPosition, event),
      500);
  }

  focusTimer(index /* , event*/) {
    if (this.props.scrolledIndex !== index) {
      this.props.scrollTo(index);
    }
  }

  handleFocus(index, event) {
    // event.preventDefault();
    if (this.focusTimerID) {
      clearTimeout(this.focusTimerID);
    }
    this.focusTimerID = setTimeout(() => this.focusTimer(index, event), 200);
  }

  render() {
    const {
    Child = {}, // required props
    children = [], // required props
    width, // required props
    scrollLeft = noop, // ownProps
    scrollRight = noop, // ownProps
    scrollTo = noop, // ownProps
    overscanCount = VISIBLE_ITEMS_COUNT * 2, // ownProps
    childWidth = width / VISIBLE_ITEMS_COUNT, // ownProps
    height = 100, // ownProps
    scrolledIndex = CALENDAR_TRESHOLD, // ownProps
    selectedIndex, // ownProps
    selectIndex, // ownProps
    ...otherProps // childProps
  } = this.props;

    const childrenLength = children.length;
    const handleWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY;
      if (delta < 0 && scrolledIndex > 0) {
        scrollLeft(1);
      }
      if (delta > 0 && scrolledIndex < childrenLength - 1) {
        scrollRight(1);
      }
    };

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
        scrollToIndex={scrolledIndex}
        scrollToAlignment='center'
        overscanCount={overscanCount}
        onScroll={this.handleScroll}
        onWheel={handleWheel}
      />);
    return (
      <div>
        <p className={CalendarCss.month}>
          <b className={SpecialFontCss.font1}>
          calImg</b> {`${children[scrolledIndex].month}`}
        </p>
        <div className={CalendarCss.container}>
          <NavBtn
            className={CalendarCss.leftScrollBtn}
            onClick={this.scrollLeftOne}
            name='scrollLeft'
          >
            {'<'}
          </NavBtn>
          {list}
          <NavBtn
            className={CalendarCss.rightScrollBtn}
            onClick={this.scrollRightOne}
            name='scrollRight'
          >
            {'>'}
          </NavBtn>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  calendarItems: state.calendarState || [],
  scrolledIndex: state.scrollState && state.scrollState.scrollToIndex,
  selectedIndex: state.scrollState && state.scrollState.selectedIndex,
});
const mapDispathcToProps = dispatch => ({
  scrollLeft: payload => dispatch(scrollLeftAction(payload)),
  scrollRight: payload => dispatch(scrollRightAction(payload)),
  scrollTo: payload => dispatch(scrollToAction(payload)),
  generateRight: payload => dispatch(generateRightAction(payload)),
  generateLeft: payload => dispatch(generateLeftAction(payload)),
  selectIndex: payload => dispatch(selectIndexAction(payload)),
});

export default connect(mapStateToProps, mapDispathcToProps)(CalendarScroll);
