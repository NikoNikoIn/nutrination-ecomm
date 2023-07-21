import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen() {

    const productDetails = useSelector(state => state.productDetails)
    const { product: { _id: productId } } = productDetails
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const qty = Number(searchParams.get('qty'))

    const dispatch = useDispatch()
    useEffect(() => {
        if (productId && qty) {
            const existingCartItem = cartItems.find(item => item.product === productId)
            if (!existingCartItem ) {
                dispatch(addToCart(productId, qty))
            }
        }
    }, [dispatch, productId, qty])
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const navigate = useNavigate()
    function handleClick() {
        navigate(-1)
    }
    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping')
        } else navigate('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col xs={12} md={8}>
                <h1>Shopping Cart</h1>
                <Link onClick={handleClick} className='btn btn-light my-3'>
                    Go Back
                </Link>
                {cartItems.length === 0 ? (
                    <div>
                        <Message variant='info'>Your cart is empty</Message>
                    </div>
                ) : (
                    <div>
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col xs={6} md={2} className='mb-3 mb-md-0'>
                                            <Image src={decodeURIComponent(item.image).replace('/images/', '')} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col xs={6} md={3} className='d-flex align-items-center justify-content-center'>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col xs={6} md={2} className='d-flex align-items-center justify-content-center'>
                                            
                                            {item.discountProduct > 0 ? (
                                                    <>
                                                        <strike>${item.price * item.qty} </strike> <span style={{ color: 'rgb(76, 161, 19)' }}> ${ ((item.price * (1 - 0.01 * item.discountProduct)) * item.qty).toFixed(2) } </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        ${item.price * item.qty}
                                                    </>
                                            )}
                                        </Col>
                                        <Col xs={6} md={3} className='d-flex align-items-center justify-content-center'>
                                            Qty: {item.qty}
                                        </Col>
                                        <Col xs={6} md={1} className='d-flex align-items-center justify-content-center'>
                                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}
            </Col>
            <Col xs={12} md={4}>
                <h1>Subtotal </h1>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)} items</h2>
                            ${Number(cartItems.reduce((acc, item) => {
                                if (item.discountProduct > 0) {
                                    return (acc + item.qty * item.price * (1 - 0.01 * item.discountProduct))
                                } else {
                                    return (acc + item.qty * item.price)
                                }
                            }, 0)).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <Button type='button' style={{ fontSize: '1.5rem', padding: '1rem 2rem', borderRadius: '4px', display: 'block', width: '100%', marginTop: '2rem', marginBottom: '2rem' }} disabled={cartItems.length === 0} onClick={checkoutHandler}>
                        Proceed To Checkout
                </Button>
            </Col>
        </Row>
    )
}
export default CartScreen
