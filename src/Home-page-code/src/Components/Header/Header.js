import React from 'react'
import { Col, Container, Row, Navbar, Nav } from 'react-bootstrap';
import dollarTop from '../../assets/images/dollar_top.png'
import MainLogo from '../../assets/images/main_logo.png';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className='header_top'>
                <Container>
                    <Row className='align-items-center'>
                        <Col md={8}>
                            <p className='header_top_text'> <img src={dollarTop} alt='top' /> Donate now and benefit from Give2Earn at Rare FND</p>
                        </Col>
                        <Col md={4}>
                            <div className='d-flex justify-content-end'>
                                <button className='login'>Login</button>
                                <button className='sign_up'>Sign Up</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Navbar expand="lg">
                <Container className='align-items-start'>
                    <Navbar.Brand href="#home"><img src={MainLogo} alt='logo' /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='nav_bar'>
                        <Nav className="ms-auto">
                            <Nav.Link href="#home" className='active'>Home</Nav.Link>
                            <Nav.Link href="#link">Art</Nav.Link>
                            <Nav.Link href="#link">Design & Tech</Nav.Link>
                            <Nav.Link href="#link">Films</Nav.Link>
                            <Nav.Link href="#link">Food & Crafts</Nav.Link>
                            <Nav.Link href="#link">Games</Nav.Link>
                            <Nav.Link href="#link">Music</Nav.Link>
                            <Nav.Link href="#link">Non Profit</Nav.Link>
                            <button className='connect_btn'>Connect Wallet</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header