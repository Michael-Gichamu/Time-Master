import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ( { cumulativeCompletionStatus }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);
  // console.log(cumulativeCompletionStatus + 'from doughnut chart')
  if (cumulativeCompletionStatus <= 0) {
    return null;
  }

  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [cumulativeCompletionStatus, 100 - cumulativeCompletionStatus],
        backgroundColor: ["#97C43B", "#1E6575"],
        borderColor: "#1E6575",
      },
    ],
  };

  const doughnutOptions = {
    cutout: "80%", // Adjust the size of the doughnut hole,
    radius: '80%',
    layout: {
      padding: {
        top: 20,
        left: 10,
        right: 10,
      },
    },

  }

  const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.restore();
         const fontSize = windowSize.width >= 768 ? '2em' : '1em';
         ctx.font = `800 ${fontSize} Arial`;
         ctx.fillStyle = 'rgb(151,196,59)'
         ctx.textBaseline = "top";
         var text = `${cumulativeCompletionStatus}%`,
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 1.85;
         ctx.fillText(text, textX, textY);
         ctx.save();
    }
  }]

  return (
    <Doughnut
      key={windowSize.width}
      data={doughnutData}
      options={doughnutOptions}
      plugins={plugins}
    />
  );
}

export default DoughnutChart