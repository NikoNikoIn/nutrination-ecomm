import React, {useEffect} from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'


function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else navigate(-1)
    }, [dispatch, successDelete, userInfo, navigate])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }


    return (
        <div>
            <h1>Users</h1>
            { loading 
                ? <Loader /> 
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive style={{ tableLayout: 'fixed', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>ID</th>
                                    <th style={{ width: '20%' }}>NAME</th>
                                    <th style={{ width: '20%' }}>EMAIL</th>
                                    <th style={{ width: '20%' }}>ADMIN</th>
                                    <th style={{ width: '10%' }}></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td style={{ width: '20%' }}>{user._id}</td>
                                        <td style={{ width: '20%' }}>{user.name}</td>
                                        <td style={{ width: '20%' }}>{user.email}</td>
                                        <td style={{ width: '20%' }}>{user.isAdmin 
                                            ? <i className='fas fa-check' style={{color: 'green'}}></i> 
                                            : <i className='fas fa-times' style={{color:'red'}}></i>}
                                        </td>
                                        <td style={{ width: '10%' }}>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i class='fa-solid fa-user-pen'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen
