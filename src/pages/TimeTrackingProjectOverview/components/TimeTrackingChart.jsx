import React from 'react';
import { Bar } from 'react-chartjs-2';
import { format, addDays } from 'date-fns';

const TimeTrackingChart = ({ data }) => {
  const today = new Date();
  const labels = Array.from({ length: 7 }, (_, index) => addDays(today, index));

  const chartData = {
    labels: labels.map((date) => format(date, 'EEE d MMM')), // Format the date as needed
    datasets: [
      {
        label: 'Worked Hours',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Days',
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default TimeTrackingChart;