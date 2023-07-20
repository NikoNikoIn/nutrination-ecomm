import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useNavigate, useLocation } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'


function HomeScreen() {

    const navigate = useNavigate
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, pages} = productList

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const keyword = searchParams.get('keyword') || ''
    const page = searchParams.get('page') || 1

    useEffect(() => {
        dispatch(listProducts(keyword, page))
    }, [dispatch, keyword, page])

    
    return (
        <div className='body'>
            {!keyword && <ProductCarousel/>}
            {!keyword ? (<h1>Latest Products</h1>) : (<h1>Search Results on '{keyword}'</h1>)}
            <Paginate page={page} pages={pages} keyword={keyword}/>
            {loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </div>
            }
            <Paginate page={page} pages={pages} keyword={keyword}/>

        </div>
    )
}
export default HomeScreen