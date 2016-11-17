 
import React, {PropTypes, Component} from "react";
import {api} from "mimikiyru-utils";
import {Select} from "antd";

const Option = Select.Option;

export default class CommonSelect extends Component {
  constructor(props) {
    super(props);
    this.list = [];
  }
  
  componentWillMount() {
    if (this.props.url) {
      api.get({
        url: this.props.url
      }).then((resp) => {
        if (resp && resp.data) {
          this.setState({
            list: resp.data
          });
        }
      });
    }
    if (this.props.data && this.props.data.length > 0) {
      this.setState({
        list: this.props.data
      });
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.data && nextProps.data.length > 0) {
      this.setState({
        list: nextProps.data
      });
    }
  }
  
  render() {
    return (
      <Select {...this.props}>
        { this.state.list.map((item, key) => <Option value={item.id} key={key}>{item.name}</Option>) }
      </Select>
    );
  }
}

CommonSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  url: PropTypes.string
};

CommonSelect.defaultProps = {
  data: []
};
