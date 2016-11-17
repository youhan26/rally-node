/**
 * Created by YouHan on 2016/11/2.
 */
import React, {Component} from "react";
import * as api from "mimikiyru-utils/src/api";
import {Radio, Row, Col} from "antd";
import DashboardSearch from "./dashboardSearch";
import DashboardCalendar from "./dashboardCalendar";
import DashboardFlow from "./dashboardFlow";
import DashboardList from "./dashboardList";

require('./../../style/dashboard.css');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mode: '1',
      condition: {
        projectId: '1',
        ownerId: '1',
        releaseId: null
      },
      data: []
    };
    
    this.switchMode = this.switchMode.bind(this);
    this.showMode = this.showMode.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.conditionChange = this.conditionChange.bind(this);
    this.loadData = this.loadData.bind(this);
    this.getCondition = this.getCondition;
  }
  
  // switch mode
  switchMode(e) {
    this.state.mode = (e && e.target ? e.target.value : e);
    this.setState(this.state);
  }
  
  showMode(value) {
    return this.state.mode === value;
  }
  
  componentWillMount() {
    this.loadData();
  }
  
  /**
   * search
   */
  
  static getCondition(props) {
    const result = {};
    if (props.projectId) {
      result.projectId = props.projectId;
    }
    /**
     * compare owner id manual
     */
    // if (props.ownerId) {
    //     result.ownerId = props.ownerId;
    // }
    if (props.releaseId) {
      result.releaseId = props.releaseId;
    }
    return result;
  }
  
  conditionChange(field, e) {
    const me = this;
    me.state.condition[field] = (e && e.target ? e.target.value : e);
    me.setState(me.state);
    me.loadData();
  }
  
  
  loadData() {
    const me = this;
    api
      .get({
        url: '/dashboard/getList',
        params: me.getCondition(me.state.condition)
      })
      .then((res) => {
        me.state.data = res.data;
        me.setState(me.state);
      });
  }
  
  clearSearch() {
    this.state.condition = {
      projectId: null,
      ownerId: null,
      releaseId: null
    };
    this.setState(this.state);
    // TODO this will load twice
    this.loadData();
  }
  
  render() {
    return (
      <div className="d">
        <DashboardSearch
          condition={this.state.condition}
          conditionChange={this.conditionChange}
          click={this.clearSearch}
        />
        <Row>
          <Col span="24" style={{textAlign: 'right', paddingRight: '12px'}}>
            <RadioGroup defaultValue="1" onChange={this.switchMode}>
              <RadioButton value="1">List</RadioButton>
              <RadioButton value="2">Calendar</RadioButton>
              <RadioButton value="3">Flow</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        {this.showMode('1') ? <DashboardList
          ownerId={this.state.condition.ownerId}
          data={this.state.data}
          loading={this.state.loading}
        /> : null}
        {this.showMode('2') ? <DashboardCalendar
          ownerId={this.state.condition.ownerId}
          data={this.state.data}
          loading={this.state.loading}
        /> : null}
        {this.showMode('3') ? <DashboardFlow /> : null}
      </div>
    );
  }
}

