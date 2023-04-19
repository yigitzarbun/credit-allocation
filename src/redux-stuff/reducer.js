import {
  getUserFromLs,
  key,
  LOGIN,
  LOGOUT,
  ADD_USER,
  DELETE_USER,
  GET_USERS,
  GET_SECTORS,
  ADD_SECTOR,
  DELETE_SECTOR,
  ADD_OCCUPATION,
  REMOVE_OCCUPATION,
  UPDATE_PRIORITIZATION,
  GET_OCCUPATIONS,
  GET_CUSTOMERS,
} from "./actions";

const initialState = {
  user: getUserFromLs(),
  users: [],
  sectors: [],
  occupations: [],
  customers: [],
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
        users: [action.payload, ...(state.users || [])],
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
    case ADD_SECTOR:
      return {
        ...state,
        sectors: [action.payload, ...(state.sectors || [])],
      };
    case GET_SECTORS:
      return {
        ...state,
        sectors: [...action.payload],
      };
    case DELETE_SECTOR:
      const copySectors = [...state.sectors];
      const updatedSectorsList = copySectors.filter(
        (sector) => sector.sector_id != action.payload
      );
      return {
        ...state,
        sectors: [...updatedSectorsList],
      };
    case GET_OCCUPATIONS:
      return {
        ...state,
        occupations: [...action.payload],
      };
    case ADD_OCCUPATION:
      return {
        ...state,
        occupations: [action.payload, ...(state.occupations || [])],
      };
    case REMOVE_OCCUPATION:
      const copyOccupations = [...state.occupations];
      const updatedOccupationsList = copyOccupations.filter(
        (occupation) => occupation.occupation_id != action.payload
      );
      return {
        ...state,
        occupations: updatedOccupationsList,
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: [...action.payload],
      };
    default:
      return state;
  }
}
