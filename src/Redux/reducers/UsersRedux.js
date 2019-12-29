const types = {
  ADD_USER: 'ADD_USER',
  EDIT_USER: 'EDIT_USER',
  DELETE_USER: 'DELETE_USER',
};

export const actions = {
  add_user: (dispatch, users) => {
    var data = {
      users: users,
    };

    dispatch({
      type: types.ADD_USER,
      data: data
    });
  },
  edit_user: (dispatch, users) => {
    var data = {
      users: users,
    };

    dispatch({
      type: types.EDIT_USER,
      data: data
    });
  },
  delete_user: (dispatch, users) => {
    var data = {
      users: users,
    };

    dispatch({
      type: types.DELETE_USER,
      data: data
    });
  }
}

const initialState = {
  users: [],
}

export const reducer = (state = initialState, action) => {
  let {data, type} = action;
  switch(type) {
    case types.ADD_USER:
      data.users = (state.users).concat(data.users)
      return Object.assign({}, state,  data)
    case types.EDIT_USER:
      return Object.assign({}, state, {
        users: modify_user(state.users, data)
      });
    case types.DELETE_USER:
      return Object.assign({}, state, {
        users: state.users.filter(
          (User) => !compareUser(User, data)
        )
      });
    default:
      return state;
  }
}

const modify_user = (users, data) => {
  return users.map(User => {
    if(compareUser(User, data)) {
      return data.users
    }
    return User
  })
}

const compareUser = (user, data) => {
  return user.key === data.users.key;
};