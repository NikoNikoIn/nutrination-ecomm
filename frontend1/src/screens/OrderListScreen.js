import React, {useState, useEffect} from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'


function OrderListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else navigate(-1)
    }, [dispatch, userInfo])

    return (
        <div>
            <h1>Orders</h1>
            { loading 
                ? <Loader /> 
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive style={{ tableLayout: 'fixed', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '14%' }}>ID</th>
                                    <th style={{ width: '14%' }}>USER</th>
                                    <th style={{ width: '14%' }}>DATE</th>
                                    <th style={{ width: '14%' }}>TOTAL</th>
                                    <th style={{ width: '14%' }}>PAID</th>
                                    <th style={{ width: '14%' }}>DELIVERED</th>
                                    <th style={{ width: '10%' }}></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td style={{ width: '14%' }}>{order._id}</td>
                                        <td style={{ width: '14%' }}>{order.user && order.user.name}</td>
                                        <td style={{ width: '14%' }}>{new Date(order.createdAt).toLocaleString()}</td>
                                        <td style={{ width: '14%' }}>${order.totalPrice}</td>
                                        <td style={{ width: '14%' }}>{order.isPaid 
                                            ? new Date(order.paidAt).toLocaleString()
                                            : <i className='fas fa-times' style={{color:'red'}}></i>}
                                        </td>
                                        <td style={{ width: '14%' }}>{order.isDelivered 
                                            ? new Date(order.deliveredAt).toLocaleString()
                                            : <i className='fas fa-times' style={{color:'red'}}></i>}
                                        </td>
                                        <td style={{ width: '10%' }}>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i class='fa-solid fa-circle-info'></i>
                                                </Button>
                                            </LinkContainer>
                                        </td>
 
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default OrderListScreen
