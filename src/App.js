import Header from './components/Header.js'
import Footer from './components/Footer.js'
import ScrollToTop from './components/ScrollToTop.js'
import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import CartScreen from './screens/CartScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import AboutUsScreen from './screens/AboutUsScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import OrderScreen from './screens/OrderScreen.js'
import UserListScreen from './screens/UserListScreen.js'
import UserEditScreen from './screens/UserEditScreen.js'
import PromoCodeListScreen from './screens/PromoCodeListScreen.js'
import ProductListScreen from './screens/ProductListScreen.js'
import PromoCodeEditScreen from './screens/PromoCodeEditScreen.js'
import ProductEditScreen from './screens/ProductEditScreen.js'
import OrderListScreen from './screens/OrderListScreen.js'

import { Container } from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path='/' exact element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <HomeScreen />
                            </Container>
                        </main>
                    </>
                } />
                <Route path='/product/:id' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <ProductScreen />
                            </Container>
                        </main>
                    </>
                } />
                <Route path='/cart/:id?' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <CartScreen />
                            </Container>
                        </main>
                    </>
                } />
                <Route path='/login' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <LoginScreen />
                            </Container>
                        </main>
                    </>
                } />
                <Route path='/register' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <RegisterScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/profile' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <ProfileScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/about' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <AboutUsScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/shipping' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <ShippingScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/payment' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <PaymentScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/placeorder' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <PlaceOrderScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/order/:orderId' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <OrderScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/admin/userlist' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <UserListScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/admin/user/:id/edit' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <UserEditScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/admin/promocodelist' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <PromoCodeListScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/admin/productlist' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <ProductListScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/admin/product/:id/edit' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <ProductEditScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/admin/orders/promocodes/:id/edit' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <PromoCodeEditScreen />
                            </Container>
                        </main>
                    </>
                } />

                <Route path='/admin/orderlist' element={
                    <>
                        <main className='py-3'>
                            <Container>
                                <OrderListScreen />
                            </Container>
                        </main>
                    </>
                } />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
