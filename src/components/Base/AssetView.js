import React, {Component} from 'react'
import ApplicationList from "../Application/ApplicationList";

class AssetView extends Component {

    render() {
        return <div>
            <a href={"/publisher/assets/apps/create"}>+</a>
            <form>
                <input type="Text" value="Search"/>
                <button type="submit" value="Search">Search</button>
            </form>
            <ApplicationList/>
        </div>
    }

}

export default AssetView;