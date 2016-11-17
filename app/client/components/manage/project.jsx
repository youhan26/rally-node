 
import React, {Component, PropTypes} from "react";
import moment from "moment";
import {Form, Input, Button, Card, Col, Row, message, Modal, DatePicker} from "antd";
import Api from "../api";
import {ProjectStatus} from "./../common/constSelect";
import CommonSelect from "./../common/commonSelect";


const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;


class Item extends Component {
  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this);
    this.teamChange = this.teamChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.clickRelease = this.clickRelease.bind(this);
    this.save = this.save.bind(this);
  }

  nameChange(e) {
    this.props.change(e, 'name', this.props.index);
  }

  statusChange(e) {
    this.props.change(e, 'status', this.props.index);
  }

  teamChange(e) {
    this.props.change(e, 'teamId', this.props.index);
  }

  clickRelease() {
    this.props.clickRelease(this.props.index);
  }

  save() {
    this.props.save(this.props.index);
  }

  render() {
    return (
      <Card
        bordered={false}
        style={{ marginBottom: '15px' }}
      >
        <Form horizontal={true}>
          <Row gutter={16}>
            <Col span={8}>
              <FormItem
                label="Project name"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Input value={this.props.name} onChange={this.nameChange} />
              </FormItem>
              {this.props.id ? <FormItem
                label="Current Release"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                { this.props.release ? `Release ${this.props.release.number}` : '无'}
              </FormItem> : null}
            </Col>
            <Col span={8}>
              <FormItem
                label="Project Status"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <ProjectStatus value={this.props.status} onChange={this.statusChange} />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="Owner Team"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <CommonSelect url="/team/all" onChange={this.teamChange} value={this.props.teamId} />
              </FormItem>
              <FormItem>
                {this.props.id ?
                  <Button
                    type="primary"
                    onClick={this.clickRelease}
                    style={{marginRight: '12px'}}
                  >
                    {'Update Release'}
                  </Button>
                  : null}
                <Button type="primary" onClick={this.save}>
                  {this.props.id ? 'Update' : 'Add'}
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({}),
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  index: PropTypes.number,
  teamId: PropTypes.string,
  currentReleaseId: PropTypes.string,
  release: PropTypes.shape({
    number: PropTypes.number
  }),
  clickRelease: PropTypes.func,
  change: PropTypes.func,
  save: PropTypes.func
};
Item.defaultProps = {
  name: '',
  status: '1',
  teamId: null
};

class ReleaseModal extends Component {
  constructor(props) {
    super(props);

    const dates = [];
    if (this.props.release) {
      dates.push(moment(this.props.release.startDate).add(1, 'day'));
    }
    this.state = {
      da: dates
    };
  
    this.modalCancel = this.modalCancel.bind(this);
    this.modalOk = this.modalOk.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  modalCancel() {
    this.cleanModal();
    this.setState(this.state);
    this.props.closeModal();
  }

  modalOk() {
    const me = this;
    Api.Release.save({
      startDate: this.state.da[0].toDate(),
      endDate: this.state.da[1].toDate(),
      projectId: this.props.project.id,
      currentReleaseId: this.props.project.currentReleaseId
    }).then((res) => {
      if (res && res.success) {
        this.props.closeModal();
        me.cleanModal();
        me.setState(me.state);
        me.props.refresh();
        message.success('Save Successfully');
      } else {
        message.error(res.reason);
      }
    });
  }

  cleanModal() {
    this.state.da = [];
  }

  onChange(dates) {
    this.state.da = dates;
    this.setState(this.state);
  }

  render() {
    const format = "YYYY-MM-DD";
    return (
      <Modal
        title={`Project : ${this.props.project.name}`}
        visible={this.props.visible}
        onOk={this.modalOk}
        maskClosable={false}
        onCancel={this.modalCancel}
      >
        {this.props.release ?
          <Row>
            <Col span="12">
              <FormItem
                label="Current Start Date"
                labelCol={{span: '10'}}
                wrapperCol={{span: '14'}}
              >
                <DatePicker value={moment(this.props.release.startDate, format)} disabled={true} />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem
                label="End Date"
                labelCol={{span: '10'}}
                wrapperCol={{span: '14'}}
              >
                <DatePicker value={moment(this.props.release.endDate, format)} disabled={true} />
              </FormItem>
            </Col>
          </Row> : null}
        <Row>
          <Col span="24">
            <FormItem
              label="Next Release Date"
              labelCol={{span: '5'}}
              wrapperCol={{span: '14'}}
            >
              <RangePicker onChange={this.onChange} value={this.state.da} />
            </FormItem>
          </Col>
        </Row>
      </Modal>
    );
  }
}

ReleaseModal.propTypes = {
  release: PropTypes.shape({
    startDate: PropTypes.shape({}),
    endDate: PropTypes.shape({})
  }),
  closeModal: PropTypes.func,
  cleanModal: PropTypes.func,
  refresh: PropTypes.func,
  project: PropTypes.number,
  visible: PropTypes.bool
};

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [{
        name: '',
        status: '1',
        teamId: undefined
      }],
      project: null,
      release: null,
      visible: false
    };
  
    this.clickRelease = this.clickRelease.bind(this);
    this.change = this.change.bind(this);
    this.save = this.save.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    Api.Project.get().then((res) => {
      if (res && res.success) {
        res.data.forEach((item) => {
          item.status = `${item.status}`;
        });
        this.setState({
          list: [{
            name: '',
            status: '1',
            teamId: null
          }].concat(res.data)
        });
      } else {
        message.error(res.reason);
      }
    });
  }

  save(key) {
    const me = this;
    Api.Project.save(this.state.list[key]).then((res) => {
      if (res && res.success) {
        message.success('Save Success!');
        me.loadData();
      } else {
        message.error(res.reason);
      }
    });
  }

  change(e, field, key) {
    this.state.list[key][field] = (e && e.target ? e.target.value : e);
    this.setState(this.state);
  }

  clickRelease(item) {
    this.state.project = item;
    this.state.release = item.release;
    this.state.visible = true;
    this.setState(this.state);
  }

  closeModal() {
    this.state.visible = false;
    this.setState(this.state);
  }

  render() {
    return (
      <div className="project-manage">
        {this.state.list.map((item, key) => {
          return (
            <Item
              key={key}
              index={key}
              id={item.id || null}
              name={item.name}
              status={item.status}
              teamId={item.teamId}
              release={item.release}
              item={item}
              change={this.change}
              clickRelease={this.clickRelease}
              save={this.save}
            />
          );
        })}
        {this.state.project ? <ReleaseModal
          project={this.state.project}
          release={this.state.release}
          refresh={this.loadData}
          closeModal={this.closeModal}
          visible={this.state.visible}
        />
          : null}
      </div>
    );
  }
}
