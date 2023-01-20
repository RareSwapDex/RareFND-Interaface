import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Mission.css';

const Mission = () => {
  return (
    <Container>
        <div className='mission_main'>
            <Container fluid>
                <Row>
                    <Col md={5} className='mission_box1'></Col>
                    <Col md={6}>
                        <div className='mission_text'>
                            <h1>Our mission:</h1>
                            <h4>Empower the innovator in all of us</h4>
                            <p>We want to ensure that the innovators amongst all of us are given the best 
                                opportunity to make their ideas a success</p>
                            
                            <button>Start Fundraising</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </Container>
  )
}

export default Mission