import React, {Component} from 'react'
import ApplicationView from "./View/ApplicationView";
import {Table, Button, Modal} from 'antd'

const confirm = (id) => {
    Modal.confirm({
        title: 'Confirm',
        content: 'Bla bla ...',
        okText: 'OK',
        cancelText: 'Cancel',
    });
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
        },{
    title: 'Platform',
    dataIndex: 'os',
    key: 'os',
    width: 100
},{
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    width: 100
},
    {
        title: '',
        key: 'operation',
        dataIndex: 'operation',
        width: 100,
        render: (operation) => {return (
            <span>
                <Button type="primary" onClick={(e) => { e.stopPropagation(); confirm(operation); }}>Edit</Button>
        </span>
        );},
    }];



class ApplicationList extends Component {

    constructor() {
        super();
        this.orderBy = "name";
        this.order = "asc";
        this.state = {
            apps: [],
            order: "asc",
            orderBy: "name",
            selectedApp: {},
            open: {left:false}
        };

    }

    componentWillMount() {
        this.setState({apps:this.getApps()});
    }

    toggleDrawer = (side, open) => {
        const drawerState = {};
        drawerState[side] = open;
        this.setState({ open: drawerState });
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
            {name: "App1",
            category: "c1",
            version: "v1.0",
            os: "Android4",
            state: "Published"},
            {name: "App2",
                category: "c3",
                version: "v1.0",
                os: "iOS3",
                state: "InReview"},
            {name: "App3",
                category: "c1",
                version: "v2.0",
                os: "iOS1",
                state: "Published"},
            {name: "App4",
                category: "c2",
                version: "v14.0",
                os: "WebClip1",
                state: "Deleted"}
        ]

    }

    onClickHandler(e, app) {
        e.stopPropagation();
        console.log(e.target);
        console.log("In App List: " + app);
        this.toggleDrawer('right', true);
        this.setState({selectedApp: app});
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

        this.setState({ apps:apps, order:order, orderBy:orderBy});
    };


    render() {
        const { order, orderBy } = this.state;
        let appView = <ApplicationView key={this.state.selectedApp.name} app={this.state.selectedApp}/>;

        // let apps = (this.apps.length >= 1)?this.apps.map(app => {
        //     return <Application key={app.name} app={app} onClickHandler={this.onClickHandler.bind(this)}/>
        // }):<div>No Apps</div>;
        return <div>
            <Table
                columns={columns}
                dataSource={this.state.apps}
                bordered
                size="middle"
                onRowClick={() => {console.log("Table row clicked")}}
                scroll={{ x: '80%', y: 240 }}
            />
            {/*<Drawer*/}
                {/*anchor="right"*/}
                {/*open={this.state.open.right}*/}
                {/*width="200px"*/}
                {/*onRequestClose={this.handleClose.bind(this)}>*/}
                {/*{appView}*/}
            {/*</Drawer>*/}

        </div>;
    }
}

const table = {

}


export default ApplicationList;