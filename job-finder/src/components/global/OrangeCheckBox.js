import React,{useState,useEffect} from 'react'

export default ({ text, id, value, checked, onChange }) => {


    // const [isChecked, setIsChecked] = useState(!!checked)
    // const handleCheck = () => {
    //     onChange(!isChecked)
    //     setIsChecked(!isChecked)
        
    // }
    // useEffect(() => {console.log(checked,isChecked, id)}
        
        // , [isChecked])
    return (
        <div className="checkbox-container">
            <label className="checkbox-text" htmlFor={id}>
                <input onClick={(e) =>onChange? onChange(e.target.checked,value):''} name='isChecked' className="cheackbox" value={value} id={id} type="checkbox" checked={checked} />
                <span htmlFor={id} className="checkmark"></span>
                {text||""}
            </label>
        </div>
    )
}