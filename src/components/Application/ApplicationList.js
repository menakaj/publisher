import React, {Component} from 'react'
import {Button, Modal, Table} from 'antd'
import ApplicationView from "./View/ApplicationView";

const confirm = (id) => {
    Modal.confirm({
        title: 'Confirm',
        okText: 'OK',
        cancelText: 'Cancel',
    });
};



const styles = {
    deleted: {
        color: '#ff0204'
    },
    inprogress: {
        color: '#feaa11'
    },
    published: {
        color: "#37bf47"
    }
};

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100
}, {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
    width: 100,
    sorter: (a, b) => a.version > b.version,
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

        const deleted = <span style={styles.deleted}>Deleted</span>;
        const InProgress = <sapn style={styles.inprogress}>In Progress</sapn>;
        const published = <span style={styles.published}>Published</span>;
        return (state === 'Deleted'?deleted:(state === 'Published'?published:InProgress))
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
            open: {left: false}
        };

    }

    onRowClicked(app) {
        // e.stopPropagation();
        console.log(app.name);
        this.setState({showDetails:true, selectedApp:app}, console.log(this.state.showDetails));

    }

    componentWillMount() {
        this.setState({apps: this.getApps()});
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
        return [
            {
                name: "App1",
                category: "c1",
                version: "v1.0",
                os: "Android4",
                description: "jjflkjdfd f;djlfj;dsjf; lsafjf ",
                state: "Published"
            },
            {
                name: "App2",
                category: "c3",
                version: "v1.0",
                os: "iOS3",
                description: "jjflkjdfd f;djlfj;dsjf; lsafjf ",
                state: "InReview"
            },
            {
                name: "App3",
                category: "c1",
                version: "v2.0",
                os: "iOS1",
                description: "jjflkjdfd f;djlfj;dsjf; lsafjf ",
                state: "Published"
            },
            {
                name: "App4",
                category: "c2",
                version: "v14.0",
                os: "WebClip1",
                description: "jjflkjdfd f;djlfj;dsjf; lsafjf ",
                state: "Deleted"
            }
        ]

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


    handleRequestSort(event, property) {
        event.stopPropagation();
        const orderBy = property;
        let order = 'desc';
        console.log(property);

        if (this.state.orderBy === property && this.state.order === 'desc') {
            console.log("In if");
            order = 'asc';
        }

        const apps = this.state.apps.sort(
            (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
        );

        console.log(apps);
        console.log(orderBy + order);

        this.setState({apps: apps, order: order, orderBy: orderBy});
    };


    render() {
        return <div>
            <Table
                columns={columns}
                dataSource={this.state.apps}
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
}


export default ApplicationList;