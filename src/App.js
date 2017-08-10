/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from "./components/Base/Header";
import Login from "./components/User/Login";
import AssetView from "./components/Base/AssetView";
import NotFound from "./components/Error/NotFound";
import 'antd/dist/antd.css'
import CreateApp from "./components/Application/Create/CreateApp"

// let conf = require('Config');

class BaseRenderer extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    getCookie(cname) {
        let name = cname + "=";
        let cookie = decodeURIComponent(document.cookie);
        let ca = cookie.split(';');
        console.log(cookie);
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        console.log(cookie);
        return null;
    }

    componentWillMount() {
        this.setState({user: this.getCookie("wso2_user")});

    }


    render() {
        if (this.state.user) {
            return (
                <div className="container">
                            <Header/>
                            <Switch>
                                <Redirect exact from="/" to="/assets/apps"/>
                                <Route exact path="/assets/apps" component={AssetView}/>
                                <Route component={NotFound}/>
                            </Switch>

                </div>
            );
        }
        return (<div>
            <Redirect to={"/login"}/>
        </div>);
    }
}

class Publisher extends Component {
    render() {
        return (
            <div>
                <Router basename="/publisher">
                        <Switch>
                            <Route path={"/login"} component={Login}/>
                            <Route path={"/logout"} component={Login}/>
                            <Route component={BaseRenderer}/>
                        </Switch>
                </Router>
            </div>
        );
    }
}

export default Publisher;
