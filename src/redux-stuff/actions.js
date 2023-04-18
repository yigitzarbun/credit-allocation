import axios from "axios";
import { toast } from "react-toastify";

export const key = "credit-allocation";
export function getUserFromLs() {
  let user = null;
  const userString = JSON.parse(localStorage.getItem(key));
  if (userString) {
    user = userString.user;
  }
  return user;
}

let developmentUrl = "http://localhost:9000/";
let productionUrl = "";
let url = developmentUrl;

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const ADD_SECTOR = "ADD_SECTOR";
export const REMOVE_SECTOR = "REMOVE_SECTOR";
export const ADD_OCCUPATION = "ADD_OCCUPATION";
export const REMOVE_OCCUPATION = "REMOVE_OCCUPATION";
export const UPDATE_PRIORITIZATION = "UPDATE_PRIORITIZATION";

const axiosWithAuth = () => {
  const tokenObj = JSON.parse(localStorage.getItem(key));
  const token = tokenObj.token;
  return axios.create({
    headers: {
      Authorization: token,
    },
  });
};

export const login = (formData) => (dispatch) => {
  axios
    .post(url + "api/users/login", formData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOGIN, payload: res.data });
        toast.success("Başarılı giriş");
      }
    })
    .catch((err) => {
      console.log("Login error: ", err);
      toast.error(err.response.data.message);
    });
};

export const addUser = (formData, navigate) => (dispatch) => {
  axios
    .post(url + "api/users/register", formData)
    .then((res) => {
      if (res.status == 201) {
        toast.success("Kullanıcı oluşturuldu");
        navigate("/employees");
      }
    })
    .catch((err) => {
      console.log("Add user error: ", err);
      toast.error(err.response.data.message);
    });
};

export const deleteUser = (user_id) => (dispatch) => {
  axios
    .delete(url + `api/users/${user_id}`)
    .then((res) => {
      if (res.status == 200) {
        dispatch({ type: DELETE_USER, payload: user_id });
      }
    })
    .catch((err) => {
      console.log("Delete user error: ", err);
      toast.error(err.response.data.message);
    });
};

export const getUsers = () => (dispatch) => {
  axios
    .get(url + "api/users")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_USERS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};
