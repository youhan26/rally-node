***REMOVED***
 * Created by YouHan on 2016/8/30.
***REMOVED***
var React = require('react');

var Section = React.createClass({
    getDefaultProps: function () {
        return {
            data: {
                name: ''
            }
        }
    },
    render: function () {
        return (
            <div className="section">
                {this.props.data.name}
            </div>
        )
    }
***REMOVED***


module.exports = Section;