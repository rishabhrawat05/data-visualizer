import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Input = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVisualize = async () => {
        if (!file) {
            alert("Please choose a .csv file");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post('https://data-visualizer-backend-1sre.onrender.com/api/upload/csv', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log("File uploaded successfully!");
            const data = response.data;
            sessionStorage.setItem('chartData', JSON.stringify(data));
            navigate("/fields");
        } catch (error) {
            console.error("Error uploading file: ", error);
            alert("Error uploading file. Please choose a valid .csv file.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="App" style={{
            backgroundColor: 'blue',
            height: '100vh',
            width:'100%',
            overflow: 'hidden',
            opacity: '0.9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <h1 style={{ color: 'white', fontSize: '4.5em', textAlign: 'center' }}>DATA VISUALIZER</h1>

            {!loading ? (
                <>
                    <input type='file' accept=".csv" placeholder="Enter data set in .csv format"
                        style={{
                            color: 'white',
                            borderRadius: '50px',
                            marginLeft: '150px',
                            border: 'none',
                            outline: 'none',
                            fontSize: '1.5em',
                           
                        }}
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button style={{
                        border: 'none',
                        padding: '10px 20px',
                        fontSize: '2em',
                        borderRadius: '50px',
                        color: 'white',
                        boxShadow: '2px 2px 2px white',
                        backgroundColor: 'black',
                        cursor: 'pointer',
                        marginTop: '5vh',
                        outline: 'none',
                    }}
                        onClick={handleVisualize}
                        disabled={loading}
                    >
                        Visualize
                    </button>
                </>
            ) : (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '3%',
                }}>
                    <div className="loader"></div>
                </div>
            )}
            <style>
                {`
                .loader {
                    border: 8px solid #f3f3f3;
                    border-top: 8px solid #3498db;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

export default Input;
