import React,{Component} from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
  render(){
    return (
      <Navbar inverse fixedTop>
		<Navbar.Header>
			<Navbar.Brand>
				<a href="/">Book Store</a>
			</Navbar.Brand>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
      <Nav>
    				<NavItem eventKey={1} href="#">
    					About
    				</NavItem>
				<NavItem eventKey={2} href="#">
					Contact Us
				</NavItem>
			</Nav>
			<Nav pullRight>
				<NavItem eventKey={1} href="/admin">
					Admin
				</NavItem>
				<NavItem eventKey={2} href="/cart">
					Your cart {(this.props.cartItemsNumber > 0)? (<Badge className="badge">{this.props.cartItemsNumber}</Badge>) : ('')}

				</NavItem>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)
  }
}
export default Menu;
