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
  GET_PRIORITIES,
  ADD_CUSTOMER,
  UPDATE_CUSTOMER,
  UPDATE_SECTOR,
  UPDATE_OCCUPATION,
  GET_USER,
  GET_WEIGHTS,
  UPDATE_WEIGHT,
} from "./actions";

const initialState = {
  user: getUserFromLs(),
  users: [],
  sectors: [],
  occupations: [],
  customers: [],
  priorities: [],
  weights: [],
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
    case GET_USER:
      return {
        ...state,
        user: state.user,
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
    case GET_PRIORITIES:
      return {
        ...state,
        priorities: [...action.payload],
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [...(state.customers || []), action.payload],
      };
    case UPDATE_PRIORITIZATION:
      const copyPriorities = [...(state.priorities || [])];
      const oldPriority = copyPriorities.filter(
        (p) => p.priority_id === action.payload.priority_id
      )[0];
      const index = copyPriorities.indexOf(oldPriority);
      copyPriorities.splice(index, 1, action.payload);
      return {
        ...state,
        priorities: [...copyPriorities],
      };
    case UPDATE_CUSTOMER:
      const copyCustomers = [...(state.customers || [])];
      const oldCustomer = copyCustomers.filter(
        (c) => c.customer_id === action.payload.customer_id
      )[0];
      const indexCustomer = copyCustomers.indexOf(oldCustomer);
      copyCustomers.splice(indexCustomer, 1, action.payload);
      return {
        ...state,
        customers: [...copyCustomers],
      };
    case UPDATE_SECTOR:
      const copySectors2 = [...(state.sectors || [])];
      const oldSector = copySectors2.filter(
        (s) => s.sector_id === action.payload.sector_id
      )[0];
      const indexSector = copySectors2.indexOf(oldSector);
      copySectors2.splice(indexSector, 1, action.payload);
      return {
        ...state,
        sectors: [...copySectors2],
      };
    case UPDATE_OCCUPATION:
      const copyOccupations2 = [...(state.occupations || [])];
      const oldOccupation = copyOccupations2.filter(
        (o) => o.occupation_id === action.payload.occupation_id
      )[0];
      const indexOccupation = copyOccupations2.indexOf(oldOccupation);
      copyOccupations2.splice(indexOccupation, 1, action.payload);
      return {
        ...state,
        occupations: [...copyOccupations2],
      };
    case GET_WEIGHTS:
      return {
        ...state,
        weights: [...action.payload],
      };
    case UPDATE_WEIGHT:
      const copyWeights = [...state.weights];
      const oldWeight = copyWeights.filter(
        (w) => w.weight_id === action.payload.weight_id
      )[0];
      const indexWeight = copyWeights.indexOf(oldWeight);
      copyWeights.splice(indexWeight, 1, action.payload);
      return {
        ...state,
        weights: [...copyWeights],
      };
    default:
      return state;
  }
}
