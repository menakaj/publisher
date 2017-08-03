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
import {Button, Input, Modal} from 'antd'
import WrappedAppCreateStep1 from "../Application/Create/CreateAppModal";
import ApplicationList from "../Application/ApplicationList";
import AppCreateStep2 from "../Application/Create/CreateApp";

class AssetView extends Component {

    constructor() {
        super();
        this.state={
            searchText:"",
            showPopup:false,
            createAppStep: 1,
            appData: {}
        }
    }

    setVisibility(state) {
        this.setState({showPopup:state});
    }

    handleCancel() {
        this.setVisibility(false);
    }

    handleClick() {
        this.setVisibility(true);
    }

    handleOnChange(e) {
        // console.log(e.target.value);
        this.setState({searchText:e.target.value});
    }

    changeState(app) {
        console.log("Step 2");
        this.setState({createAppStep:2, showPopup: false, appData:app}, console.log(app))
    }

    render() {
        /**
         * Note: The app creation has two steps.
         * Step 1 is a modal, and in step 2, it redirects to a page.
         * Here, we have used a state to track the current step.
         * When the modal exits successfully, the step is incremented so that the next step loads to the page.
         */

        let renderHeader =
            (this.state.createAppStep === 1)?(<div>
                <Button type="primary" shape="circle" icon="plus" size="large" onClick={this.handleClick.bind(this)}/>
                <div>
                    <Input.Search placeholder="input search text"
                                  style={{ width: 200 }}
                                  onChange={this.handleOnChange.bind(this)}/>
                </div>
                <ApplicationList searchedText={this.state.searchText}/>
            </div>):<div className="form-step2"><AppCreateStep2 app={this.state.appData}/></div>;

        return <div>
            {renderHeader}
            <Modal
                title="Create Application"
                style={{ top: 20 }}
                visible={this.state.showPopup}
                onCancel={this.handleCancel.bind(this)}
                footer={[]}>
                <WrappedAppCreateStep1 stepUp={this.changeState.bind(this)}/>
            </Modal>
        </div>
    }

}

export default AssetView;