/**
 * Created by YouHan on 2016/9/19.
 */
/* @flow */
"use strict";

import React from "react";
import {Form, Input, Card, Col, Row} from "antd";
import Api from "./../api";

const FormItem = Form.Item;

class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    // nameChange() {
    //     this.props.
    // }

    render() {
        return (
            <Card>
                <Form horizontal>
                    <Row gutter={16}>
                        <Col sm={8}>
                            <FormItem
                                label="Team Name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input size="default" value={this.props.data.name}
                                       disabled={this.props.data.name=== '' ? false : true}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={16}>
                            <FormItem
                                label="Team Description"
                                labelCol={{span : 5}}
                                wrapperCol={{span : 19}}
                            >
                                <Input type="textarea" rows={4} value={this.props.data.desc}/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}

Item.defaultProps = {
    data: {
        name: '',
        desc: ''
    }
};

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }


    componentWillMount() {
        Api.Team.get().then((res) => {
            if (res && res.data) {
                this.setState({
                    list: res.data
                })
            }
        })
    }

    save() {
        //TODO
    }

    render() {
        return (
            <div>
                <Item onSave={this.save.bind(this)} style={{
                    padding : '12px 30px'
                }}></Item>
                {this.state.list.map((item, key) => {
                    return (
                        <Item data={item} key={key}></Item>
                    )
                })}
            </div>
        )
    }
}

export default Team;