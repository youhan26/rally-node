/**
 * Created by YouHan on 2016/11/2.
 */

require('./../../style/dashboard.css');

import React, {Component} from "react";
import {Radio, Row, Col} from "antd";
import DashboardSearch from "./dashboardSearch";
import DashboardCalendar from "./dashboardCalendar";
import DashboardFlow from "./dashboardFlow";
import DashboardList from "./dashboardList";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: '1',
            condition: {
                projectId: null,
                ownerId: null
            }
        };

        this.switchMode = this.switchMode.bind(this);
        this.showMode = this.showMode.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.conditionChange = this.conditionChange.bind(this);
    }

    //switch mode
    switchMode(e) {
        this.state.mode = (e.target ? e.target.value : e);
        this.setState(this.state);
    }

    showMode(value) {
        return this.state.mode === value;
    }


    /**
     * search
     */
    conditionChange(field, e) {
        this.state.condition[field] = (e.target ? e.target.value : e);
        this.setState(this.state);
    }

    clearSearch() {
        this.state.condition = {
            projectId: null,
            ownerId: null
        };
        this.setState(this.state);
    }

    render() {
        return <div className="d">
            <DashboardSearch
                condition={this.state.condition}
                projectIdChange={this.conditionChange.bind(this, 'projectId')}
                ownerIdChange={this.conditionChange.bind(this, 'ownerId')}
                click={this.clearSearch}
            />
            <Row>
                <Col span="24" style={{textAlign : 'right', paddingRight : '12px'}}>
                    <RadioGroup defaultValue="1" onChange={this.switchMode}>
                        <RadioButton value="1">List</RadioButton>
                        <RadioButton value="2">Calendar</RadioButton>
                        <RadioButton value="3">Flow</RadioButton>
                    </RadioGroup>
                </Col>
            </Row>
            {this.showMode('1') ? <DashboardList
                projectId={this.state.condition.projectId}
                ownerId={this.state.condition.ownerId}
            /> : null}
            {this.showMode('2') ? <DashboardCalendar/> : null}
            {this.showMode('3') ? <DashboardFlow/> : null}
        </div>
    }
}

