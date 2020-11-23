import React from 'react';
import Dashboard from '../../containers/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import { Route} from 'react-router-dom';
import logo from '../../assets/images/Coinbase-logo.png'
import Settings from '../../containers/Settings/Settings';
import './Navigation.css';


const Navigation = () => {
    return(
        <>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/"><img src={logo} className="App-logo" alt=""></img>Coinbase Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Home" id="basic-nav-dropdown">
            <NavDropdown.Item href="/Settings">Setup</NavDropdown.Item>
        </NavDropdown>
        </Nav>
      </Navbar>
      <Route path="/Settings" exact render={Settings} />
      <Route path="/" exact component={Dashboard} />
      </>
    )
}

export default Navigation;