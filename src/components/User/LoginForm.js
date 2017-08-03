/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {Component} from 'react'
import {Button, Checkbox, Form, Input} from 'antd'

class SimpleLoginForm extends Component {

    /**
     * Handles login form submit.
     *
     * */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                /**
                 * Call backend api here.
                 * axios.post().then(
                 *  store token in the session and redirect to the base.
                 * )
                 * */
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