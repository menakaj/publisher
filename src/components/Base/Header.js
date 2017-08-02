import React, {Component} from 'react'
import Notifications from 'material-ui-icons/Notifications'
import Avatar from 'material-ui/Avatar'
import PersonPinIcon from 'material-ui-icons/PersonPin';

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
                <Notifications/>
                <Avatar>
                    <PersonPinIcon />
                </Avatar>
            </nav>
        </div>;
    }

}

export default Header;