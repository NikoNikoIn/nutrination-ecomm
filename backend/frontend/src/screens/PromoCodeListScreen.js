import React, {useEffect} from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPromoCodes, deletePromoCode, createPromoCode } from '../actions/orderActions'
import { ORDER_PROMO_CODE_CREATE_RESET } from '../constants/orderConstants'


function PromoCodeListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const promoCodeList = useSelector(state => state.promoCodeList)
    const { loading, error, promoCodes } = promoCodeList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const promoCodeDelete = useSelector(state => state.promoCodeDelete)
    const { success: successDelete } = promoCodeDelete

    const promoCodeCreate = useSelector(state => state.promoCodeCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, promoCode: createdPromoCode } = promoCodeCreate

    useEffect(() => {
        dispatch({type:ORDER_PROMO_CODE_CREATE_RESET})

        if (!userInfo.isAdmin) {
            navigate(-1)
        }

        if (successCreate) {
            navigate(`/admin/orders/promocodes/${createdPromoCode.id}/edit`)
        } else {
            dispatch(listPromoCodes())
        }
    }, [dispatch, userInfo, successDelete, navigate, successCreate, createdPromoCode])


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this promocode?')) {
            dispatch(deletePromoCode(id))
        }
    }

    const createPromoCodeHandler = () => {
        dispatch(createPromoCode())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Promo Codes</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createPromoCodeHandler}>
                        <i className='fa-solid fa-plus'></i> Create PromoCode
                    </Button>
                </Col>
            </Row>
                        
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            
            { loading 
                ? <Loader /> 
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive style={{ tableLayout: 'fixed', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '25%' }}>ID</th>
                                    <th style={{ width: '25%' }}>PROMO CODE</th>
                                    <th style={{ width: '25%' }}>DISCOUNT IN %</th>
                                    <th style={{ width: '10%' }}></th>
                                </tr>
                            </thead>

                            <tbody>
                                {promoCodes.map(promocode => (
                                    <tr key={promocode._id}>
                                        <td style={{ width: '25%' }}>{promocode.id}</td>
                                        <td style={{ width: '25%' }}>{promocode.promoCode}</td>
                                        <td style={{ width: '25%' }}>{promocode.discount}</td>
                                        <td style={{ width: '10%' }}>
                                            <LinkContainer to={`/admin/orders/promocodes/${promocode.id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i class='fa-solid fa-pen-to-square'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(promocode.id)}>
                                                <i class='fa-solid fa-trash'></i>
                                            </Button>
                                        </td>
 
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default PromoCodeListScreen
