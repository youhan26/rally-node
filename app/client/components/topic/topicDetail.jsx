/**
 * Created by YouHan on 2016/11/22.
 */
import React, {Component, PropTypes} from "react";
import {Input, Button, Icon, Collapse} from "antd";

require('./../../style/topic.css');

class TopicDetail extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="topic-detail">
        this is topic detail page
      </div>
    );
  }
}

TopicDetail.propTypes = {
  id: PropTypes.string
};


export default TopicDetail;
