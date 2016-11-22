/**
 * Created by YouHan on 2016/11/22.
 */
import React, {Component, PropTypes} from "react";
import {Button, Collapse, Card, message} from "antd";
import TopicDetail from "./topicDetail";
import TopicConfig from "./topicConfig";
import Api from "./../api";


require('./../../style/topic.css');

const Panel = Collapse.Panel;

class NavList extends Component {
  constructor(props) {
    super(props);
    
    this.showDetail = this.showDetail.bind(this);
  }
  
  showDetail(id) {
    
  }
  
  render() {
    const {clickConfig} = this.props;
    const me = this;
    
    return (
      <div className="topic-navList">
        <Collapse defaultActiveKey={['1', '2', '3']}>
          {this.props.data.map((item) => {
            return (<Panel header={item.title} key={item.id}>
              {item.shares.map((share) => {
                return (
                  <Card key={share.id} onClick={me.showDetail(share.id)}>
                    {share.title}
                  </Card>
                );
              })}
            </Panel>);
          })}
        </Collapse>
        <Button onClick={clickConfig} style={{width: '185px'}} type="primary">
          Subscribe Topic
        </Button>
      </div>
    );
  }
}

NavList.propTypes = {
  clickConfig: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string
  })),
  shares: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string
  }))
};

class Topic extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showConfig: false,
      dataList: []
    };
    
    this.clickConfig = this.clickConfig.bind(this);
    this.reload = this.reload.bind(this);
  }
  
  componentWillMount() {
    this.reload();
  }
  
  reload() {
    const me = this;
    Api.Topic.getUserList().then((res) => {
      if (res && res.success) {
        me.state.dataList = res.data;
        me.setState(me.state);
      } else {
        message.error(res.reason);
      }
    });
  }
  
  clickConfig() {
    this.state.showConfig = true;
    this.setState(this.state);
  }
  
  
  render() {
    return (
      <div className="topic">
        <NavList clickConfig={this.clickConfig} data={this.state.dataList} />
        {this.state.showConfig ?
          <TopicConfig reload={this.reload} />
          : <TopicDetail /> }
      </div>
    );
  }
}

Topic.propTypes = {
  id: PropTypes.string
};


export default Topic;
