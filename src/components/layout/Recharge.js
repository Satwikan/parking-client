import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { rechargeApi,  } from "../../actions/userActions";

class Recharge extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      errors: {},
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
    rechargeApi(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  accountBalance = (user) => {
    if (user.hasOwnProperty("balance")) return "";
    return "Your Current Balance is:" + user.balance;
  };
  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>{this.accountBalance(user)}</h4>
            </div>
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
                  error={errors.amount}
                />
                <label htmlFor="Amount">Amount</label>
                <span className="red-text">{errors.amount}</span>
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
