/**
 * Created by YouHan on 2016/9/19.
 */

 

import React, {PropTypes, Component} from "react";
import {Form, Input, Card, Col, Row, Button, message} from "antd";
import Api from "./../api";
import CommonSelect from "./../common/commonSelect";

const FormItem = Form.Item;

class Item extends Component {
  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this);
    this.memberSelect = this.memberSelect.bind(this);
    this.descChange = this.descChange.bind(this);
    this.save = this.save.bind(this);
  }

  nameChange(e) {
    this.props.change(this.props.key, 'name', e);
  }

  memberSelect(e) {
    this.props.change(this.props.key, 'memberIds', e);
  }

  descChange(e) {
    this.props.change(this.props.key, 'desc', e);
  }

  save() {
    this.props.change(this.props.key);
  }

  render() {
    return (
      <Card style={{marginBottom: '15px' }}>
        <Form horizontal={true}>
          <Row gutter={0}>
            <Col span={8}>
              <FormItem
                label="Team Name"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Input
                  size="default"
                  value={this.props.name}
                  onChange={this.nameChange}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem
                label="Member"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
              >
                <CommonSelect
                  value={this.props.memberIds}
                  onChange={this.memberSelect}
                  url="/member/all" multiple={true}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col span={16}>
              <FormItem
                label="Team Description"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
              >
                <Input
                  type="textarea"
                  rows={4}
                  value={this.props.desc}
                  onChange={this.descChange}
                />
              </FormItem>
            </Col>
            <Col span="8" offset={8}>
              <FormItem
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <Button type="primary" onClick={this.save}>{
                  this.props.id ? 'Update' : 'Save'
                }</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}


Item.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  desc: PropTypes.string,
  memberIds: PropTypes.arrayOf(PropTypes.number),
  save: PropTypes.func,
  change: PropTypes.func,
  key: PropTypes.number
};

Item.defaultProps = {
  id: undefined,
  name: '',
  desc: '',
  memberIds: []
};

export default class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [{
        id: undefined,
        desc: '',
        name: '',
        memberIds: []
      }]
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    const me = this;
    Api.Team.get().then((res) => {
      if (res && res.data) {
        me.setState({
          list: [{
            id: undefined,
            desc: '',
            name: '',
            memberIds: []
          }].concat(res.data),
        });
      }
    });
  }

  save(key) {
    const me = this;
    Api.Team.save(this.state.list[key]).then((res) => {
      if (res && res.success) {
        message.success('Save Success!');
        me.loadData();
      }
    });
  }

  change(key, field, e) {
    this.state.list[key][field] = (e.target ? e.target.value : e);
    this.setState(this.state);
  }

  render() {
    return (
      <div
        style={{padding: '12px 30px', width: '100%', height: window.innerHeight, overflow: 'auto'}}
      >
        {this.state.list.map((item, key) => {
          return (
            <Item
              data={item}
              key={key}
              name={item.name}
              id={item.id}
              desc={item.desc}
              memberIds={item.memberIds}
              save={this.save}
              change={this.change}
            />
          );
        })}
      </div>
    );
  }
}
