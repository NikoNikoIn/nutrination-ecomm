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
                            {product.discountProduct > 0 ? (
                                <>
                                    <strong>{product.name}</strong><span class="badge bg-secondary">%</span>
                                </>
                            ) : (
                                <>
                                    <strong>{product.name}</strong>
                                </>
                            )}
                        </Card.Title>
                    </Link>
                    <Card.Text as='p'>
                        <Link to={`/?keyword=${product.category}`}>{product.category}</Link> - <Link to={`/?keyword=${product.brand}`}>{product.brand}</Link>
                    </Card.Text>
                    <Card.Text as='li' className={product.countInStock > 0 ? '' : 'text-danger'}>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Card.Text>
                    <div className='my-3'>
                        <Rating value={product.rating} text={'(' + product.numReviews + ')'} color={'#f8e825'} />
                    </div>
                    {product.discountProduct > 0 ? (
                        <Card.Text>
                            <h3><strike>${product.price}</strike> <span style={{ color: 'rgb(76, 161, 19)' }}>${ (product.price * (1 - 0.01 * product.discountProduct)).toFixed(2) }</span> </h3>
                            <p style={{ color: 'rgb(76, 161, 19)' }}>%{product.discountProduct} off</p>
                        </Card.Text>
                    ) : (
                        <Card.Text as='h3'>
                            ${product.price}
                        </Card.Text>
                    )}

                </Card.Body>
            </Card>
        </Container>
    )
}

export default Product