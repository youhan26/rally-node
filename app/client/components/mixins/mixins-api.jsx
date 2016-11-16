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
  _registry(url2){
    this.mixinsData = {
      url: url2
    };
  },
  _getById(id){
    const me = this;
    return api.get({
      url: prefix + me.mixinsData.url + prefix + id
    });
  },
  _getByParams(params2){
    const me = this;
    return api.get({
      url: prefix + me.mixinsData.url,
      params: params2
    });
  },
  _getList(params2){
    const me = this;
    return api.get({
      url: prefix + me.mixinsData.url + prefix + ALL,
      params: params2
    });
  },
  _save(data2, id){
    const me = this;
    if (id) {
      return api.patch({
        url: prefix + me.mixinsData.url + prefix + id,
        data: data2
      });
    }
    return api.post({
      url: prefix + me.mixinsData.url,
      data: data2
    });
  },
  _removeById(id){
    const me = this;
    return api.del({
      url: prefix + me.mixinsData.url + prefix + id
    });
  }
};
