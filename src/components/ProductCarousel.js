import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image, Container, Row, Col } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import Rating from './Rating'


function ProductCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { error, loading, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        <>
        {!loading && (
            error ? <Message variant='danger'>{error}</Message> :
                (
                    <div>
                        <h1>Top Products</h1>
                        <div style={{ border: '2px solid #eb4034', marginBottom: '2rem', borderRadius: '24px' }}>
                            <Carousel pause='hover' style={{ borderRadius: '8px' }} 
                                nextIcon={<i class='fa-sharp fa-solid fa-chevron-right' style={{ color: '#eb4034', fontSize: '40px' }}></i>} 
                                prevIcon={<i class='fa-sharp fa-solid fa-chevron-left' style={{ color: '#eb4034', fontSize: '40px' }}></i>}
                            >                            
                                {products.map((product) => (
                                    <Carousel.Item key={product._id}>
                                        <Link to={'/product/' + product._id}>
                                            <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image
                                                    src={decodeURIComponent(product.image).replace('/images/', '')}
                                                    alt={product.name}
                                                    fluid
                                                    style={{
                                                        width: 'auto',
                                                        maxHeight: '100%',
                                                        objectFit: 'contain',
                                                        background: 'white'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.transition = 'transform 0.3s ease-out'
                                                        e.target.style.transform = 'scale(1.05)'
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.transition = 'transform 0.3s ease-out'
                                                        e.target.style.transform = 'scale(1)'
                                                    }}
                                                />
                                            </div>
                                            <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '24px' }}>
                                                <h4 className='mb-2 text-left' style={{ color: '#fff' }}>{product.name} 
                                                {product.discountProduct > 0 ? (
                                                    <>
                                                        <span> </span><strike>${product.price}</strike> <span>${ (product.price * (1 - 0.01 * product.discountProduct)).toFixed(2) }</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span> ${product.price}</span>
                                                    </>
                                                )}
                                                <br /> 
                                                {product.category} </h4>
                                                <Rating value={product.rating}/>
                                                <h5 className='mb-2 text-left' style={{ color: '#fff' }}>{product.numReviews} review(s)</h5>
                                            </Carousel.Caption>
                                        </Link>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                )
        )}
        </>
    )
}

export default ProductCarousel