import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FooterLogo from '../../assets/images/main_logo.png';
import fb from '../../assets/images/fb.png';
import insta from '../../assets/images/insta.png';
import twitter from '../../assets/images/twitter.png';
import linkdln from '../../assets/images/linkdln.png';
import email from '../../assets/images/email.png';
import phone from '../../assets/images/phone.png';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer_main'>
      <Container>
        <div className='text-center footer_logo'>
          <img src={FooterLogo} alt='footer_logo' />

          <p>The Rare FND organization is a non-profit organization made up of rare individuals
            who are experts in their field that when
            combined form a rare force to help support the ecosystem of all involved with Rare FND. </p>
        </div>
      </Container>

      <div className='social_icons text-center mt-5'>
        <img src={fb} alt='' />
        <img src={insta} alt='' />
        <img src={twitter} alt='' />
        <img src={linkdln} alt='' />
      </div>

      <Container className='footer_links'>
        <Row>
          <Col md={4}>
            <div>
              <p>
                ADDRESS: RARE FND LIMITED, 86-90 Paul Street, London, England, EC2A 4NE (14325862)
                RATBits NFT Marketplace DMCC, 48th floor Almas Towers, JLT, Dubai
              </p>

              <div className='d-flex justify-content-between'>
                <p style={{ fontSize: "15px", color: '#6d7783' }}><img src={email} alt='' /> Contact@mail.com</p>
                <p style={{ fontSize: "15px", color: '#6d7783' }}><img src={phone} alt='' /> 00000-000-00</p>
              </div>
            </div>
          </Col>
          <Col md={3} className='quick_link'>
            <div className='social'>
              <h6>Quick Links</h6>

              <ul>
                <li>Home</li>
                <li>Updates</li>
                <li>Events</li>
                <li>Contacts</li>
              </ul>
            </div>
          </Col>
          <Col md={2}>
            <div className='social'>
              <h6>Help Centre</h6>

              <ul>
                <li>Support</li>
                <li>Sign Up</li>
                <li>Login</li>
              </ul>
            </div>
          </Col>
          <Col md={3}>
            <div className='social'>
              <h6>Partnerships</h6>

              <ul>
                <li>Crypto Industry Partners</li>
                <li>Media Partners</li>
                <li>Non Profit Industry Partners</li>
                <li>Incubator Partners</li>
                <li>Partner with Us</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      <div className='right_reserved'>

        <Container>
          <Row>
            <Col md={6}>
              <p>© RareFnd, 2022. All rights reserved.</p>
            </Col>
            <Col md={6}>
              <p className='d-flex justify-content-end'>Legal Disclaimer | Privacy Policy | Terms of Service</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Footer