import {
  getUserFromLs,
  key,
  LOGIN,
  LOGOUT,
  ADD_USER,
  DELETE_USER,
  GET_USERS,
  ADD_SECTOR,
  REMOVE_SECTOR,
  ADD_OCCUPATION,
  REMOVE_OCCUPATION,
  UPDATE_PRIORITIZATION,
} from "./actions";

const initialState = {
  user: getUserFromLs(),
  users: [],
  sectors: [],
  occupations: [],
};
export function myReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem(key, JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem(key);
      return {
        ...state,
        user: null,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...action.payload, ...(state.users || [])],
      };
    case DELETE_USER:
      const copyUsers = [...state.users];
      const updatedUsersList = copyUsers.filter(
        (user) => user.user_id != action.payload
      );
      return {
        ...state,
        users: [...updatedUsersList],
      };
    case GET_USERS:
      return {
        ...state,
        users: [...action.payload],
      };
    default:
      return state;
  }
}
