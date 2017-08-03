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
import {Avatar, Badge} from 'antd'

const styles = {
    title: {
        textAlign: 'center'
    },
    header: {
        background: '#fff000'
    },
    notify: {
        textDecorationColor: '#aaafff'
    }

};

class Header extends Component {

    render() {
        return <div style={styles.header}>
            <span style={styles.title}><h3>WSO2 IoT App Publisher</h3></span>
            <nav>
                <Badge count={1}><Avatar shape="circle" icon="notification" /></Badge>
                <Avatar size="large" icon="user" />
            </nav>
        </div>;
    }

}

export default Header;