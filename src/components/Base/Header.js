import React, {Component} from 'react'

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
                <ul>
                    <li>Notofications</li>
                    <li>User</li>
                </ul>
            </nav>
        </div>;
    }

}

export default Header;