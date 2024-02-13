import TimeTrackingChart from '../components/TimeTrackingChart';
import { hourSpend } from '../../../constants';

const TimeTracking = () => {
  const workedHours = hourSpend.map((item) => {
    return item.workedHours
  })
  
  return (
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
  )
}

export default TimeTracking