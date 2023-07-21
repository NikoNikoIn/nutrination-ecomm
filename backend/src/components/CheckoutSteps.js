import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <div className='d-flex justify-content-between mb-4'>
            <div className={step1 ? 'font-weight-bold' : 'text-muted'}>
                {step1 ? (
                    <LinkContainer to='/login' style={{ color: 'rgb(235, 64, 52)' }}>
                        <Nav.Link
                            style={{ color: 'rgb(235, 64, 52)'}}
                            onMouseOver={(e) => (e.target.style.color = 'rgb(232, 165, 160)')}
                            onMouseLeave={(e) => (e.target.style.color = 'rgb(235, 64, 52)' )}
                        >
                            Login
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Login</Nav.Link>
                )}
            </div>

            <div>
                {step2 ? <i class='fa-solid fa-arrow-up-long fa-rotate-90'></i> : null}
            </div>

            <div className={step2 ? 'font-weight-bold' : 'text-muted'}>
                {step2 ? (
                    <LinkContainer to='/shipping' style={{ color: 'rgb(235, 64, 52)' }}>
                        <Nav.Link
                            style={{ color: 'rgb(235, 64, 52)'}}
                            onMouseOver={(e) => (e.target.style.color = 'rgb(232, 165, 160)')}
                            onMouseLeave={(e) => (e.target.style.color = 'rgb(235, 64, 52)' )}
                        >
                            Shipping
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </div>

            <div>
                {step3 ? <i class='fa-solid fa-arrow-up-long fa-rotate-90'></i> : null}
            </div>

            <div className={step3 ? 'font-weight-bold' : 'text-muted'}>
                {step3 ? (
                    <LinkContainer to='/payment' style={{ color: 'rgb(235, 64, 52)' }}>
                        <Nav.Link
                            style={{ color: 'rgb(235, 64, 52)'}}
                            onMouseOver={(e) => (e.target.style.color = 'rgb(232, 165, 160)')}
                            onMouseLeave={(e) => (e.target.style.color = 'rgb(235, 64, 52)' )}
                        >
                            Payment
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </div>

            <div>
                {step4 ? <i class='fa-solid fa-arrow-up-long fa-rotate-90'></i> : null}
            </div>

            <div className={step4 ? 'font-weight-bold' : 'text-muted'}>
                {step4 ? (
                    <LinkContainer to='/placeorder' style={{ color: 'rgb(235, 64, 52)' }}>
                        <Nav.Link
                            style={{ color: 'rgb(235, 64, 52)'}}
                            onMouseOver={(e) => (e.target.style.color = 'rgb(232, 165, 160)')}
                            onMouseLeave={(e) => (e.target.style.color = 'rgb(235, 64, 52)' )}
                        >
                            Place Order
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </div>
        </div>
    )
}

export default CheckoutSteps