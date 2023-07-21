import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
            
        }
    }

    return (
        <Form onSubmit={submitHandler} inline style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-2'
                style={{
                    padding: '0.5rem',
                    borderRadius: '4px',
                    width: '300px'
                }}
            />

            <Button type='submit' variant='primary' className='p-2' style={{
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem',
                marginLeft: '0.5rem',
                width: '3rem', 
                height: '3rem',
            }}>
                <i className='fas fa-search'></i>
            </Button>
        </Form>
    )
}

export default SearchBox
