import React, {Component} from 'react'
import {Button, Checkbox, Form, Input} from 'antd'

class SimpleLoginForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const formItemLayout = {
            align: 'centre',
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item {...formItemLayout}>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input placeholder="Username"/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input type="password"
                                   placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout}>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>

                    </Form.Item>
                    <Form.Item {...formItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form></div>
        );
    }
}

const LoginForm = Form.create()(SimpleLoginForm);

export default LoginForm;