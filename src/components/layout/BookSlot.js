import React, { Component } from "react";
import { bookSlotApi, vacancyCheckApi } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class BookSlot extends Component {
  constructor() {
    super();
    this.state = {
      vName: "",
      VNumber: "",
      vacancy: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  // TODO: check it
  componentDidMount() {
    vacancyCheckApi().then((res) => {
      this.state.vacancy = res.message;
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
    bookSlotApi(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
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
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  Book your <b>Slot</b> here
                </h4>
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
