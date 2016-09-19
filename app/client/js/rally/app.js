/**
 * Created by YouHan on 2016/8/22.
 */

"use strict";

import React from "react";
import Render from "react-dom";
import {Router, hashHistory, Route, IndexRoute} from "react-router";
import Share from "./share";
import Management from "./manage";
import {HorizonHeader} from "./header";
import Dashboard from "./dashboard";
import Story from "./story";
import Bug from "./bug";
import Config from "./config";
import Report from "./report";
import StoryList from "./storyList";

var App = React.createClass({
    render: function () {
        return (
            <div style={{
                height: '100%',
                width: '100%',
                display: 'flex'
            }}>
                <HorizonHeader></HorizonHeader>
                {this.props.children}
            </div>
        )
    }
});


Render.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path="stories" component={StoryList}/>
            <Route path="stories/:storyId" component={Story}/>
            <Route path="bugs" component={Bug}>
                {/*<IndexRoute component={InboxStats}/>*/}
                {/*<Route path="messages/:id" component={Message}/>*/}
            </Route>
            <Route path="config" component={Config}/>
            <Route path="report" component={Report}/>
            <Route path="share" component={Share}/>
            <Route path="manage" component={Management}/>
        </Route>
    </Router>, document.getElementById('root'));