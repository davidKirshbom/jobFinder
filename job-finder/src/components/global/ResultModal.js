import React from 'react'

export default ({ isSuccess,show,setShow,...rest }) => {
console.log("🚀 ~ file: ResultModal.js ~ line 4 ~ isSuccess", isSuccess)
    
    return (
        <div className={`modal-bg ${show?'show':''}`}>
            <div {...rest} className='modal-content'>
            <i className="fas fa-times" onClick={()=>setShow(false)} ></i>
            {isSuccess?<i className="modal-icon far fa-check-circle"></i>:<i class="modal-icon far fa-times-circle"></i>}
                <div className='modal-text'>
                {isSuccess?'קורות החיים שלך הועברו לצוות הגיוס ב-Jobinfo':'הייתה שגיאה בשליחת הנתונים, אנא נסה מאוחר יותר.'}
                </div>
            </div>
        
        </div>
    )
}