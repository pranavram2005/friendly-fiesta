import { useState } from 'react'
import './static/Post.css'
import axios from 'axios';

const Post = (props) =>{
    const [Subcategs,SetSubcategs] = useState([props.SubCategories])
    const [Product,SetProduct] = useState({title:"",category:"",subcategory:"",description:"",fileupload:"",video:""})
    const handleInputChange =(event)=>{
      if (event.target.name === "category"){
        SetSubcategs(props.SubCategories.filter((data)=>data.category === event.target.value))
      }
        SetProduct({...Product,[event.target.name]:event.target.value})
      };
      const handlephotoChange = (event)=>{
        SetProduct({...Product,fileupload: event.target.files[0]})
      }
    const handleFormSubmit = async(event)=>{
        event.preventDefault();
        const prod = new FormData()
        prod.append('title', Product.title)
        prod.append('category', Product.category)
        prod.append('subcategory', Product.subcategory)
        prod.append('description', Product.description)
        prod.append('fileupload', Product.fileupload)
        prod.append('video', Product.video)

        await axios.post('https://chennaisunday.onrender.com/product/add',prod);
        SetProduct({title:"",category:"",subcategory:"",description:"",fileupload:"",video:""})
        alert("Data submitted successfully")
      }  
    
    return(
        <>
        <div className="form">
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className='grid mb-2'><div>
               <label for="title" className="form-label" >Title:</label>
                <input type="text" name="title" placeholder="Project Title" className="form-control" value={Product.title} onChange={handleInputChange}/>
                </div>
                <div>
               <label for="fileupload" className="form-label">Files:</label>
                <input type="file" name="fileupload" placeholder="Project files" className="form-control" onChange={handlephotoChange} />
                </div>
                <div>
                <label for="category" className="form-label">Category:</label>
                <select name="category" className='form-control' value={Product.category} onChange={handleInputChange}>
                <option>----Please Select a category----</option>
                {props.Categories.map((category) => (
                <option key={category._id} value={category.category}>{category.category}</option>
                ))}
                </select>
                </div>
                <div>
               <label for="subcategory" className="form-label">Sub-category:</label>
               <select name="subcategory" className='form-control' value={Product.subcategory} onChange={handleInputChange}>
               <option>----Please Select a sub-category----</option>
                {Subcategs.map((subcategory) => (
                <option key={subcategory._id} value={subcategory.subcategory}>{subcategory.subcategory}</option>
                ))}
                </select>
                </div>
                <div>
               <label for="description" className="form-label">Description:</label>
                <textarea name="description" placeholder="description" className="form-control" value={Product.description} onChange={handleInputChange}/>
                </div>
                
                <div>
               <label for="video" className="form-label">Video:</label>
                <input type="text" name="video" placeholder="Project video" className="form-control" onChange={handleInputChange}/>
                </div></div>
                <button type='submit'>SUBMIT</button>
                </form>
        </div>
        </>
    )
}
export default Post;