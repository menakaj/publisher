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
import {Button, Form, Icon, Input, Modal, Select, Upload} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

/** Flow:
 * Popup modal -> enter Platform
 *                      Store Type
 *                      Title
 *                      Upload app file.
 *
 *             -> Continue
 *
 * Page: Enter Title
 *             Description
 *             Category
 *             Screenshots
 *             Icon
 *             Banner
 *
 *    -> Create
 *
 */

class CreateApp extends Component {

    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewVisibleIcon: false,
            previewImage: '',
            previewImageIcon: '',
            fileList: [],
            iconImage: []
        };
    }

    handleCancel = () => this.setState({previewVisible: false});

    handleChange = ({fileList}) => this.setState({fileList});

    handleChangeIcon = ({icon}) => this.setState({icon});

    normFile = (e) => {
        console.log('Upload event:', e.file);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });


    };

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handlePreviewIcon = (file) => {
        this.setState({
            previewImageIcon: file.url || file.thumbUrl,
            previewVisibleIcon: true,
        });
    };

    render() {
        const {previewVisible, previewImageIcon, previewImage, fileList, previewVisibleIcon} = this.state;
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

        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (<div>
            <h3>{this.props.app.title}</h3>
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayout}
                    label="Title">
                    <span className="ant-form-text">{this.props.app.title}</span>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Description"
                    hasfeedback>
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Please specify the app description!'}],
                    })(
                        <Input.TextArea style={{width: '100%'}} autosize={{minRows: 2}}/>
                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Version"
                    hasfeedback>
                    {getFieldDecorator('version', {
                        rules: [{required: true, message: 'Please specify the app version!'}],
                    })(
                        <Input style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Category"
                    hasFeedback>
                    {getFieldDecorator('category', {
                        rules: [{
                            required: true, message: 'Please select your app category',
                        }],
                    })(
                        <Select placeHolder="Select the app platform">
                            <Option value="business">Business</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout}
                          label="Screenshots"
                          hasFeedback>
                    <div className="clearfix">
                        {getFieldDecorator('upload', {
                            valuePropName: 'file',
                            // getValueFromEvent: this.normFile,
                            rules: [{required: true, message: this.errorMsg}],
                        })(<div>
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}>
                                {fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{width: '110%'}} src={previewImage}/>
                            </Modal></div>)}
                    </div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Icon"
                    hasFeedback>
                    <div className="icon-holder">
                        {getFieldDecorator('upload', {
                            valuePropName: 'icon',
                            rules: [{required: true, message: this.errorMsg}],
                        })(<Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={this.state.iconImage}
                            onChange={this.handleChangeIcon}>
                            {this.state.iconImage === 1 ? null : uploadButton}
                        </Upload>)}
                    </div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Banner"
                    hasFeedback>
                    <div className="app-banner">
                        {getFieldDecorator('upload', {
                            valuePropName: 'banner',
                            rules: [{required: true, message: this.errorMsg}],
                        })(<Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={this.state.iconImage}
                            onChange={this.handleChangeIcon}>
                            {this.state.iconImage === 1 ? null : uploadButton}
                        </Upload>)}
                    </div>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit">
                        Create App
                    </Button>
                </FormItem>

            </Form></div>)
    }
}

const AppCreateStep2 = Form.create()(CreateApp);

export default AppCreateStep2;