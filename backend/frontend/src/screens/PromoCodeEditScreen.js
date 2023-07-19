import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listPromoCodeDetails, updatePromoCode } from '../actions/orderActions'
import { useNavigate, useParams } from 'react-router-dom'
import { ORDER_PROMO_CODE_UPDATE_RESET } from '../constants/orderConstants'


function PromoCodeEditScreen() {

    const { id } = useParams()

    const [promoCodeName, setPromoCodeName] = useState('')
    const [discount, setDiscount] = useState(0)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const promoCodeDetails = useSelector(state => state.promoCodeDetails)
    const { error, loading, promoCode } = promoCodeDetails

    const promoCodeUpdate = useSelector(state => state.promoCodeUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = promoCodeUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: ORDER_PROMO_CODE_UPDATE_RESET})
            navigate('/admin/promocodelist')
        } else {

            if (!promoCode.promoCode || promoCode.id !== Number(id)) {
                dispatch(listPromoCodeDetails(id))
            } else {
                setPromoCodeName(promoCode.promoCode)
                setDiscount(promoCode.discount)
            }

        }   

    }, [promoCode, id, navigate, dispatch, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePromoCode({
            id: id,
            promoCodeName,
            discount,
        }))
    }


    return (
        <div>
            <Link to='/admin/promocodelist' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Edit Promo Code</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form style={{ maxWidth: '600px', margin: '0 auto' }} onSubmit={submitHandler}>

                        <Form.Group controlId='promoCodeName' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Promo Code</Form.Label>
                            <Form.Control type='name' placeholder='Enter Promo Code' value={promoCodeName} onChange={(e) => setPromoCodeName(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                        </Form.Group>

                        <Form.Group controlId='discount' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Discount In %</Form.Label>
                            <Form.Control type='number' placeholder='Enter Discount' value={discount} onChange={(e) => setDiscount(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} max={99} />                        </Form.Group>
                        <Button type='submit' variant='primary' style={{ fontSize: '1.5rem', padding: '1rem 2rem', borderRadius: '4px', display: 'block', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>Update</Button>
                    </Form>
                )}
            </FormContainer>
            
        </div>
    )
}

export default PromoCodeEditScreen
