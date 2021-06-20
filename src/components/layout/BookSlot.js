import React, { Component } from "react";

class BookSlot extends Component {
  constructor() {
    super();
    this.state = {
      vName: "",
      VNumber: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
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
                    value={this.state.email}
                    id="vName"
                    type="text"
                  />
                  <label htmlFor="vName">Vehicle Name</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
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

export default BookSlot;
