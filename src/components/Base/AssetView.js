import React, {Component} from 'react'
import ApplicationList from "../Application/ApplicationList";
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

class AssetView extends Component {

    render() {
        return <div>
            <Button fab color="primary">
                <AddIcon />
            </Button>
            <form>
                <input type="Text" value="Search"/>
                <button type="submit" value="Search">Search</button>
            </form>
            <ApplicationList/>
        </div>
    }

}

export default AssetView;