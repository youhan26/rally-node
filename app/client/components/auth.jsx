/**
 * Created by YouHan on 2016/11/21.
 */


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
}
