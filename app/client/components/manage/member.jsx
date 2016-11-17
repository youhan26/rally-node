/**
 * Created by YouHan on 2016/9/19.
 */
import React, {Component, PropTypes} from "react";
import {Form, Input, Card, Col, Row, Button, message} from "antd";
import Api from "./../api";
import CommonSelect from "./../common/commonSelect";

const FormItem = Form.Item;

class Item extends Component {
  constructor(props) {
    super(props);
    
    this.nameChange = this.nameChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.roleSelect = this.roleSelect.bind(this);
    this.save = this.save.bind(this);
  }
  
  nameChange(e) {
    this.props.change(e, 'name', this.props.index);
  }
  
  descChange(e) {
    this.props.change(e, 'introduction', this.props.index);
  }
  
  roleSelect(e) {
    this.props.change(e, 'role_id', this.props.index);
  }
  
  save() {
    this.props.save(this.props.index);
  }
  
  render() {
    return (
      <Card
        style={{marginBottom: '15px'}}
      >
        <Form horizontal={true}>
          <Row gutter={0}>
            <Col span={8}>
              <FormItem
                label="Member Name"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
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
            <Col span={8}>
              <FormItem
                label="Role"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <CommonSelect
                  value={this.props.role_id}
                  onChange={this.roleSelect}
                  url="/role/all" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col span={16}>
              <FormItem
                label="Member Description"
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
              >
                <Input
                  type="textarea"
                  rows={4}
                  value={this.props.introduction}
                  onChange={this.descChange} />
              </FormItem>
            </Col>
            <Col span="8" offset={8}>
              <FormItem
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <Button
                  type="primary"
                  onClick={this.save}>{
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
  name: PropTypes.string,
  role_id: PropTypes.string,
  introduction: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  change: PropTypes.func,
  save: PropTypes.func
};

Item.defaultProps = {
  name: '',
  role_id: undefined,
  introduction: '',
  id: undefined
};

export default class Member extends Component {
  constructor(props) {
    super(props);
    
    this.emptyObj = {
      name: '',
      introduction: '',
      id: undefined,
      role_id: undefined
    };
    this.state = {
      list: [this.emptyObj]
    };
    
    this.save = this.save.bind(this);
    this.change = this.change.bind(this);
  }
  
  
  componentWillMount() {
    this.loadData();
  }
  
  loadData() {
    const me = this;
    Api.Member.get().then((res) => {
      if (res && res.data) {
        me.setState({
          list: [this.emptyObj].concat(res.data)
        });
      }
    });
  }
  
  save(key) {
    const me = this;
    Api.Member.save(this.state.list[key]).then((res) => {
      if (res && res.success) {
        message.success('Save Success!');
        me.loadData();
      }
    });
  }
  
  change(e, field, key) {
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
              id={item.id}
              key={key}
              index={key}
              introduction={item.introduction}
              role_id={item.role_id}
              name={item.name}
              save={this.save}
              change={this.change}
            />
          );
        })}
      </div>
    );
  }
}
