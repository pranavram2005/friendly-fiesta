import { useEffect, useState } from "react"
import './static/Popup.css'
import axios from "axios";
const Card = (props)=>{
  const [Display,SetDisplay] = useState(false);
  const [EnquiryProject,SetEnquiryProject] = useState("");
  const [Submitted,SetSubmitted] = useState(true)
  const forminitialstate = {title:EnquiryProject,name:"",phone:"",email:"",occupation:"",city:""}
  const [EnquiryData,SetEnquiryData] = useState(forminitialstate);
  useEffect(() => {
    SetEnquiryData((EnquiryData) => ({
      ...EnquiryData,
      title: EnquiryProject,
    }));
  }, [EnquiryProject]);
  const [errors, setErrors] = useState({});
  const handleEnquirychange = (event) =>{
    SetEnquiryData({...EnquiryData,[event.target.name]:event.target.value})
  }
    
  const handleEnquirySubmit = async(event)=>{
    event.preventDefault();
    const validateForm = (data) => {
      const errors = {};

      if (!data.name.trim()) {
          errors.name = 'Name is required';
      }

      if (!data.email.trim()) {
          errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
          errors.email = 'Email is invalid';
      }
      if (!data.phone) {
          errors.phone = 'Phone Number is required';
      } else if (data.phone.length !== 10) {
          errors.phone = `Phone number should contain ten digits`;
      }
      if (!data.occupation.trim()) {
        errors.occupation = 'Occupation is required';
    }
    if (!data.city.trim()) {
      errors.city = 'City is required';
  }
      
      return errors;
  };  
  const newErrors = validateForm(EnquiryData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      await axios.post("https://chennaisunday-backend.onrender.com/enquiry/add",EnquiryData);
      SetEnquiryData(forminitialstate);
      SetSubmitted(false);
      setTimeout(() => {
        SetDisplay(false);
      }, 7000);
    
  } else {
      console.log(`Form submission failed
       due to validation errors.`);
  }     
    
  }
    return(<>  
        <div class="head">
              {props.pds.map((product) => (
        <div className="card main" key={product._id}>
          {props.toggledCard === product._id ? (
            <div className="content" width="100%">
            <div className="titles">
              <h4 className="card-title">{product.title}</h4>
            </div>
            <div className="card-body">{product.description}</div>
            <div
              className="card-footer"
              onClick={() => props.getabstract(`https://chennaisunday-backend.onrender.com/view/files/${product.file_upload}`, product.title)}
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
                        <h4 className="card-title" onClick={() => props.handleToggle(product._id)}>{product.title}</h4>
            </div>
          )}
          <div className="footer">
          <span class="badge rounded-pill bg-dark">{product.category}</span>
          <button
              className="btn"
              onClick={() => props.handleToggle(product._id)}
            >
              {props.toggledCard===product._id?"Hide Desriptions":"Show Descriptions"}
            </button>
            <span className="badge rounded-pill bg-dark text-warning" onClick={()=>{SetSubmitted(true);SetDisplay(true);SetEnquiryProject(product.title)}}>Enquiry</span>
        </div>
        {Display?<div className='Modal'>

<form className='modal-content animate' onSubmit={handleEnquirySubmit}>
<h3 className='text-center mt-2'>Project Enquiry</h3>
<span className='close' onClick={()=>{SetDisplay(false);setErrors({})}}>&times;</span>
  <div class="container">
  {Submitted?(<><div class="mb-3 mt-3">
<h4 className="enquiry">Project:<i className="project_name">{EnquiryProject}</i></h4>
</div>
<div class="mb-3 mt-3">
<label for="name" class="form-label">Name:</label>
<input type="text" class="form-control mb-1" id="name" value={EnquiryData.name} onChange={handleEnquirychange} placeholder="Enter your name" name="name"/>
{errors.name &&<span className="error-message">{errors.name}</span>}
</div><div class="mb-3 mt-3">
<label for="phone" class="form-label">Mobile No:</label>
<input type="text" class="form-control mb-1" id="phone" value={EnquiryData.phone} onChange={handleEnquirychange} placeholder="Enter your mobile number" name="phone"/>
{errors.phone &&<span className="error-message">{errors.phone}</span>}
</div><div class="mb-3 mt-3">
<label for="email" class="form-label">Email:</label>
<input type="email" class="form-control mb-1" id="email" value={EnquiryData.email} onChange={handleEnquirychange} placeholder="Enter email" name="email"/>
{errors.email &&<span className="error-message">{errors.email}</span>}
</div><div class="mb-3 mt-3">
<label for="occupation" class="form-label">Occupation:</label>
<input type="text" class="form-control mb-1" id="occupation" value={EnquiryData.occupation} onChange={handleEnquirychange} placeholder="Enter your Occupation (Collage Graduate, Institute, etc.)" name="occupation"/>
{errors.occupation &&<span className="error-message">{errors.occupation}</span>}
</div><div class="mb-3 mt-3">
<label for="city" class="form-label">Where are you from?:</label>
<input type="text" class="form-control mb-1" id="city" value={EnquiryData.city} onChange={handleEnquirychange} placeholder="Enter your City" name="city"/>
{errors.city &&<span className="error-message">{errors.city}</span>}
</div>

<button className='submit btn btn-success' type='submit'>Submit</button>
<button className='submit btn bg-danger text-light' type='button' onClick={()=>SetDisplay(false)}>Cancel</button>
</>):(<div className="container1">
  
  <img src="done.gif" className="tick" alt="tick"/>
  <h6 className="successfull">Submitted Successfully</h6></div>)}</div></form></div>:null}</div>
      ))}
</div></>

    )
}
export default Card
