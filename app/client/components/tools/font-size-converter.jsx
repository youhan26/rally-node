/* @flow***REMOVED***
'use strict';

import React from "react";
import {api} from "mimikiyru-utils";
import {Card, Form, Row, Col, InputNumber, Button, Icon, message} from "antd";

const FormItem = Form.Item;


const Pt2Rem = React.createClass({
    getInitialState(){
        return {
            pt: {
                base: 640,
                showResult: false,
                pt: 26
            }
        }
    },
    convertPt (){
        api.get({
            url: '/tools/convertor/pt2rem',
            params: this.state.pt
        }).then((res) => {
            this.state.pt.showResult = true;
            this.state.pt.result = res.data;
            this.setState(this.state);
        ***REMOVED***
    },
    render (){
        return <Card style={{ width: '100%' }} title="Pt 转 Rem">
            <Form horizontal>
                <Row>
                    <Col span="8">
                        <FormItem
                            label="基准页面宽度(px)"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <InputNumber value={this.state.pt.base} onChange={value  =>{
                                    this.state.pt.base = value;
                                    this.setState(this.state);
                                }} min={1} disabled={true}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                            label="PT"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <InputNumber value={this.state.pt.pt} onChange={(value) =>{
                                 this.state.pt.pt = value;
                                    this.setState(this.state);
                                }} min={6} max={36}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset={8}>
                        <FormItem>
                            <Button type="primary" onClick={this.convertPt}>Convert</Button>
                        </FormItem>
                    </Col>
                </Row>
                {this.state.pt.showResult ?
                    <Row>
                        <Col span="8">
                            <FormItem
                                label="转换后的结果"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {this.state.pt.result}rem
                            </FormItem>
                        </Col>
                    </Row>
                    : null}
            </Form>
        </Card>
    }
***REMOVED***


const FontSizeConverter = React.createClass({
    getInitialState(){
        return {
            width: 0,
            height: 0
        }
    },
    uploadClick (){
        if (this.inputEl != null) {
            this.inputEl.click();
        }
    },
    fileChange(e){
        var me = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.onload = function () {
                var that = this;
                me.setState({
                    width: that.width,
                    height: that.height,
                    img: e.target.result
                })
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    },
    render (){
        return <div style={{width : '100%',
            padding : '20px'
        }}>
            <Pt2Rem></Pt2Rem>
            <Card style={{ width: '100%',marginTop:'20px' }} title="上传图片显示大小">
                <div style={{
                    width : '100%'
                }}>
                    <Row>
                        <Col span="8">
                            <Button type="ghost" onClick={this.uploadClick}>
                                <Icon type="upload"/> Click to Upload
                            </Button>
                            <input type="file" style={{display : 'none'}} name="fileUpload"
                                   ref={(ref) => this.inputEl = ref} onChange={this.fileChange}/>
                        </Col>
                        <Col span="8">
                            <img src={this.state.img} style={{
                                width : '100%'
                            }}/>
                        </Col>
                        <Col span="8" style={{
                            textAlign : 'center'
                        }}>
                            width : {this.state.width} px<br/>
                            height : {this.state.height} px
                        </Col>
                    </Row>
                </div>

            </Card>
        </div>
    },

***REMOVED***


export default  FontSizeConverter;