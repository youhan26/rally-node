***REMOVED***
 * Created by YouHan on 2016/8/30.
***REMOVED***
var React = require('react');

var Section = React.createClass({
    getDefaultProps: function () {
        return {
            data: {
                name: '',
                bugs: [],
                tasks: []
            }
        }
    },
    render: function () {
        function renderBugs(item, key) {
            var className = 'dash-task-item div';
            className += ' dash-task-' + item.status;
            return <div key={key} className={className}>
                {item.name}
            </div>
        }

        function renderTasks(item, key) {
            var className = 'dash-task-item div';
            className += ' dash-task-' + item.status;
            return <div key={key} className={className}>
                {item.name}
            </div>
        }

        var btnClass = 'section card';
        return (
            <div className={btnClass}>
                {this.props.data.name}
                <div className="dash-task">
                    {this.props.data.bugs.map(renderBugs)}
                </div>
                <div className="dash-task" style={{
                    marginTop: '10px'
                }}>
                    {this.props.data.tasks.map(renderTasks)}
                </div>
            </div>
        )
    }
***REMOVED***


module.exports = Section;