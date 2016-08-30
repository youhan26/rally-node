/**
 * Created by YouHan on 2016/8/29.
 */
var React = require('react');
var $ = require('jquery');
var Section = require('./section');
var utils = require('./../utils');
var api = utils.api;


var DashSection = React.createClass({
    getDefaultProps: function () {
        return {
            data: {
                regionName: '',
                stories: []
            }
        }
    },
    render: function () {
        function renderLi(item, key) {
            return <Section data={item} key={key}></Section>;
        }

        return (
            <div className="dash-section">
                <div className="dash-section-title" style={{
                    textAlign: 'center',
                    fontSize: '1rem',
                }}>
                    {this.props.data.regionName}
                </div>
                {this.props.data.stories.map(renderLi)}
            </div>
        )
    }
});

var Dashboard = React.createClass({
    getInitialState: function () {
        return {
            list: []
        };
    },
    componentWillMount: function () {
        this.loadData();
    },
    loadData: function () {
        var that = this;
        api.get({
            url: 'dashboard/dataList',
        }).then(function (res) {
            if (res && res.success) {
                that.setState({
                    list: res.data
                });
            } else {
                alert('error when load event data');
            }
        }, function (error) {
            console.error(error);
        });
    },
    render: function () {
        function renderLi(item, key) {
            return (
                <DashSection data={item} key={key}></DashSection>
            )
        }

        return (
            <div className="dash-content">
                {this.state.list.map(renderLi)}
            </div>
        )
    }
});


module.exports = Dashboard;