import axios from "axios"
import React,{ useEffect, useState } from "react";
import './static/Projects.css'

const Table = (props)=>{
    const Projects = props.Search.filter((item)=>{
        return item.category === props.category
    })
    return(
        <>
        {Projects.length>0?(<table>
            <tr>
                <th>S.no</th><th className="title">Title</th><th>Category</th><th>Sub Category</th><th>View</th>
            </tr>
            {Projects.map((project,index)=>(<tbody>
            <tr key={project._id}>
             <td className="sno">{index+1}</td>   
            <td className="b_title">{project.title}</td>
            <td>{project.category}</td>
            <td>{project.sub_category}</td>
            <td><a href={project.video}>View</a></td>
            </tr>
            </tbody>))}
        </table>):(null)}
        </>
    )
}

const Projects = (props)=>{
    const [Data,SetData] = useState([]);
    
    const [Search,SetSearch] = useState([]);
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
      }}
      const CatSearch = Search.map(data => data.category);
      const FilterCatSearch = props.Categories.filter((c) => CatSearch.includes(c.category));
      
     
      
        
    return(
        <>
        <h2>List of IEEE Projects (2024-2025)</h2>
        
        <div className="list">
          <div className="">  <label>Search:</label>
            <input type="text" className="search" onChange={ForSearch}/>
            </div>
        <ul>
           {FilterCatSearch.length>0?(FilterCatSearch.map((cat)=>(
                <div key={cat._id} className="categoru">
                    <h4 className="cats">{cat.category}</h4>
                    <Table Search={Search} category={cat.category}/>
                </div>))):(<>no data</>)}
        </ul></div>
        </>
    )
}
export default Projects;