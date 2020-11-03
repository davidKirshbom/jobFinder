import React from 'react'

export default ({text,id,value,checked}) => {
    return (
        <div className="checkbox-container">
            <label className="checkbox-text" htmlFor={id}>
                <input  className="cheackbox" id={id} type="checkbox" value={value} defaultChecked={checked}/>
                <span htmlFor={id} className="checkmark"></span>
                {text||""}
            </label>
        </div>
    )
}