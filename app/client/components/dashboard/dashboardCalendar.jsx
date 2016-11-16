/**
 * Created by YouHan on 2016/11/3.
 */
import React, {Component, PropTypes} from "react";
import {Calendar} from "antd";
import moment from "moment";

export default class DashboardCalendar extends Component {
  constructor(props) {
    super(props);
    
    this.dateCellRender = this.dateCellRender.bind(this);
  }
  
  
  dateCellRender(value) {
    const listData = [];
    this.props.data.forEach((item) => {
      if (moment(value).isSame(moment(item.testDate, 'YYYY-MM-DD'), 'day')) {
        listData.push(item);
      }
    });
    let className = '';
    if (value.weekday() > 5 || value.weekday() <= 0) {
      className = 'dc-red'
    }
    return (
      <div style={{width: '100%', height: '100%'}} className={className}>
          <ul className="events">
            {
              listData.map((item, index) =>
                <li key={index}>
                    <span className={`event-${item.status}`}>●</span>
                  {item.title}
                </li>
              )
            }
          </ul>
      </div>
    )
    
  }
  
  render() {
    return <Calendar style={{backgroundColor: 'white', margin: '12px'}}
                     dateCellRender={this.dateCellRender}
    />
  }
}

DashboardCalendar.propTypes = {
  ownerId: PropTypes.any,
  data: PropTypes.array,
  loading: PropTypes.bool
};
DashboardCalendar.defaultProps = {
  data: [],
  loading: false
};
