import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACK_URL } from "../../proxy";

const verifyUser = (code) => {
  return axios.get(BACK_URL + "api/users/confirm/" + code).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const Welcome = (props) => {
  if (props.match.path === "/confirm/:confirmationCode") {
    verifyUser(props.match.params.confirmationCode);

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Account confirmed!</strong>
          </h3>
        </header>
        <Link to={"/login"}>Please Login</Link>
      </div>
    );
  }
};

export default Welcome;
