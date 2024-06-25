import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SubCateg = (props)=>{
    const [SubCategory,SetSubCategory] = useState({category:"",subcategory:""})
    const handleSubCategoryinput = (event)=>{
        SetSubCategory({...SubCategory,[event.target.name]:event.target.value})
    }
    const navigate = useNavigate();

    return(

        <><div class="mb-3 mt-3">
            <form onSubmit={ async(event)=> {
                try{
                if (!SubCategory.subcategory) return;
                    event.preventDefault();
                    await axios.post("https://chennaisunday.onrender.com/subcategory/add_subcategory",SubCategory)
                    SetSubCategory({category:"",subcategory:""})
                    props.fetchsubcateg()
                    navigate('/');
                }catch(err){
                        alert("Sub Category already exists")
                    }
                }}>
               <label for="category" className="form-label">Category:</label>                
                <input type='text' name='category' value={SubCategory.category} onChange={handleSubCategoryinput}/>
                <label for="subcategory" className="form-label">Sub Category:</label>                
                <input type='text' name='subcategory' value={SubCategory.subcategory} onChange={handleSubCategoryinput}/>
                <button type='submit'>Add</button></form>
                </div>
                <div>
                    <table>
                        <tr><th>Category</th><th>Sub Category</th><th>Delete</th></tr>
                {props.SubCategories.length?(props.SubCategories.map((subcategory) => (
                <tr key={subcategory._id}><td>{subcategory.category}</td><td>{subcategory.subcategory}</td>
                <td><button type='button' onClick={()=>(props.delsubcateg(subcategory._id))}>Delete</button></td>
                </tr>
                ))):(<tr>no category</tr>)}</table>
                </div>
            </>
)
}

export default SubCateg;