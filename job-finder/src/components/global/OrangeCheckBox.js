import React from 'react'

export default ({text,id}) => {
    return (
        <div className="checkbox-container">
            <label className="checkbox-text" htmlFor={id}>
                <input className="cheackbox" id={id} type="checkbox" />
                <span htmlFor={id} className="checkmark"></span>
                {text||""}
            </label>
        </div>
    )
}