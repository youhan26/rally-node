/**
 * Created by YouHan on 2016/11/21.
 */
import React from "react";
import {Form, Button, Icon, Input, message} from "antd";
import {api} from "mimikiyru-utils";

require('./../../style/login.css');

const FormItem = Form.Item;

class BasicLogin extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, d) => {
      if (!err) {
        api.post({
          url: '/login',
          data: d
        })
          .then((res) => {
            if (res && res.success) {
              // me.props.updateUser(d.name);
              localStorage.user = d.name;
              location.href = `/index#`;
            } else {
              message.error(res.reason);
            }
          }, (error) => {
            message.error(error);
          });
      }
    });
  }
  
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div
        className="login"
        style={{
          backgroundImage: `url("./../../images/login/${this.props.location.query.ran}.jpg")`
        }}
      >
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
              <Input addonBefore={<Icon type="user" />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{width: "100%"}}>
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Login = Form.create()(BasicLogin);

export default Login;
