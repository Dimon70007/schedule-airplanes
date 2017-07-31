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
import { fetchData as _fetchData } from '../actions';
import { APP_WIDTH /* , VISIBLE_ITEMS_COUNT */ } from '../constants';
import { isDatesEquals } from '../helpers';
import { AppCss, SpecialFontCss, LoaderCss } from '../styles';

var App = function (_React$PureComponent) {
  _inherits(App, _React$PureComponent);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || _Object$getPrototypeOf(App)).call(this, props));

    _this.handleCalendarClick = _this.handleCalendarClick.bind(_this);
    return _this;
  }

  _createClass(App, [{
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
    key: 'handleCalendarClick',
    value: function handleCalendarClick(objDate) {
      var strDate = objDate.strDate;
      this.props.fetchData(strDate);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$calendarItems = _props.calendarItems,
          calendarItems = _props$calendarItems === undefined ? [] : _props$calendarItems,
          _props$fetchedData = _props.fetchedData,
          fetchedData = _props$fetchedData === undefined ? [] : _props$fetchedData,
          isFetching = _props.isFetching,
          fetchingError = _props.fetchingError,
          scrolledIndex = _props.scrolledIndex;

      var emptyData = !isFetching && fetchingError;
      var scrolledDate = calendarItems[scrolledIndex].strDate;
      var scheduleItems = fetchedData.length ? fetchedData.filter(function (obj) {
        return isDatesEquals(obj.dt_txt, scrolledDate);
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
        { className: AppCss.App, style: { width: APP_WIDTH } },
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
              onClick: this.handleCalendarClick
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
    fetchingError: state.appData.error
  };
};
var mapDispathcToProps = function mapDispathcToProps(dispatch) {
  return {
    fetchData: function fetchData(payload) {
      return dispatch(_fetchData(payload));
    }
  };
};
export default connect(mapStateToProps, mapDispathcToProps)(App);
//# sourceMappingURL=/home/otvazhniy/jsProjects/schedule-airplains/maps/containers/App.js.map