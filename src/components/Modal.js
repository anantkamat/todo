import React, { Component } from 'react'
import { Modal, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;
const InputGroup = Input.Group;
const dateFormat = 'YYYY/MM/DD';


export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      resource: props.resource,
      mode: props.mode,
      edit_data: props.edit_data,
      title: 'Todo',
      email: '',
      name: '',
      action: '',
      date: '',
      loading: false
    };

    this.handleOk = this.handleOk.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.changeAction = this.changeAction.bind(this)
    this.dateChange = this.dateChange.bind(this)
  }

  componentDidMount() {
    let date = this.get_date()
    this.setState( {
      date
    })
  }

  get_date() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' +mm + '/' + dd;
    return today;
  }

  onChangeUsername(e) {
    this.setState({
      name: e.target.value
    })
  }

  changeAction(e) {
    this.setState({
      action: e.target.value
    })
  }

  dateChange(value, date) {
    this.setState({
      date: date
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.visible !== prevProps.visible) {
      let title = "Todo";
      if(this.props.resource == 'user') {
        title = "User"
      }
      let email = '';
      let name = '';
      let action = '';
      let date = this.get_date()
      if(this.props.mode == 'edit') {
        if(this.props.resource == 'user') {
          name = this.props.edit_data.name;
          email = this.props.edit_data.email;
        }
        else {
          action = this.props.edit_data.action;
          date = this.props.edit_data.date;
        }
      }
      this.setState({
        visible: this.props.visible,
        mode: this.props.mode,
        edit_data: this.props.edit_data,
        resource: this.props.resource,
        loading: false,
        title,
        email,
        name,
        action,
        date
      })
    }
  }

  async wait(duration = 1000) {
    await new Promise(resolve => setTimeout(resolve, duration));
  }


  handleOk() {
    this.setState({loading: true}, async function() {
      await this.wait(2000);
      if(this.state.mode == 'add') {
        if(this.state.resource == 'todo') {
          this.props.add_todo({date: this.state.date, action: this.state.action});
        }
        else {
          this.props.add_user({name: this.state.name, email:this.state.email});
        }
      }
      else {
        let data = Object.assign({}, this.state.edit_data);
        if(this.state.resource == 'todo') {
          data.action = this.state.action;
          data.date = this.state.date;
          this.props.edit_todo(data);
        }
        else {
          data.email = this.state.email;
          data.name = this.state.name;
          this.props.edit_user(data);
        }
      }
    })
  }

  render() {
    let {name, email, action, date, visible, title, mode, loading, resource } = this.state
    return (
      <div>
        <Modal
          title={mode == 'add' ? "Add "+ title : "Edit " + title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
        {
          resource == 'todo' ?
          <div>
            <DatePicker defaultValue={moment(date, dateFormat)} format={dateFormat} onChange={this.dateChange} />
            <br />
            <br />
            <TextArea rows={4} value={action} onChange={this.changeAction} />
          </div>
          :
          <InputGroup>
            <Input placeholder="Plese enter user name" value= {name} onChange={this.onChangeUsername} />
            <br/>
            <br />
            <Input placeholder="Plese enter email" value={email} onChange={this.onChangeEmail} />
          </InputGroup>
        }
        </Modal>
      </div>
    );
  }
}