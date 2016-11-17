/**
 * Created by YouHan on 2016/11/1.
 */
import {Component} from "react";
import {api} from "mimikiyru-utils";

const prefix = '/';
const ALL = 'all';


/**
 * require:
 * split single table request to one component
 */
export default class Api extends Component {
  apiregistry(url2) {
    this.mixinsData = {
      url: url2
    };
  }
  
  apigetById(id) {
    const me = this;
    return api.get({
      url: prefix + me.mixinsData.url + prefix + id
    });
  }
  
  apigetByParams(params2) {
    const me = this;
    return api.get({
      url: prefix + me.mixinsData.url,
      params: params2
    });
  }
  
  apigetList(params2) {
    const me = this;
    return api.get({
      url: prefix + me.mixinsData.url + prefix + ALL,
      params: params2
    });
  }
  
  apisave(data2, id) {
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
  }
  
  apiremoveById(id) {
    const me = this;
    return api.del({
      url: prefix + me.mixinsData.url + prefix + id
    });
  }
};
