import React, {useState, useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import axios from 'axios'


function PlaceOrderScreen() {

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const navigate = useNavigate()

    const [shouldRedirect, setShouldRedirect] = useState(false)

    const [promoCode, setPromoCode] = useState('')
    const [promoCodeUsed, setPromoCodeUsed] = useState(false)
    const [discount, setDiscount] = useState(0)

    cart.paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 50 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number(0.09 * cart.itemsPrice).toFixed(2)
    if (!promoCodeUsed) cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const handleActivate = () => {
        if (!promoCodeUsed) {
            axios.get(`api/orders/promocodes/byname/${promoCode}`).then((response) => {
                const data = response.data
                if (data.promoCode === promoCode) {
                    cart.totalPrice = (Number(cart.totalPrice - cart.totalPrice * (Number(data.discount) / 100))).toFixed(2)
                    setDiscount(data.discount)
                    setPromoCodeUsed(true)
                }
            })
        }
    }

    function handleClick() {
        window.location.href = '/'    
    }

    useEffect(() => {
        if (cart.paymentMethod == null || cart.shippingAddress === '' || !userInfo) {
            setShouldRedirect(true)
        } else {
            setShouldRedirect(false)
        }
    }, [cart.paymentMethod, cart.shippingAddress, userInfo])

    useEffect(() => {
        if (shouldRedirect) {
            navigate('/')
        }
    }, [shouldRedirect, navigate])

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
            cart.cartItems = []
        }
    }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <div>
            <FormContainer>            
                <CheckoutSteps step1 step2 step3 step4 />
            </FormContainer>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2><i class='fa-solid fa-truck'></i> Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {'  '}
                                {cart.shippingAddress.country},
                                {'  '}
                                {cart.shippingAddress.postalCode}.
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2><i class='fa-solid fa-cash-register'></i> Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2><i class='fa-sharp fa-solid fa-basket-shopping'></i> Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <div>
                                    <Link onClick={handleClick} className='btn btn-light my-3'>
                                        Go Back
                                    </Link>
                                    <Message variant='info'>Your cart is empty</Message>
                                </div> 
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col className='d-flex align-items-center'>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4} className='d-flex align-items-center'>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) }

                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items:
                                    </Col>
                                    <Col>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping (over 50$ - free):
                                    </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax (9%):
                                    </Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                            {!promoCodeUsed ? (
                                <ListGroup.Item>
                                    <Form.Group controlId='promoCode'>
                                        <Form.Label>Promo Code:</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Promo Code'
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button className='mt-2' variant='primary' onClick={handleActivate}>Activate</Button>
                                </ListGroup.Item>
                            ) : (
                                <ListGroup.Item>
                                    <Form.Group controlId='promoCode'>
                                        <Form.Label><i class='fa-solid fa-tag'></i> Promo Code Applied!</Form.Label>
                                        <Form.Label>Your discount is: {discount}%</Form.Label>
                                    </Form.Group>
                                </ListGroup.Item>
                            )}
                            

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Button
                                type = 'button'
                                className='btn-block'
                                disabled = {cart.cartItems.length === 0}
                                onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
