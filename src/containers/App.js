import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import {
  CalendarScroll,
  CalendarElement,
  ScheduleElement,
  List,
} from '../components';
import { fetchData, setAppSizeAction } from '../actions';
import { /* , VISIBLE_ITEMS_COUNT */} from '../constants';
import { isDatesEquals } from '../helpers';
import { AppCss, SpecialFontCss, LoaderCss } from '../styles';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getCost = ::this.getCost;
    this.handleCalendarClick = ::this.handleCalendarClick;
    this.updateWindowDimensions = ::this.updateWindowDimensions;
  }

  // componentWillUpdate(nextProps) {
  //
  // }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate() {
    // const {
    //   // scheduleItems,
    //   calendarItems = [],
    //   fetchedData = [],
    //   // fetchingSuccess,
    //   isFetching,
    //   fetchingError,
    //   scrolledIndex,
    // } = this.props;
    // const emptyData = !isFetching && fetchingError;
    // const hasDataforDate = fetchedData.findIndex();
    // if (!emptyData) {
    //
    // }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  getCost(date) {
    const {
      fetchedData = [],
    } = this.props;
    // const filtered = fetchedData.filter((obj) => {
    //   return obj.dt_txt && isDatesEquals(obj.dt_txt, date.strDate);
    // });
    //
    // const allKelvin = filtered.reduce((acc, { main: { temp } }) =>
    //   (acc + temp), 0);
    // const cost = filtered.length ? Math.round(allKelvin / filtered.length) - 273 : '';
    // return cost;
    return '';
  }

  handleCalendarClick(objDate) {
    const strDate = objDate.strDate;
    console.log('strDate ', strDate);
    this.props.fetchData(strDate);
  }

  updateWindowDimensions() {
    this.props.setAppSize({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const {
      appSize: { width, height },
      calendarItems = [],
      fetchedData = [],
      // fetchingSuccess,
      isFetching,
      fetchingError,
      // scrolledIndex,
      selectedIndex,
    } = this.props;
    const emptyData = !isFetching && fetchingError;
    const selectedDate = selectedIndex > 0 ? calendarItems[selectedIndex].strDate : false;
    const scheduleItems = fetchedData.length && selectedDate ?
      fetchedData.filter(obj =>
        isDatesEquals(obj.dt_txt, selectedDate)) : [];
    const scheduleList = (
      <Loader
        loaded={!isFetching}
        className={LoaderCss.container}
      >
        <List
          Child={ScheduleElement}
          emptyData={emptyData}
        >
          {scheduleItems}
        </List>
      </Loader>
    );
    return (
      <div
        className={AppCss.App}
        style={{ width: `${width}px` }}
      >
        <div className={AppCss.header}>
          <input type='button' name='back' className={AppCss.backBtn} value='<' />
          <h2 className={AppCss.headerText}>
            Тула<b className={SpecialFontCss.font1}> - </b>Сочи
          </h2>
          <p>{'Шаг 1 из 5. Выберите рейс "Туда"'}</p>
        </div>
        <div className={AppCss.scroll}>
          <CalendarScroll
            Child={CalendarElement}
            getCost={this.getCost}
            onClick={this.handleCalendarClick}
            width={width}
          >
            {calendarItems}
          </CalendarScroll>
          <h2>
            ПРЯМЫЕ РЕЙСЫ
          </h2>
        </div>
        <div className={AppCss.main}>
          <div>
            {scheduleList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  scheduleItems: state.scheduleState || [],
  calendarItems: state.calendarState || [],
  scrolledIndex: state.scrollState && state.scrollState.scrollToIndex,
  selectedIndex: state.scrollState && state.scrollState.selectedIndex,
  fetchedData: state.appData.data && state.appData.data.list,
  isFetching: state.appData.isFetching,
  fetchingSuccess: state.appData.dataFetched,
  fetchingError: state.appData.error,
  appSize: state.appSize,
});
const mapDispathcToProps = dispatch => ({
  fetchData: payload => dispatch(fetchData(payload)),
  setAppSize: payload => dispatch(setAppSizeAction(payload)),
});
export default connect(mapStateToProps, mapDispathcToProps)(App);
