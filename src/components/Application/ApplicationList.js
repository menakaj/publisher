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
import {Button, Modal, Table} from 'antd'
import ApplicationView from "./View/ApplicationView";
import AppStore from '../../store/ApplicationStore';

const confirm = (id) => {
    Modal.confirm({
        title: 'Confirm',
        okText: 'OK',
        cancelText: 'Cancel',
    });
};

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    sorter: (a, b) => a.version > b.version
}, {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
    width: 100
}, {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 100,
}, {
    title: 'Platform',
    dataIndex: 'os',
    key: 'os',
    width: 100
}, {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    width: 100,
    render: (state) => {

        const created = <span className="created">Created</span>;
        const deleted = <span className="deleted">Deleted</span>;
        const inReview = <sapn className="inProgress">In Review</sapn>;
        const published = <span className="published">Published</span>;
        return (state === 'Deleted'?deleted:(state === 'Published'?published:(state=== 'Created'?created:inReview)))
    }
},
    {
        title: '',
        key: 'operation',
        dataIndex: 'operation',
        width: 100,
        render: (operation) => {
            return (
                <span>
                <Button type="default" icon="edit" onClick={(e) => {
                    e.stopPropagation();
                    confirm(operation);
                }}/>
        </span>
            );
        },
    }];


class ApplicationList extends Component {

    constructor() {
        super();
        this.orderBy = "name";
        this.order = "asc";
        this.state = {
            apps: [],
            showDetails: false,
            order: "asc",
            orderBy: "name",
            selectedApp: {},
            open: {left: false},
            searchedApps:[]
        };

    }

    onRowClicked(app) {
        // e.stopPropagation();
        console.log(app.name);

        this.setState({showDetails:true, selectedApp:app}, console.log(this.state.showDetails));

    }

    componentWillMount() {

        this.setState({apps: this.getApps(), searchedApps: this.getApps()});
    }

    componentDidMount() {
        AppStore.on("change", () => {
            this.setState({apps: AppStore.getAllApps()})
        });
        console.log("Did mount");
    }

    toggleDrawer = (side, open) => {
        const drawerState = {};
        drawerState[side] = open;
        this.setState({open: drawerState});
    };

    handleClose() {
        this.toggleDrawer("right", false);
    }

    handleClick() {
        console.log("Edit clicked");
        this.handleClose();
    }


    getApps() {

        /**
         * Call backend api and get the list of apps.
         * axios.get().then()
         * */
        return AppStore.getAllApps();

    }

    onClickHandler(e, app) {
        e.stopPropagation();
        console.log(e.target);
        console.log("In App List: " + app);
        this.toggleDrawer('right', true);
        this.setState({selectedApp: app});
    }

    handleOK() {
        this.setState({
            showDetails: false,
        });
    }

    render() {
        console.log(this.props.searchedText);
        if(this.state.apps.length > 0) {
            return <div>
                <Table
                    columns={columns}
                    dataSource={this.state.searchedApps}
                    bordered
                    size="middle"
                    onRowClick={this.onRowClicked.bind(this)}
                    scroll={{x: '80%', y: 240}}
                />
                <Modal
                    visible={this.state.showDetails}
                    title={this.state.selectedApp.name}
                    onOk={this.handleOK.bind(this)}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleOK.bind(this)}>OK</Button>,
                    ]}
                >
                    <ApplicationView app={this.state.selectedApp}/>
                </Modal>;
            </div>;
        }

        return <div>
            <Button type="primary">Create New Application</Button>
        </div>

    }
}


export default ApplicationList;