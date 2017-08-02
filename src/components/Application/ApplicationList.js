import React, {Component} from 'react'
import ApplicationView from "./View/ApplicationView";
import Drawer from 'material-ui/Drawer';
import Table, {TableBody, TableCell, TableHead, TableRow, TableSortLabel,} from 'material-ui/Table';

const columnData = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Application Name' },
    { id: 'version', numeric: false, disablePadding: false, label: 'Version' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
    { id: 'platform', numeric: false, disablePadding: false, label: 'Platform' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
];


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

    onClickHandler(app) {
        console.log("In App List: " + app);
        this.toggleDrawer('right', true);
        this.setState({selectedApp: app});
    }


    handleRequestSort(event, property) {
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
            <Table>
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                disablePadding={column.disablePadding}>
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={order}
                                    onClick={event => this.handleRequestSort(event, column.id)}>
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
                <TableBody>
                    {this.state.apps.map(n => {
                        // const isSelected = this.isSelected(n.id);
                        return (
                            <TableRow
                                hover
                                key={n.name}
                                onClick={event => this.onClickHandler(n)}>
                                <TableCell >
                                    {n.name}
                                </TableCell>
                                <TableCell>
                                    {n.version}
                                </TableCell>
                                <TableCell >
                                    {n.category}
                                </TableCell>
                                <TableCell >
                                    {n.os}
                                </TableCell>
                                <TableCell >
                                    {n.state}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Drawer
                anchor="right"
                open={this.state.open.right}
                width="200px"
                onRequestClose={this.handleClose.bind(this)}>
                {appView}
            </Drawer>

        </div>;
    }
}

const table = {

}


export default ApplicationList;