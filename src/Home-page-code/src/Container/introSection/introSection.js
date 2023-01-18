import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import bitcoinImg from '../../assets/images/section1.png';
import './introSection.css';

const IntroSection = () => {
    return (
        <Container>
            <Row className='align-items-center'>
                <Col md={6}>
                    <div className='intro_left'>
                        <h1> <span> Rare Find </span> Then Fund</h1>
                        <p>The only crowdfunding platform that pays YOU to start your fundraising journey! For a limited time only
                            kickstart your campaign with 10% completely free to help you reach your target!</p>

                        <div>
                            <button className='sign_up'>Sign UP It's Free</button> <span className='or_span'> OR </span> 
                            <button className='start_project'>Start a project!</button>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div>
                        <img src={bitcoinImg} alt='bitcoin' />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default IntroSection