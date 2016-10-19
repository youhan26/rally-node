'use strict';

require('./../../style/storyList.css');

import React from "react";

var StoryList = React.createClass({
    render: function () {
        var style = {
            width: '100%',
            height: '100%',
            backgroundColor: '#eee'
        };
        return (
            <div style={style}>this is story list page</div>
        )
    }
});

export default StoryList;