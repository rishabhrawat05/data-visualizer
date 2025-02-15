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
        <div style={styles.container}>
            <h1 style={styles.heading}>Select Fields and Chart Type</h1>

            <div style={styles.fieldContainer}>
                <label style={styles.label}>X-axis Field:</label>
                <select
                    onChange={(e) => setXAxisField(e.target.value)}
                    value={xAxisField}
                    style={styles.select}
                >
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

            <div style={styles.fieldContainer}>
                <label style={styles.label}>Y-axis Field:</label>
                <select
                    onChange={(e) => setYAxisField(e.target.value)}
                    value={yAxisField}
                    style={styles.select}
                >
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

            <div style={styles.fieldContainer}>
                <label style={styles.label}>Chart Type:</label>
                <select
                    onChange={(e) => setChartType(e.target.value)}
                    value={chartType}
                    style={styles.select}
                >
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                    <option value="pie">Pie</option>
                </select>
            </div>

            <button onClick={handleFieldSelection} style={styles.button}>
                Proceed to Chart
            </button>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100%',
        backgroundColor: 'blue',
        color: 'white',
        opacity: '0.9',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5vh',
    },
    heading: {
        fontSize: '6vh',
        textAlign: 'center',
        marginBottom: '2vh',
    },
    fieldContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        gap: '10px',
    },
    label: {
        fontSize: '4vh',
        whiteSpace: 'nowrap',
    },
    select: {
        padding: '8px 15px',
        fontSize: '2.5vh',
        borderRadius: '50px',
        outline: 'none',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        width: '60%',
    },
    button: {
        padding: '12px 25px',
        fontSize: '3vh',
        backgroundColor: 'black',
        outline: 'none',
        border: 'none',
        color: 'white',
        borderRadius: '50px',
        boxShadow: '2px 2px 5px white',
        cursor: 'pointer',
    }
};

export default Field;
