import axios from "axios"
import React,{ useEffect, useState } from "react";
import './static/Projects.css'

const ViewAdmin = ()=>{
    const [Data,SetData] = useState([]);
    const [Edit,SetEdit] = useState(null);
    const [newRank,SetnewRank] = useState(null)
    const [Search,SetSearch] = useState([]);
    async function fetchProduct(){
        const response = await axios.get("http://localhost:5000/view/view_product");
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
      
    const Projects = Search.sort(function(a, b){return a.rank - b.rank})
    async function delprouct(id, filename) {
      try {
          await axios.delete(`http://localhost:5000/product/delete/file/${filename}`);
          await axios.delete("http://localhost:5000/product/delete/id/"+id);
          alert("Deleted Successfully");
          fetchProduct();
      } catch (error) {
          console.error("There was an error deleting the product:", error);
          alert("Failed to delete the product.");
      }
  }
  const handleRankSubmit = async(id)=>{
    try{
    axios.put("http://localhost:5000/product/update/rank/"+id, { newRank })
    SetEdit(null);
    alert("changed")
    
    }catch(err){
      console.error('There was an error updating the item!', err);
    }
    fetchProduct()
  }
 
    return(
        <>
        <h2>List of IEEE Projects (2024-2025)</h2>
        
        <div className="list">
          <div className="">  <label>Search:</label>
            <input type="text" className="search" onChange={ForSearch}/>
            </div>
        <ul>
           
        </ul></div>
        {Projects.length>0?(<table className="t1">
            <tr>
                <th>Rank</th><th className="title">Title</th><th>Category</th><th>Sub Category</th><th>View</th><th>Delete</th><th>Edit Rank</th>
            </tr>
            {Projects.map((project,index)=>(<tbody>
            <tr key={project._id}>
            <td>#{project.rank}</td>
            <td className="b_title">{project.title}</td>
            <td>{project.category}</td>
            <td>{project.sub_category}</td>
            <td><a href={project.video}>View</a></td>
            <td><button type='button' onClick={()=>{delprouct(project._id,project.file_upload)}}>Delete</button></td>
            <td>{Edit!==project._id?<button onClick={()=>{SetEdit(project._id)}}>Edit rank</button>:<><input className="rank" type="number" onChange={(e)=>{SetnewRank(e.target.value)}} value={newRank}/><button type='submit' onClick={()=>{handleRankSubmit(project._id)}}>+</button><button onClick={()=>SetEdit(null)}>x</button></>}</td>
            </tr>
            </tbody>))}
        </table>):(null)}
        {newRank }
        </>
    )
}
export default ViewAdmin;