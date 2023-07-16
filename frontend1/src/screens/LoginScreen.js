import React, {useState, useEffect} from 'react'
import { Link, redirect } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import { useNavigate, useLocation } from 'react-router-dom'


function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = Location.search ? Location.search.split('=')[1] : '/' 

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Log In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form style={{ maxWidth: '600px', margin: '0 auto' }} onSubmit={submitHandler}>
                <Form.Group controlId='email' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Form.Group controlId='password' style={{ marginBottom: '1.5rem' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                </Form.Group>

                <Button type='submit' variant='primary' style={{ fontSize: '1.5rem', padding: '1rem 2rem', borderRadius: '4px', display: 'block', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>Log In</Button>
                
                <p style={{ fontSize: '1.2rem', marginTop: '2rem' }}>Don't have an account? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></p>
            </Form>

        </FormContainer>
    )
}

export default LoginScreen
