/**
 * Created by YouHan on 2016/11/22.
 */
import React, {Component} from "react";
import {Form, Tag, Input, Button} from "antd";
import CommonSelect from "./../common/commonSelect";

require('./../../style/topic.css');

const CheckableTag = Tag.CheckableTag;
const FormItem = Form.Item;

class TopicConfig extends Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      tagList: ['会议记录', '周报', 'test3'],
      selectedTags: []
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(tag, checked) {
    const {selectedTags} = this.state;
    const nextSelectedTags = checked ?
      [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    this.setState({selectedTags: nextSelectedTags});
  }
  
  
  render() {
    return (
      <div className="topic-config">
        {this.state.tagList.map((tag, index) => {
          return (<CheckableTag
            className="topic-config-tag"
            key={index}
            checked={this.state.selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>);
        })}
        <Form className="topic-config-tag-add">
          <FormItem>
            <Input placeholder="Input new topic" />
          </FormItem>
          <FormItem style={{display: "none"}}>
            <CommonSelect
              value={this.state.memberIds}
              onChange={this.memberSelect}
              url="/member/all" multiple={true}
            />
          </FormItem>
          <Button type="primary" style={{width: "100%"}}>
            New Topic
          </Button>
        </Form>
      </div>
    );
  }
}

export default TopicConfig;
