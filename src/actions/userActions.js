import axios from "axios";
import { BACK_URL } from "../proxy";

export const rechargeApi = (userData) => {
  axios
    .post(BACK_URL + "api/account/recharge", userData)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log("Error from Recharge userActions.js:", err);
    });
};

export const bookSlotApi = (userData) => {
  axios
    .post(BACK_URL + "api/account/book", userData)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log("Error from Book userActions.js:", err);
    });
};

export const historyApi = (userData) => {
  axios
    .post(BACK_URL + "api/account/history", userData)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log("Error from Book userActions.js:", err);
    });
};

export const vacancyCheckApi = () => {
  axios
    .get(BACK_URL + "api/account/vacancy")
    .then((res) => res)
    .catch((err) => {
      console.log("Error from vacancy userActions.js:", err);
      return { vacancy: "can't connect to server" };
    });
};

export const balanceCheckApi = (userData) => {
  axios
    .get(BACK_URL + "api/account/balance", userData)
    .then((res) => res)
    .catch((err) => {
      console.log("Error from vacancy userActions.js:", err);
      return { balance: "can't connect to server" };
    });
};
