import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';

class CreateAppModal extends Component {

    constructor() {
        super();
        this.state = {
            showDialog:false,
            anchorEl:undefined,
            showMenu: false,
            selectedIndex: 1,

        }
    }

    platforms = ["iOS", "Android", "Web Clip"]
    button = undefined;

    handleOnSubmit() {

    }

    handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, open: false });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };


    handleClickListItem = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };


    render() {
        return (<div>
            <form onSubmit={this.handleOnSubmit}>
            <label>Platform: </label>
            <List>
                <ListItem
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    onClick={this.handleClickListItem}>
                    <ListItemText
                        primary={this.platforms[this.state.selectedIndex]}/>
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={this.handleRequestClose}>
                {this.platforms.map((option, index) =>
                    <MenuItem
                        key={option}
                        selected={index === this.state.selectedIndex}
                        onClick={event => this.handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>,
                )}
            </Menu>

            <TextField
                required
                id="storeType"
                label="Store Type"
                defaultValue=" "
                margin="normal"/>
            <br/>
            <TextField
                required
                id="title"
                label="Title"
                defaultValue=" "
                margin="normal"/>
                <br/>
                <input accept="jpg,jpeg,JPG,JPEG"  id="file" hidden type="file" />
                <label htmlFor="file">
                    <Button raised component="span" >
                        Upload
                    </Button>
                </label>

                <button type="submit" value="Next" id="next" hidden onClick={this.handleOnSubmit()}/>
                <label htmlFor="next">
                    <Button raised component="submit">
                        Next >
                    </Button>
                </label>
        </form>
        </div>)
    }

}

export default CreateAppModal;