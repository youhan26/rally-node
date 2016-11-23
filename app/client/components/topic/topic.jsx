/**
 * Created by YouHan on 2016/11/22.
 */
import React, {Component, PropTypes} from "react";
import {Button, Collapse, Card, message} from "antd";
import {Link} from "react-router";
import Api from "./../api";


require('./../../style/topic.css');

const Panel = Collapse.Panel;

const NavList = (props) => {
  return (
    <div className="topic-navList">
      <Collapse
        activeKey={props.data.map((item) => {
          return item.id;
        })}
      >
        {props.data.map((item) => {
          return (
            <Panel header={item.title} key={item.id} className={props.params.id === item.id ? 'primary-collapse' : ''}>
              {item.shares.map((share) => {
                return (
                  <Card key={share.id} className={props.params.sid === share.id ? 'primary-panel' : ''}>
                    <Link to={`/topic/${item.id}/share/${share.id}`}>{share.title}</Link>
                  </Card>
                );
              })}
            </Panel>);
        })}
      </Collapse>
      <Button style={{width: '185px'}} type="primary">
        <Link to="/topic/config">Subscribe Topic</Link>
      </Button>
      <Button style={{width: '185px'}} type="default">
        <Link to="/topic/new">Write something</Link>
      </Button>
    </div>
  );
};

NavList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    shares: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string
    }))
  })),
  params: PropTypes.shape({
    id: PropTypes.string,
    sid: PropTypes.string
  })
};

class Topic extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showConfig: false,
      dataList: [],
      shareId: null
    };
    
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
  
  render() {
    const me = this;
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        reload: me.reload
      })
    );
    
    return (
      <div className="topic">
        <NavList data={this.state.dataList} {...this.props} />
        {childrenWithProps}
      </div>
    );
  }
}

Topic.propTypes = {
  id: PropTypes.string,
  children: PropTypes.shape({})
};


export default Topic;
