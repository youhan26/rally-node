/**
 * Created by YouHan on 2016/11/22.
 */
import React, {Component, PropTypes} from "react";
import {Input, Button, Icon, Collapse, Card} from "antd";
import TopicDetail from "./topicDetail";
import TopicConfig from "./topicConfig";


require('./../../style/topic.css');

const Panel = Collapse.Panel;

class NavList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showConfig: false
    };
  }
  
  render() {
    const {clickConfig} = this.props;
    
    return (
      <div className="topic-navList">
        <Collapse defaultActiveKey={['1', '2', '3']}>
          <Panel header="This is panel header 1" key="1">
            <Card>
              fdsfsdfsdfsdfsafa
              fsdfsdfsfdsf
              fdsfsdf
            </Card>
            <Card>
              fdsfsdfsdfsdfsafa
              fsdfsdfsfdsf
              fdsfsdf
            </Card>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <Card>
              fdsfsdfsdfsdfsafa
              fsdfsdfsfdsf
              fdsfsdf
            </Card>
            <Card>
              fdsfsdfsdfsdfsafa
              fsdfsdfsfdsf
              fdsfsdf
            </Card>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <Card>
              fdsfsdfsdfsdfsafa
              fsdfsdfsfdsf
              fdsfsdf
            </Card>
            <Card>
              fdsfsdfsdfsdfsafa
              fsdfsdfsfdsf
              fdsfsdf
            </Card>
          </Panel>
        </Collapse>
        <Button onClick={clickConfig} style={{width: '185px'}} type="primary">
          Subscribe Topic
        </Button>
      </div>
    );
  }
}

NavList.propTypes = {
  clickConfig: PropTypes.func
};


class Topic extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showConfig: false
    };
    
    this.clickConfig = this.clickConfig.bind(this);
  }
  
  clickConfig() {
    this.state.showConfig = true;
    this.setState(this.state);
  }
  
  
  render() {
    return (
      <div className="topic">
        <NavList clickConfig={this.clickConfig} />
        {this.state.showConfig ?
          <TopicConfig />
          : <TopicDetail /> }
      </div>
    );
  }
}

Topic.propTypes = {
  id: PropTypes.string
};


export default Topic;
