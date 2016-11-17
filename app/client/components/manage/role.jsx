/**
 * Created by YouHan on 2016/9/19.
 */

 
import React, {PropTypes, Component} from "react";
import {Form, Input, Card, Col, Row, Button, message} from "antd";
import Api from "./../api";

const FormItem = Form.Item;

class Item extends Component {
  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.save = this.save.bind(this);
  }

  nameChange(e) {
    this.props.change(this.props.index, 'name', e);
  }

  descChange(e) {
    this.props.change(this.props.index, 'introduction', e);
  }

  save() {
    this.props.save(this.props.index);
  }

  render() {
    return (
      <Card style={{marginBottom: '15px'}}>
        <Form horizontal={true}>
          <Row gutter={0}>
            <Col span={8}>
              <FormItem
                label="Role Name"
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
          <Row gutter={0}>
            <Col span={16}>
              <FormItem
                label="Role Introduction"
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
  save: PropTypes.func,
  change: PropTypes.func,
  name: PropTypes.string,
  index: PropTypes.number,
  introduction: PropTypes.string,
  id: PropTypes.number
};

Item.defaultProps = {
  id: undefined,
  name: '',
  introduction: ''
};

export default class Role extends Component {
  constructor(props) {
    super(props);

    this.emptyObj = {
      name: '',
      id: undefined,
      introduction: ''
    };

    this.list = [this.emptyObj];

    this.change = this.change.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    const me = this;
    Api.Role.get().then((res) => {
      if (res && res.data) {
        me.setState({
          list: [me.emptyObj].concat(res.data)
        });
      }
    });
  }

  save(key) {
    const me = this;
    Api.Role.save(this.state.list[key]).then((res) => {
      if (res && res.success) {
        message.success('Save Success!');
        me.loadData();
      }
    });
  }

  change(key, field, e) {
    this.state.list[key][field] = e.target.value;
  }

  render() {
    return (
      <div
        style={{padding: '12px 30px', width: '100%', height: window.innerHeight, overflow: 'auto' }}
      >
        {this.state.list.map((item, key) => {
          return (
            <Item
              key={key}
              id={item.id}
              index={key}
              name={item.name}
              introduction={item.introduction}
              save={this.save}
              change={this.change}
            />
          );
        })}
      </div>
    );
  }
}
