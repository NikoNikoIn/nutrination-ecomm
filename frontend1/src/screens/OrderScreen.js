import React, {useState, useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


function OrderScreen({match}) {
    const {orderId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)
    
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }
    //AVQ72eYVSxsYqMUjgWlM5DUOWOjfpZc0ph0HOHBGwn1POBX-W1gciVqfG2OWCogyB9H6KcYuMfpkqiFs

    function handleClick() {
        window.location.href = '/'    
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AVQ72eYVSxsYqMUjgWlM5DUOWOjfpZc0ph0HOHBGwn1POBX-W1gciVqfG2OWCogyB9H6KcYuMfpkqiFs&currency=USD'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    
    useEffect(() => {

        if (!userInfo) {
            navigate(-1)
        }

        if(!order || successDeliver || order._id !== Number(orderId) || successPay) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [order, orderId, dispatch, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        const { access } = userInfo
        dispatch(payOrder(orderId, paymentResult, access))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            {userInfo && (
                userInfo.isAdmin ? (
                    <div>
                        <Link to='/admin/orderlist' className='btn btn-light my-3'>To Orders</Link>
                        <Link to='/profile' className='btn btn-light my-3'>To Profile</Link>
                    </div>
                    ) : (
                    <Link to='/profile' className='btn btn-light my-3'>To Profile</Link>
                )
            )}
            <h1>Order #{order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2><i class='fa-solid fa-truck'></i> Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                { order.user.name }
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>{ order.user.email }</a>
                            </p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {'  '}
                                {order.shippingAddress.country},
                                {'  '}
                                {order.shippingAddress.postalCode}.
                            </p>

                            { order.isDelivered ? (
                                <Message variant='success'><i class='fa-sharp fa-solid fa-calendar-days'></i> Delivered on {new Date(order.deliveredAt).toLocaleString()}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            ) }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2><i class='fa-solid fa-cash-register'></i> Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            { order.isPaid ? (
                                <Message variant='success'><i class='fa-sharp fa-solid fa-calendar-days'></i> Paid on {
                                    
                                    new Date(order.paidAt).toLocaleString()
                                }</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            ) }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2><i class='fa-sharp fa-solid fa-basket-shopping'></i> Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <div>
                                    <Link onClick={handleClick} className='btn btn-light my-3'>
                                        Go Back
                                    </Link>
                                    <Message variant='info'>Order is empty</Message>
                                </div> 
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                        ${order.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping (over 50$ - free):
                                    </Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax (9%):
                                    </Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total (with discount):
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && order.paymentMethod === 'PayPal or Credit Card' && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}

                                    {!sdkReady ? (
                                        <Loader/>
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {loadingDeliver && <Loader/> }
                        <ListGroup.Item className='my-3'>
                            <div className='d-flex justify-content-center'>
                                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                                    <Button 
                                        type='button' 
                                        className='btn btn-block btn-primary mx-2' 
                                        onClick={deliverHandler}
                                    >
                                        Mark as Delivered
                                    </Button>
                                )}

                                {userInfo && userInfo.isAdmin && !order.isPaid && (
                                    <Button
                                        type='button'
                                        className='btn btn-block btn-primary mx-2'
                                        onClick={() => successPaymentHandler(true)}
                                    >
                                        Mark as Paid
                                    </Button>
                                )}
                            </div>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
