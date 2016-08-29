***REMOVED***
 * Created by YouHan on 2016/8/29.
***REMOVED***
var React = require('react');
var $ = require('jquery');


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
        $.ajax({
            method: 'GET',
            url: 'dashboard/dataList',
            dataType: 'json',
            success: function (res) {
                if (res && res.success) {
                    console.log(res.data);
                    that.setState({
                        list: res.data
                    ***REMOVED***
                } else {
                    alert('error when load event data');
                }
            }
        ***REMOVED***
    },
    render: function () {
        return (
            <div className="content">
                this is dashboard
            </div>
        )
    }
***REMOVED***


module.exports = Dashboard;