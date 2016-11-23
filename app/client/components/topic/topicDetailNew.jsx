/**
 * Created by YouHan on 2016/11/22.
 */
import React, {Component, PropTypes} from "react";
import {Input, Form, Button, message} from "antd";
import RichText from "./../common/richText";
import {TopicSelect} from "./../common/constSelect";
import Api from "./../api";
import Auth from "./../auth";

require('./../../style/topic.css');

const FormItem = Form.Item;

class TopicDetailNew extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      content: ''
    };
    
    this.contentChange = this.contentChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.topicChange = this.topicChange.bind(this);
    this.saveShare = this.saveShare.bind(this);
  }
  
  contentChange(value) {
    this.state.content = value;
    this.setState(this.state);
  }
  
  titleChange(e) {
    this.state.title = e.target.value;
    this.setState(this.state);
  }
  
  topicChange(value) {
    this.state.topicId = value;
    this.setState(this.state);
  }
  
  saveShare() {
    const me = this;
    Api.Share.add({
      topicId: me.state.topicId,
      title: me.state.title,
      content: me.state.content,
      ownerId: Auth.getUser().id
    }).then((res) => {
      if (res && res.success) {
        me.props.reload();
        location.href = `/index#/topic/${me.state.topicId}/share/${res.data.insertId}`;
      } else {
        message.error(res.reason);
      }
    });
  }
  
  render() {
    return (
      <div className="topic-detail">
        <Input style={{width: "100%", marginBottom: "12px"}} value={this.state.title} onChange={this.titleChange} />
        <RichText
          style={{
            width: '100%',
            height: '300px'
          }}
          placeholder="Tell something...."
          onChange={this.contentChange}
          value={this.state.content}
          disabled={false}
        />
        <FormItem
          label="Select Topic"
          style={{width: '300px', marginTop: '12px'}}
          labelCol={{span: 10}}
          wrapperCol={{span: 14}}
        >
          <TopicSelect value={this.state.topicId} onChange={this.topicChange} style={{width: '100%'}} />
        </FormItem>
        <FormItem style={{width: '300px', marginTop: '12px'}}>
          <Button onClick={this.saveShare} type="primary">Save</Button>
        </FormItem>
      </div>
    );
  }
}

TopicDetailNew.propTypes = {
  reload: PropTypes.func
};


export default TopicDetailNew;
