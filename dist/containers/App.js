import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { CalendarScroll, CalendarElement, ScheduleElement, List } from '../components';
import { fetchData as _fetchData, setAppSizeAction } from '../actions';
import /* , VISIBLE_ITEMS_COUNT */'../constants';
import { isDatesEquals } from '../helpers';
import { AppCss, SpecialFontCss, LoaderCss } from '../styles';

var App = function (_React$PureComponent) {
  _inherits(App, _React$PureComponent);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || _Object$getPrototypeOf(App)).call(this, props));

    _this.getCost = _this.getCost.bind(_this);
    _this.handleCalendarClick = _this.handleCalendarClick.bind(_this);
    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    return _this;
  }

  // componentWillUpdate(nextProps) {
  //
  // }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
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
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: 'getCost',
    value: function getCost(date) {
      var _props$fetchedData = this.props.fetchedData,
          fetchedData = _props$fetchedData === undefined ? [] : _props$fetchedData;
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
  }, {
    key: 'handleCalendarClick',
    value: function handleCalendarClick(objDate) {
      var strDate = objDate.strDate;
      console.log('strDate ', strDate);
      this.props.fetchData(strDate);
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {
      this.props.setAppSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$appSize = _props.appSize,
          width = _props$appSize.width,
          height = _props$appSize.height,
          _props$calendarItems = _props.calendarItems,
          calendarItems = _props$calendarItems === undefined ? [] : _props$calendarItems,
          _props$fetchedData2 = _props.fetchedData,
          fetchedData = _props$fetchedData2 === undefined ? [] : _props$fetchedData2,
          isFetching = _props.isFetching,
          fetchingError = _props.fetchingError,
          selectedIndex = _props.selectedIndex;

      var emptyData = !isFetching && fetchingError;
      var selectedDate = selectedIndex > 0 ? calendarItems[selectedIndex].strDate : false;
      var scheduleItems = fetchedData.length && selectedDate ? fetchedData.filter(function (obj) {
        return isDatesEquals(obj.dt_txt, selectedDate);
      }) : [];
      var scheduleList = React.createElement(
        Loader,
        {
          loaded: !isFetching,
          className: LoaderCss.container
        },
        React.createElement(
          List,
          {
            Child: ScheduleElement,
            emptyData: emptyData
          },
          scheduleItems
        )
      );
      return React.createElement(
        'div',
        {
          className: AppCss.App,
          style: { width: width + 'px' }
        },
        React.createElement(
          'div',
          { className: AppCss.header },
          React.createElement('input', { type: 'button', name: 'back', className: AppCss.backBtn, value: '<' }),
          React.createElement(
            'h2',
            { className: AppCss.headerText },
            '\u0422\u0443\u043B\u0430',
            React.createElement(
              'b',
              { className: SpecialFontCss.font1 },
              ' - '
            ),
            '\u0421\u043E\u0447\u0438'
          ),
          React.createElement(
            'p',
            null,
            'Шаг 1 из 5. Выберите рейс "Туда"'
          )
        ),
        React.createElement(
          'div',
          { className: AppCss.scroll },
          React.createElement(
            CalendarScroll,
            {
              Child: CalendarElement,
              getCost: this.getCost,
              onClick: this.handleCalendarClick,
              width: width
            },
            calendarItems
          ),
          React.createElement(
            'h2',
            null,
            '\u041F\u0420\u042F\u041C\u042B\u0415 \u0420\u0415\u0419\u0421\u042B'
          )
        ),
        React.createElement(
          'div',
          { className: AppCss.main },
          React.createElement(
            'div',
            null,
            scheduleList
          )
        )
      );
    }
  }]);

  return App;
}(React.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    scheduleItems: state.scheduleState || [],
    calendarItems: state.calendarState || [],
    scrolledIndex: state.scrollState && state.scrollState.scrollToIndex,
    selectedIndex: state.scrollState && state.scrollState.selectedIndex,
    fetchedData: state.appData.data && state.appData.data.list,
    isFetching: state.appData.isFetching,
    fetchingSuccess: state.appData.dataFetched,
    fetchingError: state.appData.error,
    appSize: state.appSize
  };
};
var mapDispathcToProps = function mapDispathcToProps(dispatch) {
  return {
    fetchData: function fetchData(payload) {
      return dispatch(_fetchData(payload));
    },
    setAppSize: function setAppSize(payload) {
      return dispatch(setAppSizeAction(payload));
    }
  };
};
export default connect(mapStateToProps, mapDispathcToProps)(App);
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/containers/App.js.map