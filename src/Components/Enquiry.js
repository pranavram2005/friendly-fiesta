import { useEffect, useState } from "react";
import axios from 'axios';
import { parseISO, format } from 'date-fns';

const Enquiry = () =>{
    const [Data,SetData] = useState([]);
    const fetchdata = async()=>{
        const response = await axios.get("https://chennaisunday-backend.onrender.com/enquiry/view");
        SetData(response.data);
    } 
    useEffect(()=>{
        fetchdata()
    },[])
    const deleteenquiry = async(id)=>{
        await axios.delete("https://chennaisunday-backend.onrender.com/enquiry/delete/"+id);
        alert("Delete Successfully");
        fetchdata()
    }
    
    return(<>
    <h2 className="enquiry1">Enquiry</h2>
    {Data.length>0?(<table className="enquiry_table">
       <tr><th>S.no</th><th>Title</th><th>Name</th><th>Phone</th><th>Occupation</th><th>City</th><th>Time</th><th>Date</th><th>Delete</th></tr>
       <tbody>{Data.map((enq,index)=>(
        <tr key={enq._id}>
            <td>{index+1}</td>
            <td>{enq.title}</td>
            <td className="enq_name">{enq.name}</td>
            <td>{enq.phone}</td>
            <td>{enq.occupation}</td>
            <td>{enq.city}</td>
            <td><Time date={enq.createdAt}/></td>
            <td><Date date={enq.createdAt}/></td>
            <td><button onClick={()=>deleteenquiry(enq._id)} className="btn text-light btn-sm bg-danger">Delete</button></td>
        </tr>
       ))}</tbody>
       </table>):<p className="text-center bg-success">No Data</p>}
        </>)
}


const Date = (props)=>{
    const utcDate = parseISO(props.date);
    const date = format(utcDate, "dd-MM-yyyy");
    return(
        <>{date}</>
    )
}
const Time = (props)=>{
    const utcDate = parseISO(props.date);
    const time = format(utcDate, "hh:mm a")
    return(
        <>{time}</>
    )
}
export default Enquiry;