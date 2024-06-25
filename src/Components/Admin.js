import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Admin = ()=>{
    const [Code,Setcode] = useState("");
    const handleCode =(event)=>{
        Setcode(event.target.value)
    }
    const navigate = useNavigate()
    return(
        <>
        <form onSubmit={(event)=>{
            event.preventDefault();
            if (Code === "123456789"){
                navigate('/post');
            }else{
                alert("invalid code")
            }
            }
        }>
            <div>
                <label>Code</label>
                <input type="text" name="code" onChange={handleCode} value={Code}/>
                <button type="submit">Submit</button>
            </div>
        </form>
        </>
    )
}
export default Admin;