import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Charts = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    console.log(data);
    const visualizeData = (data) => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = data.data.map((item) => Object.values(item)[2]);
        const values = data.data.map((item) => parseFloat(Object.values(item)[1]));

        const ctx = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Sales`,
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: { 
                    legend: { 
                        labels: { 
                            color: 'white',
                        } 
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { 
                            color:'white'
                        }
                    },
                    x: {
                        ticks: { 
                            color:'white'
                        }
                    }
                },
            },
        });
    };

    useEffect(() => {
        if (data) {
            visualizeData(data);
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div
            style={{
                backgroundColor: 'navy',
                height: '100vh',
                opacity: '0.9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}
        >
            <h1 style={{ color: 'white', fontSize: '10vh' }}>VISUALIZED DATA</h1>
            <div style={{ width: '80%', height: '60%' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default Charts;
