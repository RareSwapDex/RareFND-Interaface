import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FundMain from '../../assets/images/fundraising_main.png';
import './Fundraising.css';

const Fundraising = () => {
    return (
        <div className='fundraising_main'>
            <Container>
                <Row>
                    <Col md={7}>
                        <div style={{ paddingTop: "50px" }}>
                            <h1>Fundraising solution</h1>
                            <p>Crowdfunding with the speed and flexibility of crypto! We’re the first and only platform to offer a
                                cryptocurrency based fundraising program. Contribution rewards can be delivered in minutes,
                                not months using our revolutionary NFT fractionalization and steganography technology –
                                a first in the cryptocurrency and crowdfunding space.
                                Some of your campaign contributors not crypto – savvy? No problem! We offer fiat based payments as well using
                                credit and debit cards.
                                We’re a true end to end crowdfunding solution!</p>

                            <button>Start Fundraising</button>
                        </div>
                    </Col>
                    <Col md={5}>
                        <img src={FundMain} alt='fund_main' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Fundraising