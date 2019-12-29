import React, { Component } from 'react'
import { Table, Divider, Tag, Icon, Button  } from 'antd';

export default class TableComponent extends Component {
  constructor(props) {
    super(props)
    this.state={
      activeTab: 1,
      users: props.users,
      todos: props.todos,
      resource: props.resource,
      data: []
    }

    this.user_columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '33%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '33%',
      },
      {
        title: 'Action',
        key: 'action',
        width: '33%',
        render: (text, record) => (
          <div>
          <Button type="primary" style={{ marginLeft: 0 }} onClick={() => this.props.delete_user(text)} shape="circle" icon="delete" />
          <Button type="primary" style={{ marginLeft: 10 }} onClick={() => this.props.edit_modal(text)} shape="circle" icon="edit" />
          </div>
        ),
      },
    ];

    this.todo_columns = [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '33%',
      },
      {
        title: 'Date Added',
        dataIndex: 'date',
        key: 'date',
        width: '33%',
      },
      {
        title: 'Action',
        key: 'actions',
        width: '33%',
        render: (text, record) => (
          <div>
          <Button type="primary" style={{ marginLeft: 0 }} onClick={() => this.props.delete_todo(text)} shape="circle" icon="delete" />
          <Button type="primary" style={{ marginLeft: 10 }} onClick={() => this.props.edit_modal(text)} shape="circle" icon="edit" />
          </div>
        ),
      },
    ];

    this.changeTab = this.changeTab.bind(this)
    this.setData = this.setData.bind(this)
  }

  componentDidMount() {
    this.setData(this.props.resource)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.resource !== prevProps.resource) {
      this.setData(this.props.resource);
    }

    if(JSON.stringify(prevProps.users) != JSON.stringify(this.props.users) || JSON.stringify(prevProps.todos) != JSON.stringify(this.props.todos)) {
      this.setState({
        users:this.props.users,
        todos:this.props.todos
      }, function() {
        this.setData(this.props.resource);
      })
    }
  }

  setData(resource) {
    let data = [];
    if(resource == 'user') {
      if(this.state.users != undefined) {
        this.state.users.map(user => {
          let user_data = {};
          user_data['key'] = user.key;
          user_data['name'] = user.name;
          user_data['email'] = user.email;
          data.push(user_data)
        });
        this.setState({
          data,
        })
      }
    }
    else {
      if(this.state.todos != undefined) {
        this.state.todos.map(todo => {
          let todo_data = {};
          todo_data['key'] = todo.key;
          todo_data['action'] = todo.action;
          todo_data['date'] = todo.date;
          data.push(todo_data)
        });
        this.setState({
          data,
        })
      }
    }
  }

  changeTab = activeKey => {
    this.setState({
      activeTab: activeKey
    });
  };

  render() {
    let { resource, data } = this.state
    let columns = this.user_columns;
    if(resource == 'todo') {
      columns = this.todo_columns;
    }
    return(
      <Table
        columns={columns}
        dataSource={data} />
    )
  }
}