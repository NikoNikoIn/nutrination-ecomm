import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'


export default function Footer() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
  
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>

            <section className=''>
                <MDBContainer className='p-4 justify-content text-center text-md-start mt-5 border-top'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <LinkContainer to='/about'>
                                    <Nav.Link>About us</Nav.Link>
                                </LinkContainer>
                            </h6>
                            <p>
                                NutriNation is a reputable online retailer that delivers a wide range of sport supplements, nutrition advice, and resources to support customers in their fitness and wellness journey.
                            </p>
                        </MDBCol>

                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Links</h6>
                            <p>
                                <LinkContainer to='/cart'>
                                    <Nav.Link className='nav-link-icon'>
                                        <font size='+1'><i className='fas fa-shopping-cart'></i> Cart</font>
                                    </Nav.Link>
                                </LinkContainer>
                            </p>
                            <p>
                                {userInfo ? (
                                    <NavDropdown title={`Logged in as: ${userInfo.name}`} id='username' style={{fontSize: '1.1rem'}}>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item><font size='+1'><i class='fa-solid fa-user-pen'></i> Profile</font></NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}><font size='+1'><i class='fa-solid fa-right-from-bracket'></i> Log Out</font></NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className='fas fa-user'></i> <font size='+1'>Login</font>
                                        </Nav.Link>
                                    </LinkContainer>
                                )}
                            </p>
                            <p>
                                <a href='#!' className='text-reset'></a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'></a>
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                Website by: {' '} <i class='fa-brands fa-github'></i>
                <a className='text-reset fw-bold' href='https://github.com/NikoNikoIn?tab=repositories'>
                    Max Kreerenko
                </a>
            </div>
        </MDBFooter>
    )
}


