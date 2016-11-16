/**
 * Created by YouHan on 2016/9/19.
 */

/* @flow */
"use strict";

import React, {PropTypes} from "react";
import {Form, Input, Card, Col, Row, Button, message} from "antd";
import Api from "./../api";
import CommonSelect from "./../common/commonSelect";
import type {res, event} from "./../common/types";


const FormItem = Form.Item;

const Item = React.createClass({
  getDefaultProps(){
    return {
      id: undefined,
      name: '',
      desc: '',
      memberIds: []
    }
  },
  //TODO add custom props type
  propsType: {
    id: PropTypes.any,
    name: PropTypes.string,
    desc: PropTypes.string,
    memberIds: PropTypes.arrayOf(PropTypes.any)
  },
  render() {
    const {nameChange, descChange, save, memberSelect} = this.props;

    return (
      <Card style={{
                    marginBottom : '15px'
                }}>
        <Form horizontal>
          <Row gutter={0}>
            <Col span={8}>
              <FormItem
                label="Team Name"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Input size="default" value={this.props.name}
                       onChange={nameChange}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <FormItem
                label='Member'
                labelCol={{span :5}}
                wrapperCol={{span :19}}
              >
                <CommonSelect value={this.props.memberIds}
                              onChange={memberSelect}
                              url="/member/all" multiple={true} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col span={16}>
              <FormItem
                label="Team Description"
                labelCol={{span : 5}}
                wrapperCol={{span : 19}}
              >
                <Input type="textarea" rows={4} value={this.props.desc}
                       onChange={descChange} />
              </FormItem>
            </Col>
            <Col span="8" offset={8}>
              <FormItem
                labelCol={{span : 10}}
                wrapperCol={{span : 14}}
              >
                <Button type="primary" onClick={save}>{
                  this.props.id ? 'Update' : 'Save'
                }</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
});

const Team = React.createClass({
  getInitialState(){
    return {
      list: [{
        id: undefined,
        desc: '',
        name: '',
        memberIds: []
      }]
    }
  },
  componentWillMount() {
    this.loadData();
  },
  loadData (){
    var me = this;
    Api.Team.get().then((res: res) => {
      if (res && res.data) {
        me.setState({
          list: [{
            id: undefined,
            desc: '',
            name: '',
            memberIds: []
          }].concat(res.data),
        })
      }
    });
  },
  save(key: number){
    var me = this;
    Api.Team.save(this.state.list[key]).then((res: res) => {
      if (res && res.success) {
        message.success('Save Success!');
        me.loadData();
      }
    });
  },
  nameChange (key: number, e: event){
    this.state.list[key].name = e.target.value;
    this.setState(this.state);
  },
  descChange(key: number, e: event){
    this.state.list[key].desc = e.target.value;
    this.setState(this.state);
  },
  memberSelect (key: number, value: []){
    this.state.list[key].memberIds = value;
    this.setState(this.state);
  },
  render() {
    return (
      <div style={{
                padding : '12px 30px',
                width : '100%',
                height : window.innerHeight,
                overflow : 'auto'
            }}>
        {this.state.list.map((item, key) => {
          return (
            <Item data={item} key={key}
                  name={item.name}
                  id={item.id}
                  desc={item.desc}
                  memberIds={item.memberIds}
                  save={this.save.bind(this, key)}
                  nameChange={this.nameChange.bind(this, key)}
                  descChange={this.descChange.bind(this, key)}
                  memberSelect={this.memberSelect.bind(this, key)}
            />
          )
        })}
      </div>
    )
  }
});

export default Team;