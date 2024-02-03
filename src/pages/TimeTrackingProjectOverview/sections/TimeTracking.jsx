import React from 'react'
import Dashboard from "../components/Dashboard";
import TimeTrackingChart from '../components/TimeTrackingChart';

const TimeTracking = () => {
  return (
    <div className="my-14">
      <h1 className="font-bold text-center">Time Tracking</h1>
      <div className="section-container">
        <div className="section-line">
          <div>
            <Dashboard />
          </div>
          <div className=''>
            <div className='custom-gray w-2/3 ml-2 pl-2 py-4 px-7 *:flex *:justify-between'>
              <div className='custom-black'>
                <p>Total hours</p>
                <p>Average hours</p>
                <p>Focus hours</p>
              </div>
              <div>
                <p>32h 41min</p>
                <p>4h 40min</p>
                <p>17h 5min</p>
              </div>
            </div>
          </div>
          <TimeTrackingChart />     
        </div>
      </div>
    </div>
  )
}

export default TimeTracking