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

class ApplicationView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        // console.log(this.props.app);
        const app = this.props.app;
        return <div>

            <ul>
                <li>Name: {app.name}</li>
                <li>Description: {app.description}</li>
                <li>Version: {app.version}</li>
                <li>State: {app.state}</li>
                <li>Ratings: *****</li>
                <li>Screenshots: </li>
                <li>Comments: bla bla bla</li>
            </ul>
        </div>

    }

}

export default ApplicationView;