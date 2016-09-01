***REMOVED***
 * Created by YouHan on 2016/8/29.
***REMOVED***
import {Motion, spring} from "react-motion";
import React from "react";

var Test = React.createClass({
    render: function () {
        return (
            <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
                {value => <div>{value.x}</div>}
            </Motion>
        )
    }
***REMOVED***

var Story = React.createClass({
    render: function () {
        return (
            <div className="content">
                this is story page
                <Test></Test>
            </div>
        )
    }
***REMOVED***


module.exports = Story;