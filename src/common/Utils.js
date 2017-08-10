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

import axios from 'axios';

'use strict';

/**
 * This class contains the following component related to app publisher.
 *
 * axios client : Basic prototype promis for calling apis in other modules.
 * */

export default class Utils {



    promisGet = function(url, data) {

    };

    promisPost = function (url, data, headers) {
        return axios.post(url, data, headers);
    }

}