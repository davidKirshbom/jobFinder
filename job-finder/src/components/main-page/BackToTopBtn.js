import React from 'react'

export default (props) => {
    return (
        <a href={`${props.headerSelector}`} className="back-to-top mobile-only">
        <i className="fas fa-chevron-up"></i>
        </a>
    )
}