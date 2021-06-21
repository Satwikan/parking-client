import React, { Component, useEffect } from "react";
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
  componentDidMount() {
    const userData = {
      id: this.props.auth.user.id,
    };
    console.log("here", )
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
        {this.state.History.map((item) => {})}
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
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(History);
