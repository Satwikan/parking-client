import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class VerifiedUser extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h3>
              Hey there, {user.name.split(" ")[0]}
              <p
                className="flow-text grey-text text-darken-1"
                style={{ marginTop: "5px" }}
              >
                You are now logged to ParkX{" "}
                <span style={{ fontFamily: "monospace" }}></span> app 👏
              </p>
            </h3>
            <h6>(Toggle Left Menu to get Started)</h6>
            <h6>
              Not {user.name.split(" ")[0]} ?
              <button
                style={{
                  "background-color": "transparent",
                  border: "0",
                  letterSpacing: "1.5px",
                  color: "blue",
                  marginTop: "5px",
                }}
                onClick={this.onLogoutClick}
              >
                Logout
              </button>
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
VerifiedUser.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(VerifiedUser);
