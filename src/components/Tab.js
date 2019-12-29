import React, { Component } from 'react'
import { Tabs, Button } from 'antd';
import { TableComponent, ModalComponent } from './index'
import {connect} from 'react-redux';
const { TabPane } = Tabs;
const uuidv1 = require('uuid/v1');

class TabComponent extends Component {
  constructor(props) {
    super(props)
    this.state={
      activeTab: '1',
      visible:false,
      resource: 'todo',
      mode: 'add',
      edit_data: null,
      users: props.users.users,
      todos: props.todos.todos
    }

    this.changeTab = this.changeTab.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.add_user = this.add_user.bind(this)
    this.add_todo = this.add_todo.bind(this)
    this.delete_user = this.delete_user.bind(this)
    this.delete_todo = this.delete_todo.bind(this)
    this.edit_modal = this.edit_modal.bind(this)
    this.edit_user = this.edit_user.bind(this)
    this.edit_todo = this.edit_todo.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps.users.users) != JSON.stringify(this.props.users.users) || JSON.stringify(prevProps.todos.todos) != JSON.stringify(this.props.todos.todos)) {
      this.setState({
        users: this.props.users.users,
        todos: this.props.todos.todos
      })
    }
  }

  changeTab = activeKey => {
    let resource = 'todo'
    if(activeKey == 2) {
      resource = 'user'
    }

    this.setState({
      activeTab: activeKey,
      resource
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      mode: 'add'
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  add_user(data) {
    this.handleCancel();
    data.key = uuidv1()
    this.props.add_user(data)
  }

  add_todo(data) {
    this.handleCancel();
    data.key = uuidv1()
    this.props.add_todo(data)
  }

  delete_user(data) {
    this.props.delete_user(data)
  }

  delete_todo(data) {
    this.props.delete_todo(data)
  }

  edit_modal(data) {
    this.setState({
      visible: true,
      mode: 'edit',
      edit_data: data
    });
  }

  edit_user(data) {
    this.handleCancel();
    this.props.edit_user(data)
  }

  edit_todo(data) {
    this.handleCancel();
    this.props.edit_todo(data)
  }

  render() {
    let { users, resource, todos, activeTab, visible, edit_data, mode } = this.state
    return(
      <div>
        <ModalComponent mode={mode} edit_user={this.edit_user} edit_todo={this.edit_todo} edit_data={edit_data} resource={resource} visible={visible} handleCancel={this.handleCancel} handleOk={this.handleOk} add_user={this.add_user} add_todo={this.add_todo} />
        <Tabs activeKey={activeTab} onChange={this.changeTab}>
          <TabPane tab="Todos" key="1">
            <Button type="primary" size='large' onClick={this.showModal}>
              Create Todo
            </Button>
            <TableComponent resource={resource} todos={todos} delete_todo={this.delete_todo} edit_modal={this.edit_modal}/>
          </TabPane>
          <TabPane tab="Users" key="2">
            <Button type="primary" size='large' onClick={this.showModal}>
              Create User
            </Button>
            <TableComponent resource={resource} users={users} delete_user={this.delete_user} edit_modal={this.edit_modal} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = ({ users, todos }) => {
  return { users, todos }
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('../Redux/reducers/UsersRedux');
  const todo_actions = require('../Redux/reducers/TodosRedux');
  return {
    add_user: (data) => {
      actions.add_user(dispatch, data);
    },
    delete_user: (data) => {
      actions.delete_user(dispatch, data);
    },
    edit_user: (data) => {
      actions.edit_user(dispatch, data);
    },
    add_todo: (data) => {
      todo_actions.actions.add_todo(dispatch, data);
    },
    delete_todo: (data) => {
      todo_actions.actions.delete_todo(dispatch, data);
    },
    edit_todo: (data) => {
      todo_actions.actions.edit_todo(dispatch, data);
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TabComponent);
