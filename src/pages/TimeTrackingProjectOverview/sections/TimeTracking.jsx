import React from 'react'
import Dashboard from "../components/Dashboard";
import TimeTrackingChart from '../components/TimeTrackingChart';
import { hourSpend } from '../../../constants';
import FocusDistractionChart from '../components/FocusDistractionChart';

const TimeTracking = () => {
  const convertDecimalToTime = (decimalValue) => {
    const hours = Math.floor(decimalValue);
    const minutes = Math.round((decimalValue - hours) * 60);
    return `${hours}h ${minutes}min`;
  }

  const workedHours = hourSpend.map((item) => {
    return item.workedHours
  })

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
            <div className='custom-gray w-7/12 ml-2 py-4 px-6 *:flex *:justify-between'>
              <div>
                <p>Total hours</p>
                <p>Average hours</p>
                <p>Focus hours</p>
              </div>
              <div>
                <p>32h 41min</p>
                <p>4h 40min</p>
                <p>17h 5min</p>
              </div>
              <div className='px-2 py-2'>
                <TimeTrackingChart data={workedHours}/> 
              </div> 
            </div>
            <div className='custom-gray w-5/12 ml-4  mr-7 *:mt-2'>
              <p className='ml-4'>Focus</p>
              <div className=' h-1/2 ml-8 flex items-center justify-between gap-1'>
                <div className='w-5/12'>
                  <FocusDistractionChart cumulativeWeeklyFocusedHours={cumulativeWeeklyFocusedHours} cumulativeWeeklyDistractedHours={cumulativeWeeklyDistractedHours} cumulativeWeeklyCollaborativeHours={cumulativeWeeklyCollaborativeHours}/>
                </div>
                <div className='px-2 mt-8 mr-5 text-xs *:py-1'>
                  <div className='flex items-center'>
                    <div className='p-1.5 w-2.5 bg-[#4880C7] mx-2'></div>
                    <p>Focus  {convertDecimalToTime(cumulativeWeeklyFocusedHours)}</p>
                  </div>
                  <div className='flex items-center'>
                    <div className='p-1.5 w-2.5 bg-[#D34C46] mx-2'></div>
                    <p>Distractions {convertDecimalToTime(cumulativeWeeklyDistractedHours)}</p>
                  </div>
                  <div className='flex items-center'>
                    <div className='p-1.5 w-2.5 bg-[#CC9F46] mx-2'></div>
                    <p>Collaboration {convertDecimalToTime(cumulativeWeeklyCollaborativeHours)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default TimeTracking