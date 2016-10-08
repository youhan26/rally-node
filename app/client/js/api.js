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
            return api.get({
                url: '/project',
                params: {
                    id: id
                }
            ***REMOVED***
        }
    }
};


export default Api;
