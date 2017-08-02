import React, {Component} from 'react'
import Application from "./Application";
import ApplicationView from "./View/ApplicationView";
import Drawer from 'material-ui/Drawer';


class ApplicationList extends Component {

    constructor() {
        super();
        this.apps = [];
        this.state = {
            selectedApp: {},
            open: {left:false}
        };

    }

    componentWillMount() {
        this.apps = this.getApps();
    }

    toggleDrawer = (side, open) => {
        const drawerState = {};
        drawerState[side] = open;
        this.setState({ open: drawerState }, console.log("Open Drawer"));
    };

    handleClose() {
        console.log("Close");
        this.toggleDrawer("right", false);
    }

    getApps() {
        return [
            {name: "App1",
            category: "c1",
            version: "v1.0",
            os: "Android",
            state: "Published"},
            {name: "App2",
                category: "c3",
                version: "v1.0",
                os: "Android",
                state: "InReview"},
            {name: "App3",
                category: "c1",
                version: "v2.0",
                os: "Android",
                state: "Published"},
            {name: "App4",
                category: "c2",
                version: "v14.0",
                os: "Android",
                state: "Deleted"}
        ]

    }

    onClickHandler(app) {
        console.log("In App List: " + app);
        this.toggleDrawer('right', true);
        this.setState({selectedApp: app});
    }


    render() {

        let appView = <ApplicationView app={this.state.selectedApp}/>;

        let apps = (this.apps.length >= 1)?this.apps.map(app => {
            return <Application key={app.name} app={app} onClickHandler={this.onClickHandler.bind(this)}/>
        }):<div>No Apps</div>;
        return <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Version</th>
                    <th>OS</th>
                    <th>State</th>
                </tr>
                </thead>
                <tbody>
                {apps}
                </tbody>
            </table>

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


export default ApplicationList;