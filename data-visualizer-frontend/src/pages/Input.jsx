import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Input = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const handleVisualize = async () => {
      const formData = new FormData();
      formData.append("file", file);
      try{
        const response = await axios.post('http://localhost:8080/api/upload/csv', formData, {
          headers: { 'Content-Type':'multipart/form-data' },
        });
        console.log("File uploaded successfully!");
        const data = response.data;
        sessionStorage.setItem('chartData', JSON.stringify(data));
        navigate("/fields");
        
      }
      catch(error){
        console.error("Error uploading file: ", error);
        alert("Please choose a .csv file");
      }
      
    }
    return (
      <div className="App" style={{
        backgroundColor:'navy', 
        height:'100vh',
        opacity:'0.9',
        display: 'flex', 
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',}}>
        <h1 style={{color:'white', fontSize:'15vh'}}>DATA VISUALIZER</h1>
  
        <input type='file' accept=".csv" placeholder="Enter data set in .csv format" 
        style={{
        color:'white',
        borderRadius:'50px', 
        marginLeft:'150px',
        border:'none',
        outline:'none', 
        fontSize:'3vh',}}
        required 
        onChange={(e) => setFile(e.target.files[0])}
        />
        
        <button style={{
          border:'none',
          padding:'10px 20px',
          fontSize:'5vh',
          borderRadius:'50px',
          color:'white',
          boxShadow:'2px 2px 2px white',
          backgroundColor:'black',
          cursor:'pointer',
          marginTop:'3%',
          outline:'none',
          
        }}
        onClick={handleVisualize}
        >Visualize</button>
      </div>
    );
}

export default Input;