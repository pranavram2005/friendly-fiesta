import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './Components/Post';
import Categ from './Components/Categ';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Components/Layout';
import SubCategory from './Components/SubCateg';
import View from './Components/View';
import Admin from './Components/Admin';
import Projects from './Components/Projects';
function App() {
  const [Categories,SetCategories] = useState([])
  const [SubCategories,SetSubCategories] = useState([])
//category
    async function fetchcateg(){
        const response = await axios.get("https://chennaisunday.onrender.com/category/view_category");
        SetCategories(response.data);
        }
    useEffect(()=>{
        fetchcateg();
    },[]);
    async function delcateg(id){
      await axios.delete("https://chennaisunday.onrender.com/category/delete_category/"+id)
      fetchcateg();
    }
//sub category
    async function fetchsubcateg(){
      const response = await axios.get("https://chennaisunday.onrender.com/subcategory/view_subcategory");
      SetSubCategories(response.data);
      }
  useEffect(()=>{
      fetchsubcateg();
  },[]);
  async function delsubcateg(id){
    await axios.delete("https://chennaisunday.onrender.com/subcategory/delete_subcategory/"+id)
    fetchsubcateg();
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/projects' element={<Projects SubCategories={SubCategories} Categories={Categories}/>}/>
      <Route index element={<View SubCategories={SubCategories} Categories={Categories}/>} />
      <Route path='admin' element={<Admin/>} />      
        <Route path="/" element={<Layout/>}>
          <Route path="post" element={<Post Categories={Categories} SubCategories={SubCategories}/>} />
          <Route path="category" element={<Categ fetchcateg={fetchcateg} Categories={Categories} delcateg={delcateg}/>} />
          <Route path='subcategory' element={<SubCategory fetchsubcateg={fetchsubcateg} SubCategories={SubCategories} delsubcateg={delsubcateg}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
