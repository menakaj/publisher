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

import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher'
import Constants from '../common/constants';

const constants = Constants.constants;

class ApplicationStore extends EventEmitter{

    constructor() {
        super();
        this.apps = [
            {
                name: "App1",
                category: "c1",
                version: "5.0",
                os: "Android",
                description: "jjflkjdfd f;djlfj;dsjf; lsafjf ",
                state: "Published"
            },
            {
                name: "App2",
                category: "c3",
                version: "4.0",
                os: "iOS",
                description: "jjflkjdfd f;djlfj;dsjf; lsafjf ",
                state: "InReview"
            },
            {
                name: "App3",
                category: "c1",
                version: "2.0",
                os: "iOS",
                description: "jjflkjdfd f;djlfj;dsjf; lsafjf ",
                state: "Published"
            },
            {
                name: "App4",
                category: "c2",
                version: "14.0",
                os: "WebClip",
                description: "jjflkjdfd f;djlfj;dsjf; lsafjf ",
                state: "Deleted"
            }
        ];

    }

    createApp(app){
        console.log("Create app");
        this.apps.push
        (
            {
                name: "TestApp",
                category:"Category 1",
                version: "v2.0",
                os:"Android",
                description:"Fdsfds",
                state:"Created"
            }
        );

        this.emit("change");
    }

    getAllApps(){
        console.log(this.apps);
        return this.apps;
    }

    handleAction(action){
        console.log("Event Received to App Store ", action);
        switch (action.type) {
            case constants.ACTION_CREATE_APP: {
                console.log("Received action : Create");
                this.createApp(action.data);
            }
        }
    }
}

const AppStore = new ApplicationStore();
Dispatcher.register(AppStore.handleAction.bind(AppStore));
window.dispatcher = Dispatcher;
export default AppStore;