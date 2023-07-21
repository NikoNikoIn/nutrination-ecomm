import React, {useEffect} from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ProductListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const keyword = searchParams.get('keyword') || ''
    const page = searchParams.get('page') || 1

    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})

        if (!userInfo.isAdmin) {
            navigate(-1)
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword, page))
        }
    }, [dispatch, userInfo, successDelete, navigate, successCreate, createdProduct, keyword, page])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fa-solid fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            
            { loading 
                ? <Loader /> 
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive style={{ tableLayout: 'fixed', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '16%' }}>ID</th>
                                    <th style={{ width: '16%' }}>NAME</th>
                                    <th style={{ width: '16%' }}>PRICE</th>
                                    <th style={{ width: '16%' }}>CATEGORY</th>
                                    <th style={{ width: '16%' }}>BRAND</th>
                                    <th style={{ width: '10%' }}></th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td style={{ width: '16%' }}>{product._id}</td>
                                        <td style={{ width: '16%' }}>{product.name}</td>
                                        <td style={{ width: '16%' }}>${product.price}</td>
                                        <td style={{ width: '16%' }}>{product.category}</td>
                                        <td style={{ width: '16%' }}>{product.brand}</td>
                                        <td style={{ width: '10%' }}>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i class='fa-solid fa-pen-to-square'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i class='fa-solid fa-trash'></i>
                                            </Button>
                                        </td>
 
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
            <Paginate page={page} pages={pages} keyword={keyword} isAdmin={true}/>
        </div>
    )
}

export default ProductListScreen
