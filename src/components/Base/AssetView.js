import React, {Component} from 'react'
import {Button, Input, Modal} from 'antd'
import WrappedAppCreateStep1 from "../Application/Create/CreateAppModal";
import ApplicationList from "../Application/ApplicationList";
import AppCreateStep2 from "../Application/Create/CreateApp";

class AssetView extends Component {

    constructor() {
        super();
        this.state={
            showPopup:false,
            createAppStep: 1,
            appData: {}
        }
    }

    setVisibility(state) {
        this.setState({showPopup:state});
    }

    handleCancel() {
        this.setVisibility(false);
    }

    handleClick() {
        this.setVisibility(true);
    }

    changeState(app) {
        console.log("Step 2");
        this.setState({createAppStep:2, showPopup: false, appData:app}, console.log(app))
    }

    setApp(app) {
        console.log("App data" + app);
        this.setState({appData:app})
    }

    render() {
        let renderHeader =
            (this.state.createAppStep === 1)?(<div>
                <Button type="primary" shape="circle" icon="plus" size="large" onClick={this.handleClick.bind(this)}/>
                <div>
                    <Input.Search placeholder="input search text"
                                  style={{ width: 200 }}
                                  onSearch={value => console.log(value)}/>
                </div>
                <ApplicationList/>
            </div>):<div className="form-step2"><AppCreateStep2 app={this.state.appData}/></div>;

        return <div>
            {renderHeader}
            <Modal
                title="Create Application"
                style={{ top: 20 }}
                visible={this.state.showPopup}
                onCancel={this.handleCancel.bind(this)}
                footer={[]}>
                <WrappedAppCreateStep1 stepUp={this.changeState.bind(this)}/>
            </Modal>
        </div>
    }

}

export default AssetView;