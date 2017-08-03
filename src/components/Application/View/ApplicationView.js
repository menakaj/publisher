import React, {Component} from 'react'
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

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
            </ul>
        </div>

    }

}

export default ApplicationView;