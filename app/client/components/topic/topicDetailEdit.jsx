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
        content: '',
        owner: {}
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
    me.state.content = '';
    me.setState(me.state);
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
        me.state.replayList = res.data;
        me.setState(me.state);
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
        <div className="topic-detail-share">
          <div style={{width: "130px"}}>
            <img src={this.state.share.owner.avatar} className="avatar" alt="" />
            <p>{this.state.share.owner.name}</p>
            <p>{this.state.share.createTime}</p>
          </div>
          <div style={{flex: 1}}>
            <p style={{fontSize: '20px'}}>{this.state.share.title}</p>
            <RichText
              style={{
                width: '100%',
                height: '300px'
              }}
              placeholder="Tell something...."
              value={this.state.share.content}
              disabled={true}
            />
          </div>
          <div style={{width: '130px'}} />
        </div>
        {this.state.replayList.map((replay) => {
          return (
            <div className="topic-detail-share" key={replay.id}>
              <div style={{width: "130px"}}>
                <img src={this.state.share.owner.avatar} className="avatar" alt="" />
                <p>{replay.owner.name}</p>
                <p>{replay.createTime}</p>
              </div>
              <div style={{flex: 1}}>
                <Card style={{width: '100%', minHeight: '90px'}}>
                  {replay.content}
                </Card>
              </div>
              <div style={{width: '130px'}} />
            </div>
          );
        })}
        <div className="topic-detail-share" style={{marginBottom: '150px'}}>
          <div style={{width: "130px"}} />
          <div style={{flex: 1}}>
            <Input
              type="textarea"
              rows={4}
              value={this.state.content}
              onChange={this.contentChange}
              style={{width: '100%'}}
            />
          </div>
          <div style={{width: '130px'}}>
            <Button onClick={this.replay}>replay</Button>
          </div>
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
