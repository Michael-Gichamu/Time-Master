import React from 'react'
import Dashboard from "../components/Dashboard";
import TimeTracking from '../components/TimeTracking';
import Focus from '../components/Focus';
import { hourSpend } from '../../../constants';
import AppWebUsage from '../components/AppWebUsage';
import DistractionWebUsage from '../components/DistractionWebUsage';

const TimeTrackingOverview = () => {
  const cumulativeWeeklyFocusedHours = hourSpend.reduce((acc, item) => acc + item.focus, 0)
  const cumulativeWeeklyDistractedHours = hourSpend.reduce((acc, item) => acc + item.distraction, 0)
  const cumulativeWeeklyCollaborativeHours = hourSpend.reduce((acc, item) => acc + item.collaboration, 0)

  return (
    <div className="my-14">
      <h1 className="font-bold text-center">Time Tracking</h1>
      <div className="section-container">
        <div className="section-line">
          <div>
            <Dashboard />
          </div>
          <div className='py-4 pl-2 flex'>
            <TimeTracking />
            <Focus cumulativeWeeklyFocusedHours={cumulativeWeeklyFocusedHours} cumulativeWeeklyCollaborativeHours={cumulativeWeeklyCollaborativeHours} cumulativeWeeklyDistractedHours={cumulativeWeeklyDistractedHours}/>
          </div>
          <div className='pb-2 pl-2 flex'>
            <AppWebUsage />
            <DistractionWebUsage  className='absolute top-20'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTrackingOverview