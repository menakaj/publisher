import React, {Component} from 'react'

class Application extends Component {

    constructor() {
        super()
        this.handleOnClickRow.bind(this)
    }

    handleOnClickRow() {
        console.log(this.props.app.name);
        this.props.onClickHandler(this.props.app);

    }

    render() {
        return <tr onClick={this.handleOnClickRow.bind(this)}>
            <td>{this.props.app.name}</td>
            <td>{this.props.app.category}</td>
            <td>{this.props.app.version}</td>
            <td>{this.props.app.os}</td>
            <td>{this.props.app.state}</td>
        </tr>
    }
}

export default Application;