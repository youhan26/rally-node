/**
 * Created by YouHan on 2016/8/29.
 */

"use strict";

var React = require('react');
var router = require('react-router');

var Link = router.Link;


var Header = React.createClass({
    clickImg: function () {
        window.location.href = 'index';
    },
    render: function () {
        return (
            <div className="header">
                <ul>
                    <li><Link to="/story">Story</Link></li>
                    <li><Link to="/bug">Bug</Link></li>
                    <img src="./../images/rally/react-logo.png" onClick={this.clickImg}></img>
                    <li><Link to="/report">Report</Link></li>
                    <li><Link to="/config">config</Link></li>
                </ul>
            </div>
        )
    }
});

var HorizonHeader = React.createClass({
    render: function () {
        return (
            <div className="horizon-header">
                <ul>
                    <li><Link to="/stories">Story</Link></li>
                    <li><Link to="/bugs">Bug</Link></li>
                    <li><Link to="/report">Report</Link></li>
                    <li className="sub-list-parent">
                        <ul className="sub-list">
                            <li><Link to="/">Index</Link></li>
                            <li><Link to="/">Index</Link></li>
                            <li><Link to="/">Index</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
});

module.exports = {
    Header: Header,
    HorizonHeader: HorizonHeader
};