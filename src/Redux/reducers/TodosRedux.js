const types = {
  ADD_TODO: 'ADD_TODO',
  EDIT_TODO: 'EDIT_TODO',
  DELETE_TODO: 'DELETE_TODO',
};

export const actions = {
  add_todo: (dispatch, todos) => {
    var data = {
      todos: todos,
    };

    dispatch({
      type: types.ADD_TODO,
      data: data
    });
  },
  edit_todo: (dispatch, todos) => {
    var data = {
      todos: todos,
    };

    dispatch({
      type: types.EDIT_TODO,
      data: data
    });
  },
  delete_todo: (dispatch, todos) => {
    var data = {
      todos: todos,
    };

    dispatch({
      type: types.DELETE_TODO,
      data: data
    });
  }
}

const initialState = {
  todos: [],
}

export const reducer = (state = initialState, action) => {
  let {data, type} = action;
  switch(type) {
    case types.ADD_TODO:
      data.todos = (state.todos).concat(data.todos)
      return Object.assign({}, state,  data)
    case types.EDIT_TODO:
      return Object.assign({}, state, {
        todos: modify_todo(state.todos, data)
      });
    case types.DELETE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.filter(
          (User) => !compareUser(User, data)
        )
      });
    default:
      return state;
  }
}

const modify_todo = (todos, data) => {
  return todos.map(User => {
    if(compareUser(User, data)) {
      return data.todos
    }
    return User
  })
}

const compareUser = (user, data) => {
  return user.key === data.todos.key;
};