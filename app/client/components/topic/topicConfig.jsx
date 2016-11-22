/**
 * Created by YouHan on 2016/11/22.
 */
import React, {Component, PropTypes} from "react";
import {Form, Tag, Input, Button, message} from "antd";
import CommonSelect from "./../common/commonSelect";
import Api from "./../api";
import Auth from "./../auth";

require('./../../style/topic.css');

const CheckableTag = Tag.CheckableTag;
const FormItem = Form.Item;

class TopicConfig extends Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      topicList: [],
      topic: '',
      selectedTopics: []
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.topicChange = this.topicChange.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  
  componentWillMount() {
    this.loadData();
  }
  
  loadData() {
    const me = this;
    Api.Topic.get()
      .then((res) => {
        if (res && res.success) {
          me.state.topicList = res.data;
          Api.Topic.getUserList().then((res2) => {
            if (res2 && res2.success) {
              me.state.selectedTopics = res2.data;
              me.setState(me.state);
            }
          });
        } else {
          message.error(res.reason);
        }
      });
  }
  
  topicChange(e) {
    this.state.topic = e.target.value;
    this.setState(this.state);
  }
  
  handleChange(topic, checked) {
    const me = this;
    const {selectedTopics} = me.state;
    const nextSelectedTopics = checked ?
      [...selectedTopics, topic] : selectedTopics.filter(t => t.id !== topic.id);
    me.setState({selectedTopics: nextSelectedTopics});
    
    Api.Topic.setUserList(nextSelectedTopics.map((item) => {
      return item.id;
    })).then((res) => {
      if (res && res.success) {
        message.success('Update!');
        me.props.reload();
      } else {
        message.error('Save Failed!');
      }
    });
  }
  
  addTopic() {
    const me = this;
    Api.Topic.add({
      ownerId: Auth.getUser().id,
      title: this.state.topic
    }).then((res) => {
      if (res && res.success) {
        me.state.topic = '';
        me.setState(me.state);
        me.loadData();
      } else {
        message.error(res.reason);
      }
    }).catch((error) => {
      message.error(error);
    });
  }
  
  render() {
    const getChecked = (topic) => {
      let flag = false;
      this.state.selectedTopics.forEach((item) => {
        if (item.id === topic.id) {
          flag = true;
        }
      });
      return flag;
    };
    
    return (
      <div className="topic-config">
        {this.state.topicList.map((topic) => {
          return (<CheckableTag
            className="topic-config-tag"
            key={topic.id}
            checked={getChecked(topic)}
            onChange={checked => this.handleChange(topic, checked)}
          >
            {topic.title}
          </CheckableTag>);
        })}
        <Form className="topic-config-tag-add">
          <FormItem>
            <Input placeholder="Input new topic" value={this.state.topic} onChange={this.topicChange} />
          </FormItem>
          <FormItem style={{display: "none"}}>
            <CommonSelect
              value={this.state.memberIds}
              onChange={this.memberSelect}
              url="/member/all" multiple={true}
            />
          </FormItem>
          <Button type="primary" style={{width: "100%"}} onClick={this.addTopic}>
            New Topic
          </Button>
        </Form>
      </div>
    );
  }
}

TopicConfig.propTypes = {
  reload: PropTypes.func
};

export default TopicConfig;
