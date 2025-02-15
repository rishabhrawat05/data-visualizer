import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Colors } from 'chart.js';
Chart.register(...registerables);
Chart.register(Colors);
const ChartPage = () => {
    const [chartData, setChartData] = useState([]);
    const [xAxisField, setXAxisField] = useState('');
    const [yAxisField, setYAxisField] = useState('');
    const [chartType, setChartType] = useState('bar');
    const [rowLimit, setRowLimit] = useState(100);
    const chartRef = useRef(null);
    const generateColors = (num) => {
        return Array.from({ length: num }, () =>
            `rgba(${Math.floor(Math.random() * 255)}, 
                  ${Math.floor(Math.random() * 255)}, 
                  ${Math.floor(Math.random() * 255)}, 
                  1)`
        );
    };
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('chartData'));
        setXAxisField(sessionStorage.getItem('xAxisField'));
        setYAxisField(sessionStorage.getItem('yAxisField'));
        setChartType(sessionStorage.getItem('chartType'));
        const limitedData = rowLimit === 0 ? data : data.slice(0, rowLimit);

        if (limitedData && limitedData.length > 0) {
            const dynamicColors = generateColors(limitedData.length);
            const xLabels = limitedData.map(item => item[xAxisField]);
            const yValues = limitedData.map(item => parseFloat(item[yAxisField]));
            setChartData({
                labels: xLabels,
                datasets: [
                    {
                        label: `${yAxisField} vs ${xAxisField}`,
                        data: yValues,
                        backgroundColor: dynamicColors,
                        borderColor: dynamicColors,
                        borderWidth: 1,
                    },

                ],
               
            });
        }
    }, [xAxisField, yAxisField,rowLimit]);

    useEffect(() => {
        if (chartData.labels && chartRef.current) {
            if (chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartRef.current.chartInstance = new Chart(ctx, {
                type: chartType,
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks:{
                                color: 'white'
                            }
                        },
                        x:{
                            ticks:{
                                color: 'white'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white',
                            }
                        },
                    }
                },
            });
        }
        return () => {
            if (chartRef.current && chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }
        };
    }, [chartData, chartType]);

    return (
        <div style={{height:'100vh', width:'100%', backgroundColor:'blue', color:'white', opacity:'0.9', margin:'0', padding:'0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
            <h1>Data Visualization</h1>
            <label style={{ fontSize: "18px", marginBottom: "10px" }}>
                Select number of rows:{" "}
                <select
                    value={rowLimit}
                    onChange={(e) => e.target.value === 0 ? setRowLimit(e.target.value) : setRowLimit(Number(e.target.value))}
                    style={{ padding: "5px", fontSize: "2vh", outline: "none", borderRadius: "50px" }}
                >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="0">All</option>
                </select>
                </label>
            <div style={{ width: '80%', height: '80%' }}>
                <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
            </div>
        </div>
    );
};

export default ChartPage;
