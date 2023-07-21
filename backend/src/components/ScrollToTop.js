import React, { useState, useEffect } from 'react'

const ScrollToTop = () => {
    const [showArrow, setShowArrow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowArrow(window.scrollY > window.innerHeight / 8)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleUpArrowClick = () => {
        if (window.scrollY !== 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div
            className={`arrow ${showArrow ? 'show' : ''}`}
            onClick={handleUpArrowClick}
            role='button'
            aria-label='Scroll to top'
            tabIndex={0}
        >
            <i class='fa-solid fa-arrow-up fa-2xl' style={{color: '#e6e6e6'}}></i>
        </div>
    )
}

export default ScrollToTop