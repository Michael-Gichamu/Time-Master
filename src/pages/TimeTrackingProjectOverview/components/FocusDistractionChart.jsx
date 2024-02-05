import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const FocusDistractionChart = ( { cumulativeWeeklyFocusedHours, cumulativeWeeklyDistractedHours, cumulativeWeeklyCollaborativeHours }) => {
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

  const cumulativeWeeklyHourSpend = cumulativeWeeklyFocusedHours + cumulativeWeeklyDistractedHours + cumulativeWeeklyCollaborativeHours;
  if (cumulativeWeeklyHourSpend <= 0) {
    return null;
  }
  console.log((cumulativeWeeklyFocusedHours))
  const doughnutData = {
    // labels: ["Focus", "Distractions", "Collaboration"],
    datasets: [
      {
        data: [cumulativeWeeklyFocusedHours, cumulativeWeeklyDistractedHours, cumulativeWeeklyCollaborativeHours],
        backgroundColor: ["#4880C7", "#D34C46", "#CC9F46"],
        borderColor: "transparent",
        // spacing: 1,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "75%", // Adjust the size of the doughnut hole,
    radius: '100%',
  }

  const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.restore();
         const fontSize = windowSize.width >= 768 ? '1em' : '0.5em';
         ctx.font = `800 ${fontSize} Arial`;
         ctx.fillStyle = 'white'
         ctx.textBaseline = "top";
         var text = `${((cumulativeWeeklyFocusedHours / cumulativeWeeklyHourSpend) * 100).toFixed(1)}%`,
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 2.1;
         ctx.fillText(text, textX, textY);
         ctx.font = `500 ${fontSize} Arial`;
         var text1 = 'Focus',
         textX1 = Math.round((width - ctx.measureText(text1).width) / 2),
         textY1 = height / 1.7;
         ctx.fillText(text1, textX1, textY1);
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

export default FocusDistractionChart