import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PartnerLeft from '../../assets/images/partner_left.png'
import PartnerRight from '../../assets/images/partner_right.png'
import './PartnerSection.css';

const PartnerSection = () => {
    return (
        <Container className='mt-5 box_animate1'>
            <Row className='align-items-center'>
                <Col md={6} className='partner_left_img'>
                    <img src={PartnerLeft} alt='left' />
                </Col>
                <Col md={6}>
                    <div className='key_partner'>
                        <h2>Key Partnerships</h2>
                        <p>Key partnerships to be announced with some of the leading names in the industry
                            across the charity space. Stay tuned to our socials as some of the
                            biggest partnerships in the crowdfunding
                            space are to be announced, and you have the chance to get involved too!</p>

                        <button className='learn_more mt-5'>Learn More</button>
                    </div>
                </Col>
                <Col md={6} className='box_animate2'>
                    <div className='key_partner'>
                        <h2>The Only Crowdfunding
                            Platform That Pays You
                            To Crowdfund</h2>
                        <p>Start crowdfunding with Rare Fnd today and we will give you 10% towards your crowdfunding target! Not only that but reach your
                            target quicker with 240% APY on all contributions.</p>

                        <button className='learn_more'>Learn More</button>
                    </div>
                </Col>
                <Col md={6} style={{ paddingLeft: 0, marginTop: '-1px' }} className='partner_right_img'>
                    <img src={PartnerRight} alt='left' />
                </Col>
            </Row>
        </Container>
    )
}

export default PartnerSection