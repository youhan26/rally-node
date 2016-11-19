import React from "react";
import {message} from "antd";
import StorySearch from "./storySearch";
import StoryResult from "./storyResult";
import Api from "./../../mixins/mixins-api";

require('./../../../style/storyList.css');

export default class StoryList extends Api {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      loading: false,
      condition: StoryList.getEmptyObj()
    };
    
    this.searchChange = this.searchChange.bind(this);
    this.dataUpdate = this.dataUpdate.bind(this);
    this.singleRemove = this.singleRemove.bind(this);
    this.singleSave = this.singleSave.bind(this);
    this.clear = this.clear.bind(this);
    this.search = this.search.bind(this);
    this.getSearchCondition = this.getSearchCondition.bind(this);
    this.apisetLoading = this.apisetLoading.bind(this);
  }
  
  componentWillMount() {
    this.apiregistry('story');
    this.search();
  }
  
  // search
  clear() {
    this.state.condition = StoryList.getEmptyObj();
    this.setState(this.state);
  }
  
  static getEmptyObj() {
    return {
      title: '',
      projectId: null,
      status: null,
      ownerId: null,
      releaseId: null
    };
  }
  
  // result
  static getResultObj() {
    return {
      title: '',
      todo: 0,
      taskEst: 0,
      planEst: 0
    };
  }
  
  searchChange(field, e) {
    this.state.condition[field] = (e && e.target ? e.target.value : e);
    if (field === 'projectId') {
      this.state.condition.releaseId = null;
    }
    this.setState(this.state);
  }
  
  getSearchCondition() {
    const condition = {};
    const state = this.state.condition;
    Object.keys(state).forEach((item) => {
      if (state[item]) {
        condition[item] = state[item];
      }
    });
    return condition;
  }
  
  // search
  search() {
    const me = this;
    me.apisetLoading();
    this.apigetList(me.getSearchCondition())
      .then((res) => {
        me.state.loading = false;
        if (res && res.success) {
          me.state.data = [StoryList.getResultObj()].concat(res.data);
        } else {
          message.error(res.reason);
        }
        me.setState(me.state);
      });
  }
  
  singleSave(data) {
    const me = this;
    me.apisetLoading();
    this.apisave(data, data.id)
      .then((res) => {
        if (res && res.success) {
          me.search();
        } else {
          message.error(res.reason);
        }
      });
  }
  
  singleRemove(id) {
    const me = this;
    me.apisetLoading();
    this.apiremoveById(id)
      .then((res) => {
        if (res && res.success) {
          me.search();
        } else {
          message.error(res.reason);
        }
      });
  }
  
  apisetLoading() {
    const me = this;
    me.state.loading = true;
    me.setState(this.state);
  }
  
  dataUpdate(data) {
    this.state.data = data;
    this.setState(this.state);
  }
  
  render() {
    const style = {
      width: '100%',
      height: '100%',
      backgroundColor: '#eee'
    };
    return (
      <div style={style}>
        <StorySearch
          search={this.search}
          condition={this.state.condition}
          searchChange={this.searchChange}
          clear={this.clear}
        />
        <StoryResult
          data={this.state.data}
          loading={this.state.loading}
          save={this.singleSave}
          remove={this.singleRemove}
          dataUpdate={this.dataUpdate}
        />
      </div>
    );
  }
}
