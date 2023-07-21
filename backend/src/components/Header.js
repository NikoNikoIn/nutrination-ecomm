import React, {useEffect} from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from '../components/SearchBox'
import Loader from '../components/Loader'
import { getCategories, listProducts } from '../actions/productActions'
import { Link, useNavigate } from 'react-router-dom'


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const productList = useSelector(state => state.productList)
    const {loading, success} = productList

    const productCategories = useSelector(state => state.productCategories)
    const categories = productCategories.categories.categories
    const { loading: loadingCategories } = productCategories

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            await dispatch(listProducts())
            dispatch(getCategories())
          }
        
          fetchProductsAndCategories()
        
    }, [dispatch])



    const handleClick = (category) => {
        const url = `/?keyword=${encodeURIComponent(category)}`
        navigate(url)
    }

    return (
        <header>
            {!loading && (
                
                <Navbar
                    expand='lg'
                    className='color-nav'
                    variant='dark'
                    collapseOnSelect
                >
                    
                    <Container>
                        <LinkContainer to='/'>
                            <Navbar.Brand><h1 className='title-navbar'>NutriNation</h1></Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='mr-auto'>
                                <LinkContainer to='/about'>
                                    <Nav.Link>
                                        <i className='fas fa-dumbbell'></i> <font size='+1'>About Us</font>
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/cart'>
                                    <Nav.Link>
                                        <i className='fas fa-shopping-cart'></i> <font size='+1'>Cart</font>
                                    </Nav.Link>
                                </LinkContainer>

 
                                {!loadingCategories && (
                                    <>
                                        {categories && categories.length > 0 ? (
                                            <NavDropdown title={<span><i class="fa-solid fa-boxes-stacked"></i> Categories</span>} id='categories' style={{ fontSize: '1.1rem' }}>
                                                {categories
                                                    .filter((category) => category !== 'Other') // Exclude 'Other' category from the initial items
                                                    .map((category) => (
                                                        <NavDropdown.Item key={category} onClick={() => handleClick(category)}>
                                                            {category}
                                                        </NavDropdown.Item>
                                                    ))}
                                                {categories.includes('Other') && (
                                                    <NavDropdown.Item onClick={() => handleClick('Other')}>
                                                        Other
                                                    </NavDropdown.Item>
                                                )}
                                            </NavDropdown>
                                        ) : (null)}
                                    </>
                                )}
                                {userInfo ? (
                                    <NavDropdown title={<span><i class='fa-regular fa-circle-user'></i> Hi, {userInfo.name}!</span>} id='username' style={{ fontSize: '1.1rem' }}>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item><font size='+1'><i class='fa-solid fa-user-pen'></i> Profile</font></NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}><font size='+1'><i class='fa-solid fa-right-from-bracket'></i> Log Out</font></NavDropdown.Item>

                                    </NavDropdown>
                                ) : (
                                    <>
                                        <LinkContainer to='/login'>
                                            <Nav.Link>
                                                <i className='fas fa-user'></i> <font size='+1'>Log In</font>
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to='/register'>
                                            <Nav.Link>
                                                <i className='fa-solid fa-user-plus'></i> <font size='+1'>Register</font>
                                            </Nav.Link>
                                        </LinkContainer>
                                    </>
                                )
                                }

                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title={<><i className='fa-solid fa-toolbox'></i> Admin</>} id='adminmenu' style={{ fontSize: '1.1rem' }}>                                    
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item><font size='+1'><i class='fa-solid fa-users'></i> Users</font></NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item><font size='+1'><i class='fa-solid fa-shop'></i> Products</font></NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item><font size='+1'><i class='fa-solid fa-truck'></i> Orders</font></NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/promocodelist'>
                                            <NavDropdown.Item><font size='+1'><i class='fa-solid fa-tag'></i> Promo Codes</font></NavDropdown.Item>
                                        </LinkContainer>

                                    </NavDropdown>                                
                                )}

                            </Nav>
                        </Navbar.Collapse>
                        <SearchBox/>
                    </Container>
                </Navbar>
            )}
        </header>
    )
}

export default Header


