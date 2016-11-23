/**
 * Created by YouHan on 2016/11/22.
 */
import React, {Component, PropTypes} from "react";
import {Input, message, Card, Button} from "antd";
import RichText from "./../common/richText";
import Api from "./../api";
import Auth from "./../auth";

require('./../../style/topic.css');

class TopicDetailEdit extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      share: {
        content: ''
      },
      replayList: [],
      content: ''
    };
    this.loadData = this.loadData.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.replay = this.replay.bind(this);
  }
  
  componentWillMount() {
    if (this.props.params.sid) {
      this.loadData(this.props.params.sid);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.params.sid !== nextProps.params.sid) {
      this.loadData(nextProps.params.sid);
    }
  }
  
  contentChange(e) {
    this.state.content = e.target.value;
    this.setState(this.state);
  }
  
  loadData(sid = this.props.params.sid) {
    const me = this;
    if (!sid) {
      message.error('当前网址不对!');
      return;
    }
    Api.Share.get(sid).then((res) => {
      if (res && res.success) {
        me.state.share = res.data;
        me.setState(me.state);
      } else {
        message.error(res.reason);
      }
    });
    Api.Share.getReplay({
      id: sid
    }).then((res) => {
      if (res && res.success) {
        console.log(res.data);
      } else {
        message.error(res.reason);
      }
    });
  }
  
  replay() {
    const me = this;
    Api.Replay.add({
      shareId: me.props.params.sid,
      content: me.state.content,
      ownerId: Auth.getUser().id
    }).then((res) => {
      if (res && res.success) {
        message.success('Saved!');
        me.loadData();
      }
    });
  }
  
  render() {
    return (
      <div className="topic-detail">
        <Input style={{width: "100%", marginBottom: "12px"}} value={this.state.share.title} disabled={true} />
        <RichText
          style={{
            width: '100%',
            height: '300px'
          }}
          placeholder="Tell something...."
          value={this.state.share.content}
          disabled={true}
        />
        <div style={{width: "100%", display: "flex"}}>
          {this.state.share.id} —— {this.state.share.createTime}
        </div>
        {this.state.replayList.map((replay) => {
          return (
            <Card>
              {replay.content}
              <div>
                {replay.ownerId} —— {replay.createTime}
              </div>
            </Card>
          );
        })}
        <div style={{width: "100%", display: "flex"}}>
          <Input type="textarea" rows={4} value={this.state.content} onChange={this.contentChange} />
          <Button onClick={this.replay}>replay</Button>
        </div>
      </div>
    );
  }
}

TopicDetailEdit.propTypes = {
  reload: PropTypes.func,
  params: PropTypes.shape({
    sid: PropTypes.string
  })
};


export default TopicDetailEdit;
