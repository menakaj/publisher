import React, {Component} from 'react'

class CreateAppModal extends Component {

    constructor() {
        super();
        this.state = {
            showDialog:false,
            showMenu: false
        }
    }

    handleOnSubmit() {

    }

    render() {
        return (<form onSubmit={this.handleOnSubmit}>

        </form>)
    }

}

export default CreateAppModal;