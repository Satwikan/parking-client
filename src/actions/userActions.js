import axios from "axios";
import { GET_ERRORS } from "./types";
import { BACK_URL } from "../proxy";

export const rechargeApi = (userData) => (dispatch) => {
  axios
    .post(BACK_URL + "api/account/recharge", userData)
    .then((res) => console.log(res)) 
    .catch((err) => {
      console.log("Error from Recharge userActions.js:", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const bookSlotApi = (userData) => {
  axios
    .post(BACK_URL + "api/account/book", userData)
    .then((res) => console.log(res)) 
    .catch((err) => {
      console.log("Error from Book userActions.js:", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const historyApi = (userData) => {
  axios
    .post(BACK_URL + "api/account/history", userData)
    .then((res) => console.log(res)) 
    .catch((err) => {
      console.log("Error from Book userActions.js:", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const vacancyApi = () => {
  axios
    .get(BACK_URL + "api/account/vacancy")
    .then((res) => res) 
    .catch((err) => {
      console.log("Error from vacancy userActions.js:", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
