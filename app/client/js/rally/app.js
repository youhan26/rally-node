/**
 * Created by YouHan on 2016/8/22.
 */
var React = require('react');
var Render = require('react-dom');
var Router = require('react-router');


function HelloWorld(props) {
    var {name, checked, ...other} = props;
    return <div {...other} >{name}</div>
    {/*return <div>{props.name}</div>*/}
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
});


var dom = document.getElementById('root');
Render.render(<App></App>, dom);