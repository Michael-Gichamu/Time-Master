import React from 'react'
import FocusDistractionChart from '../components/FocusDistractionChart';

const Focus = ({ cumulativeWeeklyFocusedHours, cumulativeWeeklyDistractedHours, cumulativeWeeklyCollaborativeHours }) => {
  const convertDecimalToTime = (decimalValue) => {
    const hours = Math.floor(decimalValue);
    const minutes = Math.round((decimalValue - hours) * 60);
    return `${hours}h ${minutes}min`;
  }
  
  return (
    <div className='custom-gray w-5/12 ml-4 mr-7 py-2.5 pb-4 h-3/4 *:mt-2 relative'>
      <p className='ml-4'>Focus</p>
      <div className='ml-6 flex items-center justify-between gap-1'>
        <div className='w-5/12'>
          <FocusDistractionChart cumulativeWeeklyFocusedHours={cumulativeWeeklyFocusedHours} cumulativeWeeklyDistractedHours={cumulativeWeeklyDistractedHours} cumulativeWeeklyCollaborativeHours={cumulativeWeeklyCollaborativeHours}/>
        </div>
        <div className='pl-2 mt-8 mr-5 text-xs *:py-1 w-11/12'>
          <div className='flex items-center'>
            <div className='p-1.5 w-2.5 bg-[#4880C7] mx-2'></div>
            <div className='min-w-40 flex justify-between'>
              <p>Focus</p>
              <p>{convertDecimalToTime(cumulativeWeeklyFocusedHours)}</p>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='p-1.5 w-2.5 bg-[#D34C46] mx-2'></div>
            <div className='min-w-40 flex justify-between'>
              <p>Distractions</p>
              <p>{convertDecimalToTime(cumulativeWeeklyDistractedHours)}</p>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='p-1.5 w-2.5 bg-[#CC9F46] mx-2'></div>
            <div className='min-w-40 flex justify-between'>
              <p>Collaboration</p>
              <p>{convertDecimalToTime(cumulativeWeeklyCollaborativeHours)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Focus