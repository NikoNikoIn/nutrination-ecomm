import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { useNavigate, useParams } from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'


function ProductEditScreen() {

    const { id } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        } else {

            if (!product.name || product._id !== Number(id)) {
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock) 
                setDescription(product.description)        
            }

        }

    }, [product, id, navigate, dispatch, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form style={{ maxWidth: '600px', margin: '0 auto' }} onSubmit={submitHandler}>

                        <Form.Group controlId='name' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                        </Form.Group>

                        <Form.Group controlId='price' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' step='0.01' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                        </Form.Group>

                        <Form.Group controlId='image' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter image' value={image} onChange={(e) => setImage(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />

                            <Form.Control
                                type='file'
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                                controlId='file'
                            >

                            </Form.Control>
                            {uploading && <Loader/>}

                        </Form.Group>

                        <Form.Group controlId='brand' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                        </Form.Group>

                        <Form.Group controlId='countInStock' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                        </Form.Group>

                        <Form.Group controlId='category' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem' }} />
                        </Form.Group>

                        <Form.Group controlId='description' style={{ marginBottom: '1.5rem' }}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} style={{ fontSize: '1.5rem', padding: '1rem'}} />
                        </Form.Group>

                        <Button type='submit' variant='primary' style={{ fontSize: '1.5rem', padding: '1rem 2rem', borderRadius: '4px', display: 'block', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>Update</Button>
                    </Form>
                )}
            </FormContainer>
            
        </div>
    )
}

export default ProductEditScreen
