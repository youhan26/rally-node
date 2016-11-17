/**
 * Created by YouHan on 2016/10/13.
 */
import React from "react";
import {Card, Form, Row, Col, InputNumber, Input} from "antd";
const QRCode = require('qrcode.react');

const FormItem = Form.Item;

const Code = React.createClass({
  getInitialState(){
    return {
      value: 'http://test.com',
      size: 128,
      bgColor: '#FFFFFF',
      fgColor: '#000000',
      level: 'L'
    };
  },
  render(){
    return (
      <div style={{width: '100%'}}>
        <Card style={{width: '100%', margin: '20px'}} title="QRCode 生成工具">
          <Form>
            <Row>
              <Col span="8">
                <FormItem
                  label="Url"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <Input
                    value={this.state.value}
                    onChange={(e) => {
                      this.state.value = e.target.value;
                      this.setState(this.state);
                    }}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem
                  label="Size"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <InputNumber
                    value={this.state.size}
                    onChange={(value) => {
                      this.state.size = value;
                      this.setState(this.state);
                    }} min={1}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem
                  label="Image"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <QRCode
                    value={this.state.value} size={this.state.size}
                    bgColor={this.state.bgColor} fgColor={this.state.fgColor}
                  />
                </FormItem>
              </Col>
            </Row>
          
          </Form>
        </Card>
      </div>
    );
  }
});

export default Code;
