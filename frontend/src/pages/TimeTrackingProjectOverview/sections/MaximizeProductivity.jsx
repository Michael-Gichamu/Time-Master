import React from 'react'
import Dashboard from '../components/Dashboard'
import { hourSpend } from '../../../constants';
import ProductivityGauge from '../components/ProductivityGauge'
// import FocusedHoursChart from '../components/FocusedHoursChart';
import FocusHeatMap from "./FocusHeatMap"

const MaximizeProductivity = () => {
  const cumulativeWeeklyFocusedHours = hourSpend.reduce((acc, item) => acc + item.focus, 0)
  const cumulativeWeeklyDistractedHours = hourSpend.reduce((acc, item) => acc + item.distraction, 0)
  const cumulativeWeeklyCollaborativeHours = hourSpend.reduce((acc, item) => acc + item.collaboration, 0)

  return (
    <div className="my-14">
      <h1 className="font-bold text-center">Maximize Productivity</h1>
      <div className="section-container">
        <div className="section-line">
          <Dashboard />
          <div className="md:flex justify-between gap-2 ml-2 pl-2 py-4 px-7 md:h-96">
            <div className="custom-gray basis-11/12 px-6 pt-4">
              <p className="font-bold">Focus Hours</p>
              <div className=" p-2 px-6 border border-white">
                <FocusHeatMap />
              </div>
            </div>
            <div className="custom-gray px-2 py-4 my-2 md:my-0">
              <p className="pb-4 font-bold text-center">Productivity Gauge</p>
              <div className="h-5/6 mx-auto">
                <ProductivityGauge cumulativeWeeklyFocusedHours={cumulativeWeeklyFocusedHours} cumulativeWeeklyCollaborativeHours={cumulativeWeeklyCollaborativeHours} cumulativeWeeklyDistractedHours={cumulativeWeeklyDistractedHours}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaximizeProductivity