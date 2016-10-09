***REMOVED***
 * Created by YouHan on 2016/9/25.
***REMOVED***
import {api} from "mimikiyru-utils";

var Api = {
    Project: {
        add: (data) => {
            return api.post({
                url: '/project',
                data: data
            ***REMOVED***
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/project',
                    params: {
                        id: id
                    }
                ***REMOVED***
            } else {
                return api.get({
                    url: '/project/all'
                ***REMOVED***
            }
        }
    },
    Team: {
        add: (data) => {
            return api.post({
                url: '/team',
                data: data
            })
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/team',
                    params: {
                        id: id
                    }
                ***REMOVED***
            } else {
                return api.get({
                    url: '/team/all'
                ***REMOVED***
            }
        }
    }
};


export default Api;
