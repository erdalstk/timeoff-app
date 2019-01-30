import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { formatDate, parseDate } from 'react-day-picker/moment';

import HeaderComponent from '../../commons/headerComponent';
import HomeView from './homeView';
import {
  setVacationActions,
  fetchVacationActions
} from '../../../actions/employeesActions';

import { getCookie } from '../../../utils/cookies';

class HomeComponent extends Component {
  state = {
    from: undefined,
    to: undefined,
    isSuccess: false,
    message: '',
    list: []
  }

  to = null;

  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchVacationActions({ id: getCookie('id') }));
  }

  onSaveHandle(event) {
    event.preventDefault();
    this.props.dispatch(setVacationActions({
      start: this.state.from,
      end: this.to.state.month,
      employeeID: getCookie('id')
    }));
  }

  handleFromChange(from) {
    this.setState({ from });
  }

  handleToChange(to) {
    this.to = new Date(to);
    this.setState({ to: to });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.vacations.hasOwnProperty('response')) {
      if (nextProps.vacations.response.success !== prevState.isSuccess) {
        return {
          isSuccess: nextProps.vacations.response.success,
          message: nextProps.vacations.response.message,
          employee: nextProps.details.response
        };
      } else {
        return {
          isSuccess: nextProps.vacations.response.success,
          message: nextProps.vacations.response.message
        };
      }
    } else {
      return null;
    }
  }

  render() {
    console.log(this.props.fetchVacations.response);
    if (this.props.fetchVacations === undefined || this.props.fetchVacations.length <= 0) {
      return <div>Loading...</div>
    }

    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div>
        <HeaderComponent />
        <div>
          {
            (this.state.isSuccess)
            ?
            <div>{this.state.message}</div>
            :
            <div>{this.state.message}</div>
          }
        </div>
        <DayPickerInput
          value={from}
          placeholder="From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus(),
          }}
          onDayChange={this.handleFromChange.bind(this)}
        />{' '}
        —{' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder="To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange.bind(this)}
          />
        </span>
        <button type='button' onClick={this.onSaveHandle.bind(this)}>Save</button>
        <HomeView list={this.props.fetchVacations.response}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(HomeComponent);