import axios from "axios";
import { toast } from "react-toastify";

export const key = "credit-allocation";

export function getUserFromLs() {
  let user = null;
  const userString = JSON.parse(localStorage.getItem(key));
  if (userString) {
    user = userString;
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
export const GET_SECTORS = "GET_SECTORS";
export const ADD_SECTOR = "ADD_SECTOR";
export const DELETE_SECTOR = "DELETE_SECTOR";
export const GET_OCCUPATIONS = "GET_OCCUPATIONS";
export const ADD_OCCUPATION = "ADD_OCCUPATION";
export const REMOVE_OCCUPATION = "REMOVE_OCCUPATION";
export const ADD_PRIORITIZATION = "ADD_PRIORITIZATION";
export const UPDATE_PRIORITIZATION = "UPDATE_PRIORITIZATION";
export const GET_CUSTOMERS = "GET_CUSTOMERS";
export const GET_PRIORITIES = "GET_PRIORITIES";
export const GET_TYPEFORM_DATA = "GET_TYPEFORM_DATA";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const UPDATE_SECTOR = "UPDATE_SECTOR";
export const UPDATE_OCCUPATION = "UPDATE_OCCUPATION";
export const GET_USER = "GET_USER";

const axiosWithAuth = () => {
  const tokenObj = JSON.parse(localStorage.getItem(key));

  const token = tokenObj.token;
  return axios.create({
    headers: {
      Authorization: token,
    },
  });
};

export const login = (formData, navigate) => (dispatch) => {
  axios
    .post(url + "api/users/login", formData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOGIN, payload: res.data });
        toast.success("Başarılı giriş");
        navigate("/");
      }
    })
    .catch((err) => {
      console.log("Login error: ", err);
      toast.error(err.response.data.message);
    });
};

export const addUser = (formData, navigate) => (dispatch) => {
  axiosWithAuth()
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
  axiosWithAuth()
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
  axiosWithAuth()
    .get(url + "api/users")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_USERS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const getSectors = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/sector")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_SECTORS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const addSector = (formData, navigate) => (dispatch) => {
  axiosWithAuth()
    .post(url + "api/sector/addSector", formData)
    .then((res) => {
      if (res.status == 201) {
        dispatch({ type: ADD_SECTOR, payload: res.data });
        toast.success("Sektör eklendi");
        navigate("/sectors");
      }
    })
    .catch((err) => console.log(err));
};

export const deleteSector = (sector_id) => (dispatch) => {
  axiosWithAuth()
    .delete(url + `api/sector/${sector_id}`)
    .then((res) => {
      if (res.status == 200) {
        dispatch({ type: DELETE_SECTOR, payload: sector_id });
        toast.success("Sektör silindi");
      }
    })
    .catch((err) => {
      console.log("Delete sector error: ", err);
      toast.error(err.response.data.message);
    });
};

export const getOccupations = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/occ")
    .then((res) => {
      if (res.status == 200) {
        dispatch({ type: GET_OCCUPATIONS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const addOccupation = (formData, navigate) => (dispatch) => {
  axiosWithAuth()
    .post(url + "api/occ/addOcc", formData)
    .then((res) => {
      if (res.status == 201) {
        dispatch({ type: ADD_OCCUPATION, payload: res.data });
        toast.success("Meslek eklendi");
        navigate("/occupations");
      }
    })
    .catch((err) => console.log(err));
};

export const deleteOccupation = (occupation_id) => (dispatch) => {
  axiosWithAuth()
    .delete(url + `api/occ/${occupation_id}`)
    .then((res) => {
      if (res.status == 200) {
        dispatch({ type: REMOVE_OCCUPATION, payload: occupation_id });
        toast.success("Meslek silindi");
      }
    })
    .catch((err) => console.log(err));
};

export const getCustomers = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/customers")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_CUSTOMERS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const getPriorities = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/priorities")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_PRIORITIES, payload: res.data });
      }
    });
};

export const postTypeformDataToDb = (data) => (dispatch) => {
  axiosWithAuth()
    .post(url + "api/customers", data)
    .then((res) => {
      if (res.status === 201) {
        dispatch({ type: ADD_CUSTOMER, payload: res.data });
        toast.success("Müşteri eklendi");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};

export const updatePrioritization = (data, navigate) => (dispatch) => {
  axiosWithAuth()
    .put(url + `api/priorities/${data.priority_id}`, data)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: UPDATE_PRIORITIZATION, payload: res.data });
        navigate(-1);
        toast.success("Öncelik değiştirildi");
      }
    })
    .catch((err) => console.log(err));
};

export const addPrioritization = (formData, navigate) => (dispatch) => {
  axiosWithAuth()
    .post(url + "api/priorities", formData)
    .then((res) => {
      if (res.status == 201) {
        dispatch({ type: ADD_PRIORITIZATION, payload: res.data });
        toast.success("Önceliklendirme eklendi");
        navigate(-1);
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};

export const updateCustomer = (updates, navigate) => (dispatch) => {
  axiosWithAuth()
    .put(url + "api/customers/:customer_id", updates)
    .then((res) => {
      if (res.status === 201) {
        dispatch({ type: UPDATE_CUSTOMER, payload: res.data });
        toast.success("Müşteri bilgileri güncellendi");
        navigate(-1);
      }
    })
    .catch((err) => console.log(err));
};

export const updateSector = (updates, navigate) => (dispatch) => {
  axiosWithAuth()
    .put(url + "api/sector/:sector_id", updates)
    .then((res) => {
      if (res.status === 201) {
        dispatch({ type: UPDATE_SECTOR, payload: res.data });
        toast.success("Sektör güncellendi");
        navigate(-1);
      }
    })
    .catch((err) => console.log(err));
};

export const updateOccupation = (updates, navigate) => (dispatch) => {
  axiosWithAuth()
    .put(url + "api/occ/:occupation_id", updates)
    .then((res) => {
      if (res.status === 201) {
        dispatch({ type: UPDATE_OCCUPATION, payload: res.data });
        toast.success("Meslek güncellendi");
        navigate(-1);
      }
    })
    .catch((err) => console.log(err));
};
