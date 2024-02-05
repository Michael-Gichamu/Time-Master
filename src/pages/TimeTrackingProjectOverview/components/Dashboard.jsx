// Calendar.js
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // You can perform additional actions with the selected date if needed
  };
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  }

  return (
    <div className='md:flex justify-between items-center md:*:my-2 md:mx-4 md:mr-5'>
      <p className=''>Dashboard</p>
      <div className='flex justify-center items-center gap-2'>
        <div className="flex items-center custom-darkgray font-bold *:py-1 *:h-7 *:px-2 *:text-sm custom-darkgray rounded-md">
          <div className='hover:custom-lightblue hover:text-black rounded-l-md'>Month</div>
          <div className='hover:custom-lightblue hover:text-black'>Week</div>
          <div className='hover:custom-lightblue hover:text-black rounded-r-md'>Day</div>
        </div>
        <div className='flex justify-between items-center'>
          <button className='custom-black px-2 h-7 font-bold rounded-l-md border-darkgray border'>{'<'}</button>
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="eee, MMM d, yyyy"
                className='text-white text-center custom-black py-1 h-7 border-darkgray border-y w-36'           
              />
            </div>
          <button className='custom-black px-2 h-7 font-bold rounded-r-md border-darkgray border'>{'>'}</button>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <p>Activity Tracking</p>
        <button className='mt-1.5' onClick={handleToggle}>
          <FontAwesomeIcon icon={isToggled ? faToggleOn : faToggleOff} className="mx-2 text-xl text-[#9DCBEF]"/>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
