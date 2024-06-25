import axios from "axios"
import React,{ useEffect, useState } from "react";
import './static/View.css'
import ViewLayout from "./ViewLayout";
const View = (props) =>{
    const [Data,SetData] = useState([])
    const [Filtercateg,Setfiltercateg] = useState("")
    const [Subforcat,SetSubforcat] = useState("")
    const [Activeid,SetActivid] = useState(null)
    async function fetchProduct(){
        const response = await axios.get("https://chennaisunday.onrender.com/view/view_product");
        SetData(response.data)
    }
    useEffect(()=>{
        fetchProduct()
    },[])

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
    const Projects = Data.filter(filtering)
    
    const subcatfilter = (data) =>{
            return data.category === Filtercateg
    }
    const reset =() =>{
        SetActivid(null)
        Setfiltercateg("")
        SetSubforcat("")
    }
    const Subcategories = props.SubCategories.filter(subcatfilter)

        // State to track which card is toggled
        const [toggledCard, setToggledCard] = useState(null);
      
        // Function to handle the toggle
        const handleToggle = (id) => {
          if (toggledCard === id) {
            setToggledCard(null); // Reset if the same card is clicked again
          } else {
            setToggledCard(id); // Set the toggled card ID
          }

        };
    return(
        <>
                 <div><ViewLayout/></div>

         <div className="Apps">
            <div className="heading"><h1>IEEE Projects</h1></div>
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
              <div class="head">
              {Projects.map((product) => (
        <div className="card main" key={product._id}>
          {toggledCard === product._id ? (
            <div className="content" width="100%">
            <div className="titles">
              <h4 className="card-title">{product.title}</h4>
            </div>
            <div className="card-body">{product.description}</div>
            <div
              className="card-footer"
              onClick={() => getabstract(`https://chennaisunday.onrender.com/view/files/${product.file_upload}`, product.title)}
            >
              Abstract
            </div>
            
          </div>
          ) : (
            <div className="video">
              <iframe
                width="100%"
                height="200px"
                src={product.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
                        <h4 className="card-title" onClick={() => handleToggle(product._id)}>{product.title}</h4>
            </div>
          )}
          <div className="footer">
          <span class="badge rounded-pill bg-dark">{product.category}</span>
          <button
              className="btn"
              onClick={() => handleToggle(product._id)}
            >
              {toggledCard===product._id?"Hide Desriptions":"Show Descriptions"}
            </button>
        </div></div>
      ))}
</div></div>
            
            
            
            
            
            
            
            
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