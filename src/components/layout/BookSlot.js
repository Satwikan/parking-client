import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BACK_URL } from "../../proxy";
import axios from "axios";

class BookSlot extends Component {
  constructor() {
    super();
    this.state = {
      vName: "",
      VNumber: "",
      vacancy: "",
      response: "",
      errors: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  componentDidMount() {
    axios
      .get(BACK_URL + "api/account/vacancy")
      .then((res) => {
        this.setState({ vacancy: res.data.message });
      })
      .catch((err) => {
        console.log("Error from vacancy userActions.js:", err);
      });
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: this.props.auth.user.id,
      vName: this.state.vName,
      vNumber: this.state.vNumber,
    };
    axios
      .post(BACK_URL + "api/account/book", userData)
      .then((res) => {
        if (res.data.error) {
          this.setState({ errors: res.data.error });
        } else if (res.data.History) {
          this.setState({
            response: res.data.History,
          });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log("Error from Book userActions.js:", err);
      });
  };
  getResponse() {
    if (this.state.response) {
      return (
        <h5>
          Slot booked!, Ticket no:
          {this.state.response[this.state.response.length - 1].slotNumber}
          <br />
          For more info go to <a href="/history">history</a>
        </h5>
      );
    }
  }
  render() {
    return (
      <>
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
              <a href="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back
                to home
              </a>
              <br />
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  Book your <b>Slot</b> here
                </h4>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h6>{this.state.vacancy}</h6>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.vName}
                    id="vName"
                    type="text"
                  />
                  <label htmlFor="vName">Vehicle Name</label>
                  <span className="red-text">{this.state.errors}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.vNumber}
                    id="vNumber"
                    type="text"
                  />
                  <label htmlFor="vNumber">Vehicle Number</label>
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
                    Book a Slot
                  </button>
                </div>
                <br />
                <br />
                <br />
                <div>{this.getResponse()}</div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

BookSlot.propTypes = {
  vacancyCheckApi: PropTypes.func.isRequired,
  bookSlotApi: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(BookSlot);
