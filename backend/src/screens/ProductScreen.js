import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview, listProducts, deleteReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Product from '../components/Product'


function ProductScreen() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    
    const productDetails = useSelector(state=>state.productDetails)
    const {loading, error, product: productCurrent} = productDetails

    const productList = useSelector(state => state.productList)
    const {products} = productList
    
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
   
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin 

    const productReviewCreate = useSelector(state=>state.productReviewCreate)
    const {loading: loadingProductReview, error: errorProductReview, success: successProductReview} = productReviewCreate 

    const reviewDelete = useSelector(state => state.reviewDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = reviewDelete

    const keyword = productCurrent.category

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(id))
    }, [dispatch, useParams, successProductReview, id, successDelete])

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    const addToCartHandler = () => {
        navigate(`/cart/?id=${id}&qty=${qty}`)
    }

    function handleClick() {
        navigate(-1)
    }

    const handleLoginRedirect = () => {
        navigate('/login')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            id, {
            rating,
            comment,
        }
        ))
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this review?')) {
            dispatch(deleteReview(id))
        }
    }

    return <div>
            <Link onClick={handleClick} className='btn btn-light my-3'>Go Back</Link>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        
            {loading ?
                <Loader/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                :(
                    <div>
                        <Row>
                            <Col md={3}>
                                <Image
                                src={decodeURIComponent(productCurrent.image).replace('/images/', '')}
                                alt={productCurrent.name}
                                fluid
                                style={{ transition: 'transform 0.5s', borderRadius: '8px', filter: productCurrent.countInStock === 0 ? 'grayscale(100%)' : 'none' }}
                                onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                />                   
                                {userInfo && userInfo.isAdmin && (
                                    <LinkContainer to={`/admin/product/${productCurrent._id}/edit`}>
                                        <Button variant='light' className='btn btn-light my-3'>
                                            <i class='fa-solid fa-pen-to-square'></i> Edit
                                        </Button>
                                    </LinkContainer>
                                )}    
                            </Col>
                            <Col md={6}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h1>{productCurrent.name}</h1>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h3>Category: </h3><Link to={`/?keyword=${productCurrent.category}`}>{productCurrent.category}</Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h3>Brand: </h3><Link to={`/?keyword=${productCurrent.brand}`}>{productCurrent.brand}</Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h5
                                            style={{ marginTop: '0.5rem' }}
                                            title={`${productCurrent.rating} stars, ${productCurrent.numReviews} reviews`}
                                        >
                                            <Rating value={productCurrent.rating} text={` ${productCurrent.numReviews} review(s)`} color={'#f8e825'} />
                                        </h5>                                
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {productCurrent.discountProduct > 0 ? (
                                            <>
                                                <h4><strike>${productCurrent.price}</strike> <span style={{ color: 'rgb(76, 161, 19)' }}>${ (productCurrent.price * (1 - 0.01 * productCurrent.discountProduct)).toFixed(2) } </span></h4>
                                                <h5>Your discount is: <span style={{ color: 'rgb(76, 161, 19)' }}>{productCurrent.discountProduct}%</span></h5>
                                            </>
                                        ) : (
                                            <h4>Price: ${productCurrent.price}</h4>
                                        )}

                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h5>{productCurrent.description}</h5>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    {productCurrent.discountProduct > 0 ? (
                                                        <>
                                                            <strike>${productCurrent.price}</strike> <span style={{ color: 'rgb(76, 161, 19)' }}>${ (productCurrent.price * (1 - 0.01 * productCurrent.discountProduct)).toFixed(2) } </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            ${productCurrent.price}
                                                        </>
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col className={productCurrent.countInStock > 0 ? '' : 'text-danger'}>
                                                    <strong>{productCurrent.countInStock > 0 ? `In Stock: ${productCurrent.countInStock} items` : 'Out of Stock'}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {productCurrent.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Quantity:</Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(productCurrent.countInStock).keys()].map((x)=>(
                                                                    <option key={x+1} value={x+1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                        )}
                                        <ListGroup.Item>
                                            <Button onClick={addToCartHandler} className='btn btn-lg btn-primary' disabled={productCurrent.countInStock == 0} type='button'>Add to Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <h3 className='mt-4'>Reviews</h3>
                                {productCurrent.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                            
                                <ListGroup variant='flush'>
                                    {productCurrent.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} color='#f8e825'/>
                                            <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                                            <p>{review.comment}</p>
                                        
                                            {userInfo && userInfo.isAdmin && (
                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(review._id)}>
                                                    <i class='fa-solid fa-trash'></i>
                                                </Button>                                               
                                            )}
                                        </ListGroup.Item>
                                    ))}

                                    <ListGroup.Item>
                                        <h4>Write a Review</h4>
                                        {loadingProductReview && <Loader/>}
                                        {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label style={{ fontSize: '1.2rem' }}>
                                                        Rating
                                                    </Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                        style={{
                                                            fontSize: '1rem',
                                                            padding: '0.5rem',
                                                            borderRadius: '4px',
                                                            border: '1px solid #ddd',
                                                            boxShadow: 'none',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - OK</option>
                                                        <option value='4'>4 - Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            
                                                <Form.Group controlId='comment'>
                                                    <Form.Label style={{ fontSize: '1.2rem' }}>
                                                        Review
                                                    </Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='5'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        style={{
                                                            fontSize: '1rem',
                                                            padding: '0.5rem',
                                                            borderRadius: '4px',
                                                            border: '1px solid #ddd',
                                                            boxShadow: 'none',
                                                            width: '100%',
                                                        }}
                                                    ></Form.Control>
                                                </Form.Group>
                                            
                                                <Button
                                                    disabled={loadingProductReview}
                                                    type='submit'
                                                    variant='primary'
                                                    style={{
                                                        fontSize: '1.5rem',
                                                        padding: '1rem 2rem',
                                                        borderRadius: '4px',
                                                        display: 'block',
                                                        width: '100%',
                                                        marginTop: '2rem',
                                                        marginBottom: '2rem'
                                                    }}
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Button
                                            type='submit'
                                            variant='primary'
                                            style={{
                                            fontSize: '1.5rem',
                                            padding: '1rem 2rem',
                                            borderRadius: '4px',
                                            display: 'block',
                                            width: '100%',
                                            marginTop: '2rem',
                                            marginBottom: '2rem'
                                            }}
                                            onClick={handleLoginRedirect}
                                            >
                                                Login to Review
                                            </Button>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={6}>
                                <h3 className='mt-4'>Similar Products</h3>
                                <Row>
                                    {products.map((product, index) => (
                                        index < 4 && productCurrent._id !== product._id && productCurrent.category === product.category && product.countInStock > 0 && (
                                            <Col key={product._id} md={6}>
                                                <Product product={product}/>
                                            </Col>
                                        )
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </div>
                )
            } 
        </div>
    }

    export default ProductScreen
