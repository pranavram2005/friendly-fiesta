import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Categ = (props)=>{
    const [Category,SetCategory] = useState({category:""})
    const handleCategoryinput = (event)=>{
        SetCategory({...Category,[event.target.name]:event.target.value})
    }
    const navigate = useNavigate();

    return(

        <><div class="mb-3 mt-3">
            <form onSubmit={ async(event)=> {
                try{
                if (!Category.category) return;
                    event.preventDefault();
                    await axios.post("https://chennaisunday.onrender.com/category/add_category",Category)
                    SetCategory({category:""})
                    props.fetchcateg()
                    navigate('/');
                }catch(err){
                        alert("Data already exists")
                    }
                }}>
               <label for="category" className="form-label">Category:</label>                
                <input type='text' name='category' value={Category.category} onChange={handleCategoryinput}/>
                <button type='submit'>Add</button></form>
                </div>
                <div>
                    <table>
                        <tr><th>Category</th><th>Delete</th></tr>
                {props.Categories.length?(props.Categories.map((category) => (
                <tr key={category._id}><td>{category.category}</td>
                <td><button type='button' onClick={()=>(props.delcateg(category._id))}>Delete</button></td>
                </tr>
                ))):(<tr>no category</tr>)}</table>
                </div>
            </>
)
}

export default Categ;