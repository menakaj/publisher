import React, {Component} from 'react'
import {Button, Select, Form, Icon, Input, Upload} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class AppCreateStep1 extends Component {

    constructor() {
        super();
        this.file="";
        this.errorMsg="";
        this.hiddenUpload="";
        this.app = {};
        this.state = {
            confirmDirty: false,
            showDialog:false,
            anchorEl:undefined,
            showMenu: false,
            selectedIndex: 1,

        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
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
            this.file = (value === "android")?".apk":".ipa";
            this.errorMsg = 'Please upload ' + this.file + ' file';
        } else {
            this.hiddenUpload = "hidden"
        }
        console.log(value);

    };

    platforms = [{value:"ios", label:"iOS"}, {value:"android", label:"Android"}, {value:"webclip", label:"Web Clip"}];
    storeTypes = [{value:"enterprise", label:"Enterprise"}, {value:"public", label:"Public"}];

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file;
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
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
                        <Option value="ios">iOS</Option>
                        <Option value="android">Android</Option>
                        <Option value="webClip">Web Clip</Option>
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
                    <Select onChange={this.handleSelectChange}>
                        <Option value="enterprise">Enterprise</Option>
                        <Option value="public">Public</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Title"
                hasFeedback>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please specify the app title!' }],
                })(
                    <Input style={{ width: '100%' }} />
                )}
            </FormItem>



            <FormItem
                {...formItemLayout}
                label=" "
                hasFeedback>
                <div className="dropbox" >
                    {getFieldDecorator('dragger', {
                        valuePropName: 'file',
                        getValueFromEvent: this.normFile,
                        rules: [{ required: true, message:this.errorMsg }],
                    })(
                        <Upload.Dragger {...draggerProps} name="file" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <Icon type="upload" />
                            </p>
                            <p className="ant-upload-text">Click or drag {this.file} file to this area to upload</p>
                            </Upload.Dragger>
                    )}
                </div>
            </FormItem>

            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Continue ></Button>
            </FormItem>
        </Form>)
    }

}


const WrappedAppCreateStep1 = Form.create()(AppCreateStep1);

export default WrappedAppCreateStep1;