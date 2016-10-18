***REMOVED***
 * Created by YouHan on 2016/8/22.
***REMOVED***

"use strict";

require('./../style/basic.css');

import React from "react";
import Render from "react-dom";
import {Router, hashHistory, Route, IndexRoute} from "react-router";
import Share from "./share";
import Management from "./manage/manage";
import {HorizonHeader} from "./header";
import Dashboard from "./dashboard";
import Story from "./story";
import Bug from "./bug";
import Config from "./config";
import Report from "./report";
import StoryList from "./storyList";
import FontSizeConverter from "./tools/font-size-converter";
import Code from "./tools/qrcode";
import Project from './manage/project';
import Team from './manage/team';
import Member from './manage/member';
import Role from './manage/role';


var App = React.createClass({
    render: function () {
        return (
            <div style={{
                height: '100%',
                width: '100%',
                display: 'flex'
            }}>
                <HorizonHeader/>
                {this.props.children}
            </div>
        )
    }
***REMOVED***


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
            <Route path="manage" component={Management}>
                <IndexRoute component={Project}/>
                <Route path="project" component={Project}/>
                <Route path="team" component={Team}/>
                <Route path="member" component={Member}/>
                <Route path="role" component={Role}/>
            </Route>
            <Route path="font-size-converter" component={FontSizeConverter}/>
            <Route path="qrcode" component={Code}/>
        </Route>
    </Router>, document.getElementById('root'));