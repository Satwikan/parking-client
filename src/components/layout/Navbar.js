import "./Navbar.css";
import "antd/dist/antd.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Register from "../auth/Register";
import Login from "../auth/Login";
import Welcome from "../auth/Welcome";
import BookSlot from "./BookSlot";
import History from "./History";
import Landing from "./Landing";
import Recharge from "./Recharge";
import VerifiedUser from "./VerifiedUser";

// Routes that need auth
import PrivateRoute from "../private-route/PrivateRoute";

import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  TrademarkCircleFilled,
  MoneyCollectOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class Navbar extends Component {
  state = {
    collapsed: false,
  };

  onLogoutClick = (e) => {
    this.props.logoutUser();
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  authShow(user) {
    if (Object.keys(user).length === 0)
      return (
        <>
          <Menu.Item key="3" icon={<LoginOutlined />}>
            <span>Login</span>
            <a href="/login" />
          </Menu.Item>

          <Menu.Item key="4" icon={<TrademarkCircleFilled />}>
            <span>Register</span>
            <a href="/register" />
          </Menu.Item>
        </>
      );
    else
      return (
        <>
          <Menu.Item
            key="3"
            onClick={this.onLogoutClick}
            icon={<LogoutOutlined />}
          >
            <span>Logout</span>
          </Menu.Item>
        </>
      );
  }
  userName = (user) => {
    if (Object.keys(user).length === 0) return "User";
    return user.name.split(" ")[0];
  };
  render() {
    const { collapsed } = this.state;
    const { user } = this.props.auth;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo"></div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              <span>Home</span>
              <a href="/" />
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title={this.userName(user)}
            >
              {this.authShow(user)}
            </SubMenu>
            <Menu.Item key="2" icon={<PieChartOutlined />}>
              <span>Book Your Slot</span>
              <a href="/book" alt="book slot" />
            </Menu.Item>
            <Menu.Item key="5" icon={<FileOutlined />}>
              <span>History</span>
              <a href="/history" alt="history" />
            </Menu.Item>
            <Menu.Item key="6" icon={<MoneyCollectOutlined />}>
              <span>Recharge</span>
              <a href="/recharge" alt="recharge" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Router>
                <Route exact path="/" component={Landing} />

                <Route exact path="/register" component={Register} />
                <Route path="/confirm/:confirmationCode" component={Welcome} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/book" component={BookSlot} />
                <PrivateRoute exact path="/history" component={History} />
                <PrivateRoute exact path="/recharge" component={Recharge} />
                <Switch>
                  <PrivateRoute
                    exact
                    path="/dashboard"
                    component={VerifiedUser}
                  />
                </Switch>
              </Router>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
