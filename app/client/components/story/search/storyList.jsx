'use strict';

require('./../../../style/storyList.css');

import React from "react";
import {message} from "antd";
import StorySearch from "./storySearch";
import StoryResult from "./storyResult";
import Api from "./../../mixins/mixins-api";
import {basic} from "mimikiyru-utils";

const StoryList = React.createClass({
    mixins: [Api],
    getInitialState(){
        return {
            data: [],
            loading: false,
            condition: this.getEmptyObj()
        };
    },
    componentWillMount(){
        Api._registry('story');
        this.search();
    },
    //search
    clear(){
        this.state.condition = this.getEmptyObj();
        this.setState(this.state);
    },
    getEmptyObj(){
        return {
            title: '',
            projectId: null,
            status: null,
            ownerId: null,
            releaseId: null
        };
    },
    searchChange(field, e){
        this.state.condition[field] = (e.target ? e.target.value : e);
        if (field === 'projectId') {
            this.state.condition.releaseId = null;
        }
        this.setState(this.state);
    },
    getSearchCondition(){
        const condition = {};
        const state = this.state.condition;
        Object.keys(state).forEach((item) => {
            if (state[item]) {
                condition[item] = state[item];
            }
        });
        return condition;
    },
    //result
    getResultObj(){
        return {
            title: '',
            todo: 0,
            taskEst: 0,
            planEst: 0
        }
    },

    //search
    search(){
        const me = this;
        me._setLoading();
        Api._getList(me.getSearchCondition())
            .then((res) => {
                me.state.loading = false;
                if (res && res.success) {
                    me.state.data = [me.getResultObj()].concat(res.data);
                    me.state.oriData = basic.copy(me.state.data);
                } else {
                    message.error(res.reason);
                }
                me.setState(me.state);
            });
    },
    singleSave(data){
        const me = this;
        me._setLoading();
        Api._save(data, data.id)
            .then((res) => {
                if (res && res.success) {
                    me.search();
                } else {
                    message.error(res.reason);
                }
            });
    },
    singleRemove(id){
        const me = this;
        me._setLoading();
        Api._removeById(id)
            .then((res) => {
                if (res && res.success) {
                    me.search();
                } else {
                    message.error(res.reason);
                }
            });
    },
    _setLoading (){
        const me = this;
        me.state.loading = true;
        me.setState(this.state);
    },
    dataUpdate(data){
        this.state.data = data;
        this.setState(this.state);
    },
    render() {
        const style = {
            width: '100%',
            height: '100%',
            backgroundColor: '#eee'
        };
        return (
            <div style={style}>
                <StorySearch search={this.search}
                             condition={this.state.condition}
                             titleChange={this.searchChange.bind(this, 'title')}
                             statusChange={this.searchChange.bind(this, 'status')}
                             projectChange={this.searchChange.bind(this, 'projectId')}
                             ownerChange={this.searchChange.bind(this, 'ownerId')}
                             releaseChange={this.searchChange.bind(this, 'releaseId')}
                             clear={this.clear}
                />
                <StoryResult oriData={this.state.oriData}
                             data={this.state.data}
                             loading={this.state.loading}
                             save={this.singleSave}
                             remove={this.singleRemove}
                             dataUpdate={this.dataUpdate}
                />
            </div>
        )
    }
});

export default StoryList;