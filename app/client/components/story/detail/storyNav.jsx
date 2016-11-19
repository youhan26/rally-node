/**
 * Created by YouHan on 2016/8/29.
 */
import {Motion, spring} from "react-motion";
import React, {Component, PropTypes} from "react";
import {Tabs} from "antd";
import StoryDetails from "./storyDetail";
import TaskList from "./taskList";
import Defects from './defectList';

require('./../../../style/story.css');

const TabPane = Tabs.TabPane;

const Test = () => {
  return (
    <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
      {/* TODO warn for the Motion flow check error*/}
      {value => <div>{value.x}</div>}
    </Motion>
  );
};

export default class Story extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id: this.props.params.id,
      owner: null
    };
    this.ownerChange = this.ownerChange.bind(this);
  }
  
  ownerChange(value) {
    this.state.owner = value;
    this.setState(this.state);
  }
  
  render() {
    return (
      <div className="story-content">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Details" key="1">
            <StoryDetails storyId={this.state.id} ownerChange={this.ownerChange} />
          </TabPane>
          <TabPane tab="Tasks" key="2" disabled={!this.state.id}>
            <TaskList
              storyId={this.state.id}
              owner={this.state.owner}
            />
          </TabPane>
          <TabPane tab="Defects" key="3" disabled={!this.state.id}>
            <Defects storyId={this.state.id} />
          </TabPane>
          {/* <TabPane tab="Test Cases" key="4" disabled={!this.state.id}>*/}
          {/* <TestCases storyId={this.state.id} />*/}
          {/* </TabPane>*/}
        </Tabs>
        <Test />
      </div>
    );
  }
}


Story.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string
  })
};
