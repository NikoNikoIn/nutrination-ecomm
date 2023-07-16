import React from 'react'
import { Card, Container } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <Container className='card-container'>
            <Card className='card-style rounded' style={{ width: '300px', height: '600px' }}>
                <Link to={'/product/' + product._id}>
                    <Card.Img src={product.image}/>
                </Link>
                <Card.Body>
                    <Link to={'/product/' + product._id}>
                        <Card.Title as='h4'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='p'>
                        <Link to={`/?keyword=${product.category}`}>{product.category}</Link>
                    </Card.Text>
                    <Card.Text as='li'>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Card.Text>
                    <div className='my-3'>
                        <Rating value={product.rating} text={' ' + product.numReviews + ' review(s)'} color={'#f8e825'} />
                    </div>
                    <Card.Text as='h3'>
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Product