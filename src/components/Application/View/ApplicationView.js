import React, {Component} from 'react'
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

class ApplicationView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        console.log(this.props.app);
        return <div>
            {this.props.app.name}
            <div>Edit Button</div>
            <sl>
                <li>Image------------------------------------------</li>
                <li>App Name</li>
                <li>Description</li>
                <li>Version</li>
            </sl>
        </div>

    }

}

export default ApplicationView;