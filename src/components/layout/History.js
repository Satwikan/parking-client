import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Card } from "antd";
import { BACK_URL } from "../../proxy";
import axios from "axios";
import { connect } from "react-redux";

class History extends Component {
  constructor() {
    super();
    this.state = {
      errors: "",
      History: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      id: this.props.auth.user.id,
    };
    console.log("here");
    axios
      .get(BACK_URL + "api/account/history", userData)
      .then((res) => {
        if (res.data.error) {
          this.setState({ errors: res.data.History });
        } else {
          console.log(res);
          this.setState({ History: res.data.History });
        }
      })
      .catch((err) => {
        console.log("Error from Recharge userActions.js:", err);
      });
  }
  render() {
    return (
      <>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button
              style={{
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
              onClick={this.onClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Get History
            </button>
          </div>
        </form>
        {this.state.History}
        <Card
          title="Default size card"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card
          size="small"
          title="Small size card"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <h4>{this.state.errors}</h4>
        </Card>
      </>
    );
  }
}
History.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(History);
