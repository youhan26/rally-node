/**
 * Created by YouHan on 2016/11/21.
 */
import {api} from "mimikiyru-utils";

export default class Auth {
  static isLogin() {
    return localStorage.user;
  }
  
  static logout() {
    delete localStorage.user;
  }
  
  static updateUser(data) {
    localStorage.user = JSON.stringify(data);
    location.href = '/index#/dashboard';
  }
  
  static  getUser() {
    return JSON.parse(localStorage.user || '{}');
  }
  
  static getUserById(id) {
    console.log(this);
    return api.get({
      url: `/member/${id}`
    }).then((res) => {
      if (res && res.success) {
        return res.data;
      }
    });
  }
};
