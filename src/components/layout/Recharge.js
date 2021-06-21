import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BACK_URL } from "../../proxy";
import axios from "axios";

class Recharge extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      errors: "",
      Balance: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: this.props.auth.user.id,
      amount: this.state.amount,
    };
    // Recharge request
    axios
      .post(BACK_URL + "api/account/recharge", userData)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log("Error from Recharge userActions.js:", err);
      });
  };
  componentDidMount(user) {
    const userData = {
      id: user.id,
    };
    axios
      .get(BACK_URL + "api/account/balance", userData)
      .then((res) => {
        if (res.error) {
          this.setState({ errors: res.error });
        } else this.setState({ Balance: res.Balance });
      })
      .catch((err) => {
        console.log("Error from vacancy userActions.js:", err);
        return { balance: "can't connect to server" };
      });
  }
  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h6>Current account balance:{this.state.balance}</h6>
            </div>
            <br />
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>Add Amount Here</h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.amount}
                  id="amount"
                  type="number"
                />
                <label htmlFor="Amount">Amount</label>
                <span className="red-text">{this.state.errors}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  ADD Amount
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Recharge.propTypes = {
  rechargeApi: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, {})(Recharge);
