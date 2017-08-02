import React, {Component} from 'react'
import ApplicationList from "../Application/ApplicationList";
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import CreateAppModal from "../Application/Create/CreateAppModal";

class AssetView extends Component {

    constructor() {
        super();
        this.state={
            showPopup:false
        }
    }

    handleClick() {
        this.setState({showPopup:true});
    }

    render() {
        return <div>
            <div>
            <Button fab color="primary">
                <AddIcon />
            </Button>
            </div>
            <form>
                <input type="Text" value="Search"/>
                <button type="submit" value="Search">Search</button>
            </form>
            <ApplicationList/>
        </div>
    }

}

export default AssetView;