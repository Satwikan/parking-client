import React, { Component } from "react";
import { LinkedinFilled } from "@ant-design/icons";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h3>
              Welcome to Parking management <b>Web App</b>{" "}
            </h3>
            <h5>Toggle Left Menu to get Started</h5>
            <p className="flow-text grey-text text-darken-1">
              Build by{" "}
              <a href="https://www.linkedin.com/in/satwik-anmol-1487a3191/">
                @Satwikan
              </a>
              <span>
                <LinkedinFilled />
              </span>
            </p>
            <br />
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
