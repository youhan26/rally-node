/**
 * Created by YouHan on 2016/11/2.
 */

require('./../../style/dashboard.css');

import React, {Component, PropTypes} from "react";
import {Radio, Row, Col} from "antd";
import DashboardSearch from "./dashboardSearch";
import DashboardCalendar from "./dashboardCalendar";
import DashboardFlow from "./dashboardFlow";
import DashboardList from "./dashboardList";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class DragItem extends Component {
    constructor(props) {
        super(props);

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount() {
        if (this.ref) {
            const ref = this.ref;
            ref.addEventListener('dragstart', this.onDragStart, false);
            ref.addEventListener('dragend', this.onDragEnd, false);
        }
    }

    onDragEnd(e) {
        e.target.style.opacity = 1;
    }

    onDragStart(e) {
        const transfer = e.dataTransfer;
        var target = e.target;
        target.style.opacity = 0.5;
        // this.ref.dataTransfer.setData();
    }

    render() {
        return (
            <div ref={(value) =>{
                this.ref = value;
            }} draggable={true} className='section-item'>
                {this.props.index}
            </div>
        );
    }
}
DragItem.propTypes = {
    index: PropTypes.string
};
class DragContainer extends Component {
    constructor(props) {
        super(props);

        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
    }

    componentDidMount() {
        if (this.ref) {
            const target = this.ref;
            target.addEventListener('dragover', this.onDragOver, false);
            target.addEventListener('dragenter', this.onDragEnter, false);
            target.addEventListener('dragleave', this.onDragLeave, false);
        }
    }

    onDragEnter(e) {
        if (e) {
            e.preventDefault();
            e.target.classList.add('over');
        }
    }

    onDragLeave(e) {
        if (e) {
            e.preventDefault();
            e.target.classList.remove('over');
        }

    }

    render() {
        return (
            <div className="section" ref={(value) =>{
                this.ref = value;
            }}>
                {this.props.children}
            </div>
        )
    }
}
class Dashboard1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form">
                <DragContainer>
                    <DragItem index="11"/>
                    <DragItem index="12"/>
                    <DragItem index="13"/>
                </DragContainer>
                <DragContainer>
                    <DragItem index="21"/>
                    <DragItem index="22"/>
                    <DragItem index="23"/>
                </DragContainer>
                <DragContainer>
                    <DragItem index="31"/>
                    <DragItem index="32"/>
                    <DragItem index="33"/>
                </DragContainer>
            </div>
        )
    }
}

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

