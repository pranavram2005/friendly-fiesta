import axios from "axios"
import React,{ useEffect, useState } from "react";
import './static/View.css'
import ViewLayout from "./ViewLayout";
import { useMemo } from 'react';
import Card from "./Card";
const View = (props) =>{
    const [Data,SetData] = useState([])
    const [Filtercateg,Setfiltercateg] = useState("")
    const [Subforcat,SetSubforcat] = useState("")
    const [Activeid,SetActivid] = useState(null)
    const [Search,SetSearch] = useState([]);
    const [Pages,SetPages] = useState(1)

    async function fetchProduct(){
        const response = await axios.get("https://chennaisunday-backend.onrender.com/view/view_product");
        SetData(response.data)
        SetSearch(response.data)
    }
    useEffect(()=>{
        fetchProduct()
    },[])
    const ForSearch=(e)=>{
      if (e.length===0){
        SetSearch(Data);
      }
      else{  
      SetSearch(Data.filter(f=>Object.values(f.title).join('').toLowerCase().includes(e.target.value.toLowerCase())));
    SetPages(1)
    }}
    const getabstract = (urls,titles) =>{
        fetch(urls).then((response)=>{
            response.blob().then((blob)=>{
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = titles + " abstract";
                alink.click();
            })
        })
    }
    const changecateg =async (categ,id)=>{
      SetPages(1)
        SetActivid(id)
        SetSubforcat("")
        Setfiltercateg(categ)
    }
    const changesubcat = (subcateg) =>{
        SetSubforcat(subcateg)
    }
    const filtering = (product) =>{
        return Filtercateg === "" ? 
    product.category.length > 0 : 
    (Subforcat === "" ? product.category === Filtercateg : product.sub_category === Subforcat);
    }

    const Projects = Search.filter(filtering)
    
    const subcatfilter = (data) =>{
            return data.category === Filtercateg
    }
    const reset =() =>{
        SetActivid(null)
        Setfiltercateg("")
        SetSubforcat("")
    }
    const Subcategories = props.SubCategories.filter(subcatfilter)

        const [toggledCard, setToggledCard] = useState(null);
      
        const handleToggle = (id) => {
          if (toggledCard === id) {
            setToggledCard(null); 
          } else {
            setToggledCard(id); 
          }

        };

        var arrayOfArrays = [];

        for (var i=0; i<Projects.length; i+=8) {
            arrayOfArrays.push(Projects.slice(i,i+8));
          }
          let total = [];
const count = arrayOfArrays.length
  for (let j=0; j<count ;j++){
    total.push(j+1)
  }
      
 const prev =()=>{
  SetPages(Pages-1)
 }
 const next =()=>{
  if (Pages===arrayOfArrays.length){
    SetPages(arrayOfArrays.length)
  }
  SetPages(Pages+1)
 }
 const Changebutton =(p,id)=>{
  SetPages(p)
 }
 const total2 = total.slice(1,total.length-1)
 const Web_Devs = Search.sort(function(a, b){return a.rank - b.rank})
    return(
        <>
                 <div><ViewLayout/></div>

         <div className="Apps">
            <div className="heading"><h1>IEEE Projects (2024-2025){total2}
            </h1>
            <div className="search_div">
   <input type="text" onChange={ForSearch} className="search_main" placeholder="SEARCH"/>
   </div>  
            </div>
            
            <div>
      <ul className="nav nav-justified">
        <li className="nav-item">
          <button className="nav-link" onClick={reset}>All</button>
        </li>
        {props.Categories.map((cat) => (
          <li className="nav-item" key={cat._id}>
            <button
              className="nav-link dropdown-toggle"
              type="button"  data-bs-toggle="dropdown"
              onClick={() => changecateg(cat.category, cat._id)}
            >
              {cat.category}
            </button>
            <ul className="dropdown-menu">
              {Subcategories.map((subcat) => (
                <li key={subcat._id}>
                  <button className="dropdown-item" onClick={() => changesubcat(subcat.subcategory, subcat._id)}>
                    {subcat.subcategory}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
     
    {arrayOfArrays.length>0?(<div className="contents">{arrayOfArrays && arrayOfArrays.map((pds, index) => (
          <div key={index}>{index+1===Pages?(<Card pds={pds} toggledCard={toggledCard} getabstract={getabstract} handleToggle={handleToggle} Search={Search}/>):null}</div>
        ))}</div>):(<p>no data</p>)}
        {arrayOfArrays.length===0||arrayOfArrays.length===1?null:<div className='buttons'>
        {Pages===1?null:(<button className="btn dir" onClick={prev}>«Prev</button>)}
        <button className={`button ${Pages===1?"page":""} active`} onClick={()=>Changebutton(1)}>1</button>
        {Pages===1||Pages===2||Pages===3?(null):<>...</>}
          {total2.map((p,index)=>(<button onClick={()=>Changebutton(p,index)} className={`button ${Pages===p?"page":""} ${Pages===p+1||Pages===p||Pages===p-1?"active":"disappear"}`} >{p}</button>))}
         {Pages===arrayOfArrays.length||Pages===arrayOfArrays.length-1||Pages===arrayOfArrays.length-2?null:<>...</>}
         <button className={`button ${Pages===total.length?"page":""} active`} onClick={()=>Changebutton(total.length)}>{total.length}</button>

          {Pages===arrayOfArrays.length?null:<button className="btn dir" onClick={next}>Next»</button>}
           </div>}
</div>

      
            
            
            
            
            
            
            
            
            {/* // Data.map((product)=>(
            //     <tr key={product._id}>
            //     <td>{product.title}</td>
            //     <td>{product.category}</td>
            //     <td>{product.sub_category}</td>
            //     <td>{product.description}</td>
                
            //     {product.file_type==="image/jpeg"?(<td><img src={`http://localhost:5000/view/files/${product.file_upload}`} alt={product.file_upload}/></td>):(<td><button onClick={()=>getabstract(`http://localhost:5000/view/files/${product.file_upload}`,product.title)}>Abstract</button></td>)}
            //     <td>{product.video}</td>                
            //     </tr>
            // ))} */}
        </>
    )
}

export default View;