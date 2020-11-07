import React from 'react'

export default ({userArea,...rest}) => {
    return (
        <select {...rest} id="arear-selection" className="area-select">
                            <option selected={userArea?userArea==='Tel_Aviv':""} value="Tel_Aviv">תל אביב-יפו</option>
                            <option selected={userArea?userArea==='south':""} value="south">אזור הדרום</option>
                            <option selected={userArea?userArea==='Tel_Aviv':""} value="Tel-Aviv,">אזור המרכז</option>
                            <option selected={userArea?userArea==='north':""} value="north">אזור הצפון</option>
                            <option selected={userArea?userArea==='hasharon':""} value="hasharon">אזור צפון השרון</option>
                            <option selected={userArea?userArea==='europe,USA,':""} value="europe,USA,">חוץ לארץ</option>
                            <option selected={userArea?userArea==='europe':""} value="europe">Europe</option>
                            <option selected={userArea?userArea==='far east':""} value="far east">Far East</option>
                            <option selected={userArea?userArea==='USA':""} value="USA">United States</option>
                            <option selected={!userArea} value="all_areas">כל האזורים</option>
                        </select>)
}