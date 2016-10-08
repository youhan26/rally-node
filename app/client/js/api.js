/**
 * Created by YouHan on 2016/9/25.
 */
import {api} from "mimikiyru-utils";

var Api = {
    Project: {
        add: (data) => {
            return api.post({
                url: '/project',
                data: data
            });
        },
        get: (id) => {
            return api.get({
                url: '/project',
                params: {
                    id: id
                }
            });
        }
    }
};


export default Api;
