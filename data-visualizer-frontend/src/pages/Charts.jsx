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
    const chartRef = useRef(null);
    
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('chartData'));
        setXAxisField(sessionStorage.getItem('xAxisField'));
        setYAxisField(sessionStorage.getItem('yAxisField'));
        setChartType(sessionStorage.getItem('chartType'));

        if (data && data.length > 0) {
            const xLabels = data.map(item => item[xAxisField]);
            const yValues = data.map(item => parseFloat(item[yAxisField]));
            setChartData({
                labels: xLabels,
                datasets: [
                    {
                        label: `${yAxisField} vs ${xAxisField}`,
                        data: yValues,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },

                ],
               
            });
        }
    }, [xAxisField, yAxisField]);

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
        <div style={{height:'100vh', width:'100%', backgroundColor:'navy', color:'white', opacity:'0.9', margin:'0', padding:'0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
            <h1>Data Visualization</h1>
            <div style={{ width: '80%', height: '80%' }}>
                <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
            </div>
        </div>
    );
};

export default ChartPage;
