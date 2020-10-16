import React,{useEffect} from "react"
import SearchForm from './SearchForm'
export default () => {
    useEffect(() => {
        
        const newSearchTooogle = document.getElementsByClassName("new-search-open-form-toggle")[0];
        const form = document.getElementsByClassName("search-form-container")[0];
        newSearchTooogle.addEventListener("click", () => {
            if (form.classList.contains("open"))
            {
                form.classList.remove("open");
                newSearchTooogle.children[0].classList.remove("point-left")
            }
            else
            {
                form.classList.add("open");
                newSearchTooogle.children[0].classList.add("point-left");
            }
        })
    },[])
    return (<div id="search-page">
        <div className="page-content">
            <h1 className="page-title">חיפוש עבודה</h1>
           <SearchForm/>
    </div>
</div>)
}