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
import ImagesUploader from 'react-images-uploader';

import {Button, Form, Icon, Input, Modal, Select, Upload, Tag, Tooltip} from 'antd'

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
 *    Known Issue: Fix image upload form.
 *
 */

class CreateApp extends Component {

    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewVisibleIcon: false,
            inputVisible: false,
            previewImage: '',
            previewImageIcon: '',
            inputValue: '',
            fileList: [],
            iconImage: [],
            banner: [],
            tags: []
        };
    }

    /** ----------------------------- Handling tags ---------------------------------*/
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => this.input = input;

    /** --------------------------- End handling tags ---------------------------------*/


    /** ------------------ Image upload and preview methods -------------------------- */


    handleCancel = () => this.setState({previewVisible: false});

    handleChange = ({fileList}) => this.setState({fileList});

    handleChangeIcon = (fileList) => this.setState({fileList}, console.log(fileList));

    handleChangeBanner = ({banner}) => this.setState({banner});

    normFile = (e) => {
        console.log('Upload event:', e.file);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file;
    };



    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    /** ------------------ End Image upload and preview methods -------------------------- */

    /**
     * Handles form submit.
     * ToDo: Create an Application object with data.
     * */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {

        const {fileList, iconImage, tags, inputVisible, inputValue, previewVisible, previewImage} = this.state;
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

        /**
         * Layout of the last form item. i.e: Submit button
         * */

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

        /**
         * Image upload button. In Ui, this will look like follows
         * ----------
         * .        .
         * .        .
         * .   +    .
         * .        .
         * .        .
         * ----------
         * */
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        console.log(fileList);
        return (<div>
            <h1>{this.props.app.title}</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="Title">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Please specify the Name of the app!'}],
                    })(
                        <Input style={{width: '100%'}} initialValue={this.props.app.title}/>
                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Short Description"
                    hasfeedback>
                    {getFieldDecorator('short_description', {
                        rules: [{required: true, message: 'Please specify a short description for the app!'}],
                    })(
                        <Input.TextArea style={{width: '100%'}} autosize={{minRows: 2}}/>
                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Description"
                    hasfeedback>
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Please specify the app description!'}],
                    })(
                        <Input.TextArea style={{width: '100%'}} autosize={{minRows: 5}}/>
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
                <FormItem
                    {...formItemLayout}
                    label="Visibility"
                    hasFeedback>
                    {getFieldDecorator('visibility', {
                        rules: [{
                            required: false, message: 'Please select your app category',
                        }],
                    })(
                        <Input style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Tags"
                    hasFeedback>
                    {getFieldDecorator('tags', {
                        rules: [{
                            required: false, message: 'Please select your app category',
                        }],
                    })(
                        <div>
                            {tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                    <Tag key={tag} closable='true' afterClose={() => this.handleClose(tag)}>
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                            {inputVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                />
                            )}
                            {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
                        </div>
                    )}
                </FormItem>
                <FormItem {...formItemLayout}
                          label="Screenshots"
                          hasFeedback>
                    <div className="clearfix">
                        {getFieldDecorator('screenshots', {
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
                        {getFieldDecorator('icon', {
                            valuePropName: 'file',
                            rules: [{required: true, message: this.errorMsg}],
                        })(<Upload
                            action="http://jsonplaceholder.typicode.com/posts/"
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
                        {getFieldDecorator('banner', {
                            valuePropName: 'file',
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
            </Form>
        </div>)
    }
}

const AppCreateStep2 = Form.create()(CreateApp);

export default AppCreateStep2;