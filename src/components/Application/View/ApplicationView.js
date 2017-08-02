import React, {Component} from 'react'

class ApplicationView extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div>
            <div>Edit Button</div>
            <sl>
                <li>Image</li>
                <li>App Name</li>
                <li>Description</li>
                <li>Version</li>
            </sl>
        </div>

    }

}

export default ApplicationView;