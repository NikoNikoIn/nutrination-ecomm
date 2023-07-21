import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'


function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        if (userInfo) {
            dispatch(saveShippingAddress({address, city, postalCode, country}))
            navigate('/payment')
        } else navigate('/login?redirect=payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Address' value={address ? address : ''} onChange={(e) => setAddress(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Form.Group controlId='city' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>City</Form.Label>
                    <Form.Control required type='text' placeholder='Enter City' value={city ? city : ''} onChange={(e) => setCity(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Form.Group controlId='country' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>Country</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Country' value={country ? country : ''} onChange={(e) => setCountry(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Form.Group controlId='postalCode' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Postal Code' value={postalCode ? postalCode : ''} onChange={(e) => setPostalCode(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Button type='submit' variant='primary' style={{ fontSize: '1.5rem', padding: '1rem 2rem', borderRadius: '4px', display: 'block', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
                    Continue to Payment
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
