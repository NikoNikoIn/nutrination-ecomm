import React, {useState, useEffect} from 'react'
import { Link, redirect } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'

function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const redirect = Location.search ? Location.search.split('=')[1] : '/' 

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword) {
            setMessage('Passwords do not match.')
        } else dispatch(register(name, email, password))

    }


    return (
        <FormContainer>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form style={{ maxWidth: '600px', margin: '0 auto' }} onSubmit={submitHandler}>

                <Form.Group controlId='name' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Form.Group controlId='email' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Form.Group controlId='password' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Form.Group controlId='passwordConfirm' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Button type='submit' variant='primary' style={{ fontSize: '1.5rem', padding: '1rem 2rem', borderRadius: '4px', display: 'block', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>Register</Button>
                <p style={{ fontSize: '1.2rem', marginTop: '2rem' }}>Already have an account? <Link to='/login'>Sign In</Link></p>

            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
