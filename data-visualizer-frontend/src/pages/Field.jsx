import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Field = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState([]);
    const [xAxisField, setXAxisField] = useState('');
    const [yAxisField, setYAxisField] = useState('');
    const [chartType, setChartType] = useState('bar');

    
    useEffect(() => {
       
        const data = JSON.parse(sessionStorage.getItem('chartData'));
        if (data && data.length > 0) {
            setFields(Object.entries(data[0])); 
        }
        
    }, []);
    const handleFieldSelection = () => {
        if (xAxisField && yAxisField) {

            sessionStorage.setItem('xAxisField', xAxisField);
            sessionStorage.setItem('yAxisField', yAxisField);
            sessionStorage.setItem('chartType', chartType);

            navigate("/visualize");
        } else {
            alert('Please select both X-axis and Y-axis fields.');
        }
    };

    return (
        <div style={{height:'100vh', width:'100%', backgroundColor:'navy', color:'white', opacity:'0.9', margin:'0', padding:'0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
            <h1 style={{fontSize:'7vh'}}>Select Fields and Chart Type</h1>
            <div style={{display:'flex', gap:'3%', width:'30%', marginLeft:'5%'}}>
                <label style={{fontSize:'5vh'}}>X-axis Field:</label>
                <select onChange={(e) => setXAxisField(e.target.value)} value={xAxisField} style={{padding:'0px 10px', fontSize:'3vh', borderRadius:'50px', outline:'none', backgroundColor:'black', color:'white', border:'none'}}>
                    <option value="">Select X-axis</option>
                    {fields.map((field) => (
                        isNaN(field[1]) && (
                        <option key={field[0]} value={field[0]}>
                            {field[0]}
                        </option>
                        )
                    ))}
                </select>
            </div>
            <div style={{display:'flex', gap:'3%', width:'30%', marginLeft:'5%'}}>
                <label style={{fontSize:'5vh'}}>Y-axis Field:</label>
                <select onChange={(e) => setYAxisField(e.target.value)} value={yAxisField} style={{padding:'0px 10px', fontSize:'3vh', borderRadius:'50px', outline:'none', backgroundColor:'black', color:'white', border:'none'}}>
                    <option value="">Select Y-axis</option>
                    {fields.map((field) => (
                        !isNaN(field[1]) && (
                            <option key={field[0]} value={field[0]}>
                                {field[0]}
                            </option>
                        )
                    ))}
                </select>
            </div>
            <div style={{display:'flex', gap:'3%', width:'30%' , marginLeft:'10%'}}>
                <label style={{fontSize:'5vh'}}>Chart Type:</label>
                <select onChange={(e) => setChartType(e.target.value)} value={chartType} style={{padding:'0px 15px', fontSize:'3vh', borderRadius:'50px', outline:'none', backgroundColor:'black', color:'white', border:'none'}}>
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                    <option value="pie">Pie</option>
                </select>
            </div>
            <button onClick={handleFieldSelection} style={{padding:'10px 20px', fontSize:'3vh', backgroundColor:'black', outline:'none', border:'none', color:'white', borderRadius:'50px', boxShadow:'2px 2px 2px white'}}>Proceed to Chart</button>
        </div>
    );
};

export default Field;
