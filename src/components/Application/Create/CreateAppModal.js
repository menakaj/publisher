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
import {Button, Select, Form, Icon, Input, Upload, message} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class AppCreateStep1 extends Component {

    constructor() {
        super();
        this.file = "";
        this.webclip = "";
        this.errorMsg = "";
        this.hiddenUpload = "";
        this.app = {};
        this.state = {
            confirmDirty: false,
            showDialog: false,
            platforms: {},
            storeTypes: {},
            anchorEl: undefined,
            showMenu: false,
            selectedIndex: 1,

        }
    }

    beforeUpload(fileb) {
        console.log("Before upload checking " + this.file);
        console.log(fileb);
        let filetype = "";
        let isSupported = "";

        if (this.file === ".apk") {
            isSupported = fileb.type === 'application/vnd.android.package-archive';
            console.log("Android " + isSupported);
            filetype = "Upload a correct .apk file!";
        } else {
            isSupported = fileb.name.indexOf(".ipa") !== -1;
            console.log("in iOS " + fileb.type);
            filetype = "Upload a correct .ipa file!";
        }
        if (!isSupported) {
            message.error(filetype);

        }

        return isSupported;
    }

    componentWillMount() {
        let platforms = [{value: "ios", label: "iOS"}, {value: "android", label: "Android"},
            {value: "webclip", label: "Web Clip"}];

        let storeTypes = [{value: "enterprise", label: "Enterprise"}, {value: "public", label: "Public"}];

        this.setState({platforms, storeTypes});
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.stepUp(values);
                console.log('Received values of form: ', values);
            }
        });


    };

    handleSelectChange = (value) => {
        if (value !== "webClip") {
            this.hiddenUpload = "";
            this.file = (value === "android") ? ".apk" : ".ipa";
            this.errorMsg = 'Please upload ' + this.file + ' file';
        } else {
            this.file = "web";
        }
        console.log(value);

    };


    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file;
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        const draggerProps = {
            multiple: false
        }

        return ( <Form onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label="Platform"
                hasFeedback>
                {getFieldDecorator('platform', {
                    rules: [{
                        required: true, message: 'Please select your platform',
                    }],
                })(
                    <Select placeHolder="Select the app platform" onChange={this.handleSelectChange}>
                        {this.state.platforms.map(platform => {
                            return <Option key={platform.value} value={platform.value}>{platform.label}</Option>
                        })}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Store Type"
                hasFeedback>
                {getFieldDecorator('storeTypes', {
                    rules: [{
                        required: true, message: 'Please input your password!',
                    }, {
                        validator: this.checkConfirm,
                    }],
                })(
                    <Select>
                        {this.state.storeTypes.map(storeType => {
                            return <Option key={storeType.value} value={storeType.value}>{storeType.label}</Option>
                        })}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Title"
                hasFeedback>
                {getFieldDecorator('title', {
                    rules: [{required: true, message: 'Please specify the app title!'}],
                })(
                    <Input style={{width: '100%'}}/>
                )}
            </FormItem>

            {this.file !== "web" ?

                <FormItem
                    {...formItemLayout}
                    label="Upload app"
                    hasFeedback>
                    <div className="dropbox">
                        {getFieldDecorator('dragger', {
                            valuePropName: 'file',
                            getValueFromEvent: this.normFile,
                            rules: [{required: true, message: this.errorMsg}],
                        })(
                            <Upload.Dragger {...draggerProps} beforeUpload={this.beforeUpload.bind(this)} name="file"
                                            action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                    <Icon type="upload"/>
                                </p>
                                <p className="ant-upload-text">Click or drag {this.file} file to this area to upload</p>
                            </Upload.Dragger>
                        )}
                    </div>
                </FormItem> : <FormItem
                    {...formItemLayout}
                    label="Web Clip URL"
                    hasFeedback>
                    {getFieldDecorator('webClipURL', {
                        rules: [{required: true, message: 'Please specify web clip url!'}],
                    })(
                        <Input style={{width: '100%'}} placeholder="http://example.com"/>
                    )}
                </FormItem>
            }

            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Continue ></Button>
            </FormItem>
        </Form>)
    }

}


const WrappedAppCreateStep1 = Form.create()(AppCreateStep1);

export default WrappedAppCreateStep1;