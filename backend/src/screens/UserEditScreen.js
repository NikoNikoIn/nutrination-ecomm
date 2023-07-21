import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { useNavigate, useParams } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants'


function UserEditSceen() {

    const { id } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate
    
    useEffect(() => {

        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }


    }, [user, id, successUpdate, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
    }


    return (
        <div>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form style={{ maxWidth: '600px', margin: '0 auto' }} onSubmit={submitHandler}>

                        <Form.Group controlId='name' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                        </Form.Group>

                        <Form.Group controlId='email' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                        </Form.Group>

                        <Form.Group controlId='email' style={{ marginBottom: '1.5rem' }}>
                            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                        </Form.Group>

                        <Button type='submit' variant='primary' style={{ fontSize: '1.5rem', padding: '1rem 2rem', borderRadius: '4px', display: 'block', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>Update</Button>
                    </Form>
                )}
            </FormContainer>
            
        </div>
    )
}

export default UserEditSceen
