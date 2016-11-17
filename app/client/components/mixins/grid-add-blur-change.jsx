/**
 * Created by YouHan on 2016/10/25.
 */
import {Component, PropTypes} from "react";
import {message, notification} from "antd";

export default class BlankRow extends Component {
  componentWillMount() {
    this.loadData();
  }
  
  getData() {
    return this.state ? this.state.data : (this.props ? this.props.data : []);
  }
  
  blur(index, field) {
    const data = this.getData();
    // if new value
    if (!data[index] || !data[index].id) {
      return;
    }
    // if data no change
    if (this.oriData[index][field] === data[index][field]) {
      return;
    }
    this.oriData[index][field] = data[index][field];
    this.save(data[index]);
  }
  
  change(index, field, e) {
    const data = this.getData();
    const newValue = (e && e.target ? e.target.value : e);
    if (data[index]) {
      const oldValue = data[index][field];
      if (oldValue !== newValue) {
        data[index][field] = newValue;
        this.setState(this.state);
      }
    }
  }
  
  click(index, record) {
    const data = this.getData();
    if (record.id) {
      this.remove(index);
    } else {
      this.save(data[index], true);
    }
  }
  
  save(data, needReload) {
    const me = this;
    notification.info({
      message: 'Saving',
      duration: 1,
    });
    me.api.save(data)
      .then((res) => {
        if (res.success) {
          notification.success({
            message: 'Saved Successfully',
            duration: 1,
          });
          if (needReload) {
            me.loadData();
          }
        } else {
          message.error('Error happen when save!');
        }
      });
  }
  
  remove(index) {
    const me = this;
    const data = this.getData();
    this.api.del(data[index].id).then((res) => {
      if (res && res.success) {
        notification.success({
          message: 'Remove Successfully',
          duration: 1,
        });
        me.loadData();
      }
    });
  }
  
  loadData() {
    if (this.selfLoad) {
      this.selfLoad();
      return;
    }
    const me = this;
    me.state.loading = true;
    me.setState(me.state);
    
    me.api.getList(me.storyId).then((result) => {
      const data = result.data;
      
      // update ori data for compare
      me.oriData = JSON.parse(JSON.stringify([me.getEmptyData()].concat(data)));
      
      if (data && data.length > 0) {
        data.forEach(me.changeData);
      }
      
      me.setState({
        data: [me.getEmptyData()].concat(data),
        loading: false
      });
    });
  }
}

BlankRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};