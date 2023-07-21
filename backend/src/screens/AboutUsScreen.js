import React from 'react'
import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'


function AboutUsScreen() {
    const images = [
        'https://images.onlymyhealth.com/imported/images/2019/July/08_Jul_2019/Big__22mansupp.jpg',
        'https://www.justfit.lk/wp-content/uploads/2021/02/bodybuilding-supplements-1.png',
        'https://i0.wp.com/whatsgood.vitaminshoppe.com/wp-content/uploads/2019/08/fitness-supplements-header.jpg?fit=1484%2C614&ssl=1'
    ]
    const loading = false
    const error = null

    return (
        <div className='body'>
            <h1>About NutriNation</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row className='mt-3'>
                    <Col md={6}>
                        {images.map((img, i) => (
                            <Image
                                key={i}
                                src={img}
                                className='mb-3'
                                fluid
                                rounded
                                onMouseOver={(e) => {
                                    e.target.style.transition = 'transform 0.3s ease-out'
                                    e.target.style.transform = 'scale(1.05)'
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transition = 'transform 0.3s ease-out'
                                    e.target.style.transform = 'scale(1)'
                                }}
                            />
                        ))}
                    </Col>
                    <Col md={6}>
                        <Card className='shadow mb-3'>
                            <Card.Header><h3><i class='fa-solid fa-dumbbell'></i> About Us</h3></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    At NutriNation, we believe that living a <span style={{ color: 'rgb(235, 64, 52)' }}>healthy and fit lifestyle</span> can be made easier, simpler, and more accessible. That's why we have made it our mission to provide our customers with <span style={{ color: 'rgb(235, 64, 52)' }}>top-quality</span>, <span style={{ color: 'rgb(235, 64, 52)' }}>science-backed</span> fitness supplements, including <span style={{ color: 'rgb(235, 64, 52)' }}>protein, keratine, vitamins</span>, and <span style={{ color: 'rgb(235, 64, 52)' }}>more, all at affordable prices</span>.
                                </Card.Text>
                                <Card.Text>
                                    Our team of experts carefully curates our product selection, working with trusted suppliers and manufacturers, to ensure that our customers receive only the <span style={{ color: 'rgb(235, 64, 52)' }}>best fitness supplements</span> that are <span style={{ color: 'rgb(235, 64, 52)' }}>backed by research and proven to be effective</span>. We also strive to provide our customers with <span style={{ color: 'rgb(235, 64, 52)' }}>unparalleled customer service</span>, making sure that our <span style={{ color: 'rgb(235, 64, 52)' }}>friendly and knowledgeable staff</span> are always available to answer any questions or concerns.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='shadow mb-3'>
                            <Card.Header><h3><i class='fa-solid fa-bullseye'></i> Our Mission</h3></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Our <span style={{ color: 'rgb(235, 64, 52)' }}>mission</span> is to provide our customers with the <span style={{ color: 'rgb(235, 64, 52)' }}>highest-quality, science-backed fitness supplements</span> that will help them <span style={{ color: 'rgb(235, 64, 52)' }}>achieve their fitness goals and maintain optimal health</span>. We believe that <span style={{ color: 'rgb(235, 64, 52)' }}>a healthy lifestyle should be accessible to everyone</span>, which is why we offer our supplements at <span style={{ color: 'rgb(235, 64, 52)' }}>affordable prices</span>. Our carefully curated product selection includes <span style={{ color: 'rgb(235, 64, 52)' }}>protein, keratine, vitamins, and more</span>, all of which are <span style={{ color: 'rgb(235, 64, 52)' }}>proven to be effective and backed by research</span>.
                                </Card.Text>
                                <Card.Text>
                                    But, we don't just stop there. At NutriNation, we also strive to provide our customers with <span style={{ color: 'rgb(235, 64, 52)' }}>unparalleled customer service</span>. It's our goal to make every customer's experience with us as <span style={{ color: 'rgb(235, 64, 52)' }}>seamless and enjoyable</span> as possible. Our <span style={{ color: 'rgb(235, 64, 52)' }}>friendly and knowledgeable</span> staff are always available to <span style={{ color: 'rgb(235, 64, 52)' }}>answer any questions or concerns</span>, so you can <span style={{ color: 'rgb(235, 64, 52)' }}>feel confident in your supplement choices</span>.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='shadow mb-3'>
                            <Card.Header><h3><i class='fa-solid fa-people-group'></i> Our Team</h3></Card.Header>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Image
                                        src='https://www.vidavetcare.com/wp-content/uploads/sites/234/2022/04/pembroke-welsh-corgi-dog-breed-info.jpeg'
                                        className='mr-3'
                                        roundedCircle
                                        style={{ width: '5rem', height: '5rem' }}
                                    />
                                    <h5 style={{ color: 'rgb(235, 64, 52)' }}>Max Kreerenko</h5>
                                    <p className='text-muted'>Maker</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Image
                                        src='https://i.guim.co.uk/img/media/44eddd0655bf11d1a7b029f15439f9f7b9efb201/181_28_2208_1324/master/2208.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=da9c2c9b2fe603689a6116aa0fc9b948'
                                        className='mr-3'
                                        roundedCircle
                                        style={{ width: '5rem', height: '5rem' }}
                                    />
                                    <h5 style={{ color: 'rgb(235, 64, 52)' }}>Tyler Durden</h5>
                                    <p className='text-muted'>Co-founder</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default AboutUsScreen


