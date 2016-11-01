/**
 * Created by YouHan on 2016/11/1.
 */
import {api} from "mimikiyru-utils";

const prefix = '/';
const ALL = 'all';


/**
 * require:
 * split single table request to one component
 */
export default {
    _registry(url){
        this._mixins = {
            url: url
        }
    },
    _getById(id){
        const me = this;
        return api.get({
            url: prefix + me._mixins.url + prefix + id
        });
    },
    _getByParams(params){
        const me = this;
        return api.get({
            url: prefix + me._mixins.url,
            params: params
        });
    },
    _getList(params){
        const me = this;
        return api.get({
            url: prefix + me._mixins.url + prefix + ALL,
            params: params
        });
    },
    _save(data, id){
        const me = this;
        if (id) {
            return api.patch({
                url: prefix + me._mixins.url + prefix + id,
                data: data
            })
        } else {
            return api.post({
                url: prefix + me._mixins.url,
                data: data
            });
        }
    },
    _removeById(id){
        const me = this;
        return api.del({
            url: prefix + me._mixins.url + prefix + id
        });
    }
}