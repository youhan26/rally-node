***REMOVED***
 * Created by YouHan on 2016/8/29.
***REMOVED***
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
***REMOVED***


module.exports = Header;