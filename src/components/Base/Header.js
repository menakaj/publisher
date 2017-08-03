import React, {Component} from 'react'
import {Avatar, Badge} from 'antd'

const styles = {
    title: {
        textAlign: 'center'
    },
    header: {
        background: '#fff000'
    },
    notify: {
        textDecorationColor: '#aaafff'
    }

};

class Header extends Component {

    constructor(){
        super();
    }

    render() {
        return <div style={styles.header}>
            <span style={styles.title}><h3>WSO2 IoT App Publisher</h3></span>
            <nav>
                <Badge count={1}><Avatar shape="circle" icon="notification" /></Badge>
                <Avatar size="large" icon="user" />
            </nav>
        </div>;
    }

}

export default Header;