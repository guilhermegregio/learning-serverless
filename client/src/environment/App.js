import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import styled from 'styled-components'
import Routes from "../organisms/Routes";
import RouteNavItem from "../molecules/RouteNavItem";
import { authUser, signOutUser } from "../libs/awsLib";

const AppContainer = styled.div`
  margin-top: 15px;
`

const NavBrandStyled = styled(Navbar.Brand)`
  font-weight: bold;
`

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch (e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <AppContainer className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <NavBrandStyled>
              <Link to="/">Scratch</Link>
            </NavBrandStyled>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : [
                  <RouteNavItem key={1} href="/signup">
                    Signup
                  </RouteNavItem>,
                  <RouteNavItem key={2} href="/login">
                    Login
                  </RouteNavItem>
                ]}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </AppContainer>
    );
  }
}

export default withRouter(App);