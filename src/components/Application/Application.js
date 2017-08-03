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

class Application extends Component {

    constructor() {
        super()
        this.handleOnClickRow.bind(this)
    }

    handleOnClickRow() {
        console.log(this.props.app.name);
        this.props.onClickHandler(this.props.app);
    }

    render() {
        return <tr onClick={this.handleOnClickRow.bind(this)}>
            <td>{this.props.app.name}</td>
            <td>{this.props.app.category}</td>
            <td>{this.props.app.version}</td>
            <td>{this.props.app.os}</td>
            <td>{this.props.app.state}</td>
        </tr>
    }
}

export default Application;