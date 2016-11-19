/**
 * Created by YouHan on 2016/10/25.
 */
import {Component} from "react";
import {notification} from "antd";


/**
 * must set this.data and this.oriData
 *
 * implement : {
 *    singleSave : function(singleLineData),
 *    singleRemove : function(singleLineData),
 *    updateChange : function(dataList)
 * }
 */

export default class BlankRow extends Component {
  
  static notice() {
    return {
      saving(){
        notification.info({
          message: `Saving`,
          duration: 1,
        });
      },
      succ(){
        notification.success({
          message: `Save Successfully`,
          duration: 1,
        });
      },
      fail(){
        notification.error({
          message: `Save failed`,
          duration: 1,
        });
      }
    };
  }
  
  rowBlur(field, index) {
    // if new value
    if (!this.data[index] || !this.data[index].id) {
      return;
    }
    // if data no change
    if (this.oriData[index][field] === this.data[index][field]) {
      return;
    }
    this.oriData[index][field] = this.data[index][field];
    this.singleSave(this.data[index]);
  }
  
  rowChange(field, index, e) {
    if (!e) {
      return;
    }
    const data = this.data;
    const newValue = (e.target ? e.target.value : e);
    if (data[index]) {
      const oldValue = data[index][field];
      if (oldValue !== newValue) {
        data[index][field] = newValue;
        this.updateChange(data);
      }
    }
  }
  
  rowClick(index, record) {
    const data = this.data;
    if (record.id) {
      this.singleRemove(data[index]);
    } else {
      this.singleSave(data[index]);
    }
  }
  
}
