import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'


function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = (goToPage) => {
        if (isAdmin) {
            const url = `/admin/productlist/?keyword=${keyword}&page=${encodeURIComponent(goToPage)}`
            navigate(url)
        } else {
            const url = `/?keyword=${keyword}&page=${encodeURIComponent(goToPage)}`
            navigate(url)
        }

    }

    const getCurrentPage = () => {
        const searchParams = new URLSearchParams(location.search)
        const currentPage = parseInt(searchParams.get('page'))
        return currentPage || 1
    }

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
     
                    <Pagination.Item key={x + 1} active={getCurrentPage() == x + 1} style={{marginRight:'5px'}} onClick={() => handleClick(x + 1)}>{x + 1}</Pagination.Item>

                ))}
            </Pagination>
        )
    )
}

export default Paginate