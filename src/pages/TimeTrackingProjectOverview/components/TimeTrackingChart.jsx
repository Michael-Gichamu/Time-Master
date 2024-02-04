import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, BarElement, BarController, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { addDays, format, toDate } from 'date-fns';

const TimeTrackingChart = ({ data }) => {
  ChartJS.register(LinearScale, BarElement, BarController, Tooltip, Legend, CategoryScale);

  const today = new Date();
  const labels = Array.from({ length: 7 }, (_, index) => toDate(addDays(today, index)));

  const linearGradientColor = (context) => {
    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
    gradient.addColorStop(0, 'rgba(77, 109, 139, 1)'); // Opaque at the top
    gradient.addColorStop(1, 'rgba(77, 109, 139, 0.02)'); // Transparent at the bottom
    return gradient;
  };

  const chartData = {
    labels: labels.map((date) => format(date, 'EEE d MMM')), // Format the date as needed
    datasets: [
      {
        label: 'Worked Hours',
        backgroundColor: linearGradientColor,
        borderColor: 'rgba(77, 109, 139, 1)',
        borderRadius: 5,
        borderWidth: 1,
        hoverBackgroundColor: linearGradientColor,
        hoverBorderColor: 'rgba(77, 109, 139, 1)',
        data: data,
      },
    ],
  };

  const chartOptions = {
  scales: {
    y: {
      type: 'linear',
      beginAtZero: true,
      
      ticks: {
        stepSize: 2,
        min: 0,
        max: 12,
        callback: (value) => value.toString(),
      },
    },
    x: {
      type: 'category',
      
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      mode: 'nearest',
    },
  },
};


  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current;
    const context = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (window.myBarChart) {
      window.myBarChart.destroy();
    }

    // Create a new chart
    window.myBarChart = new ChartJS(context, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (window.myBarChart) {
        window.myBarChart.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default TimeTrackingChart;
