import React, { useRef, useEffect , useState } from 'react';
import Chart from 'chart.js/auto';
 const data = {
  labels: [],
  datasets: [
    {
      label: 'Jobs',
      data: [],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 2,
    },
  ],
};
const LineChart = (chartData) => {
    useEffect(() => {
    chartData.chartData.map((item)=>{
                data.labels.push(item.Year);
                data.datasets[0].data.push(item.Number_of_total_jobs);
            });
       }, [chartData]);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: data,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return <canvas className="mt-10" ref={chartRef} />;
};

export default LineChart;
