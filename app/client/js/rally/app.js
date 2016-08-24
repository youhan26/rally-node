***REMOVED***
 * Created by YouHan on 2016/8/22.
***REMOVED***
var React = require('react');
var Render = require('react-dom');
var Router = require('react-router');

function HelloWorld(props) {
    var {name, checked, ...other} = props;
    return <div {...other} >{name}</div>
}


var App = React.createClass({
    render: function () {
        return (
            <div>
                <span>this is app</span>
                {this.props.children}
                <HelloWorld name="peter" checked={true} onClick={console.log.bind(console)}></HelloWorld>
            </div>
        )
    }
***REMOVED***


var dom = document.getElementById('root');
Render.render(<App></App>, dom);