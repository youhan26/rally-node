/**
 * Created by YouHan on 2016/9/19.
 */
/* @flow */
"use strict";

import React from "react";

var Project = React.createClass({
    getDefaultProps: () => {
        return {};
    },
    getInitialState: () => {
        return {
            project: '',
            list: []
        };
    },
    render: function () {
        function renderLi(item, key) {
            return (
                <div key={key}>
                    <p>name : {item.name}</p>
                    <p>status : {item.status}</p>
                </div>
            )
        }

        return (
            <div className="project-manage">
                <input value={this.state.project}/>
                {this.state.list.map(renderLi)}
            </div>
        );
    }
});

var Member = React.createClass({
    render: function () {
        return (
            <div></div>
        )
    }
});


var Team = React.createClass({
    render: function () {
        return (
            <div></div>
        )
    }
});


var Role = React.createClass({
    render: function () {
        return (
            <div></div>
        )
    }
});

var Management = React.createClass({
    getInitialState: () => {
        return {
            status: 1 //default Project
        }
    },
    changeStatus: (num) => {
        if (num) {
            this.setState({
                status: num
            });
        }
    },
    render: function () {
        var renderSection = ()=> {
            switch (this.state.status) {
                case 1 :
                    return <Project></Project>;
                case 2 :
                    return <Team></Team>;
                case 3 :
                    return <Member></Member>;
                case 4 :
                    return <Role></Role>;
            }
        };
        return (
            <div>
                <div className="manage-header">
                    <ul>
                        {this}
                        <li>
                            <a onClick={this.changeStatus.bind(this)}>Project</a>
                        </li>
                        <li>Team</li>
                        {/*<li onClick={this.changeStatus.bind(this, 3)}>Member</li>*/}
                        {/*<li onClick={this.changeStatus.bind(this, 4)}>Role</li>*/}
                    </ul>
                </div>
                <div>
                    {renderSection}
                </div>
            </div>
        )
    }
});

export default Management;