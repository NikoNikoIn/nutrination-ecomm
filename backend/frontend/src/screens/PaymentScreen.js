import React, {useState} from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'


function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()

        if (userInfo && paymentMethod) {
            dispatch(savePaymentMethod(paymentMethod))
            navigate('/placeorder')
        } else if (userInfo && !paymentMethod) {
            alert('Please select a payment method.')      
        } else navigate('/login?redirect=placeorder')

    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'><h1>Select Method</h1></Form.Label>
                    <Col>
                        <Form.Check 
                            style={{ padding: '0.5rem' }} 
                            type='radio' 
                            id='paypal' 
                            name='paymentMethod' 
                            value='PayPal or Credit Card'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            label={<><i class='fa-brands fa-paypal fa-xl'></i> PayPal or Credit Card</>}
                        />
                        <Form.Check 
                            style={{ padding: '0.5rem' }} 
                            type='radio' 
                            id='cash' 
                            name='paymentMethod' 
                            value='Cash on delivery'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            label={<><i class='fa-solid fa-money-bill fa-xl'></i> Cash on delivery</>}
                        />
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' style={{ fontSize: '1.5rem', padding: '1rem 2rem', borderRadius: '4px', display: 'block', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
                    Place Order
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
