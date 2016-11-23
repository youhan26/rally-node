/**
 * Created by YouHan on 2016/11/22.
 */
import React, {Component, PropTypes} from "react";
import {Input, Card} from "antd";
import RichText from "./../common/richText";

require('./../../style/topic.css');

class TopicDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      content: ''
    };
    
    this.contentChange = this.contentChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
  }
  
  componentWillMount() {
    this.loadData(this.props.shareId);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.shareId !== nextProps.shareId) {
      this.loadData(nextProps.shareId);
    }
  }
  
  loadData(id = '') {
    const me = this;
    if (id !== '') {
      console.log(id);
    }
  }
  
  contentChange(value) {
    this.state.content = value;
    this.setState(this.state);
  }
  
  titleChange(e) {
    this.state.title = e.target.value;
    this.setState(this.state);
  }
  
  render() {
    return (
      <div className="topic-detail">
        <Card>
          <Input style={{width: "100%"}} value={this.state.title} onChange={this.titleChange} />
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
        </Card>
      </div>
    );
  }
}

TopicDetail.propTypes = {
  shareId: PropTypes.string,
  reload: PropTypes.func
};


export default TopicDetail;
