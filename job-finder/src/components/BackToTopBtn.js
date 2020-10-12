import React from 'react'

export default (props) => {
    return (
        <a href={`${props.headerSelector}`} className="back-to-top mobile-only">
        <i class="fas fa-chevron-up"></i>
        </a>
    )
}