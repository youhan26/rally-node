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
        return (
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
        )

    }

    render() {
        return <Calendar style={{ backgroundColor : 'white', margin: '12px'}}
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
