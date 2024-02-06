import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AppWebUsage = () => {
  return (
    <div className='custom-gray w-7/12 ml-2 py-4 px-6'>
      <h3 className='pb-2'>Apps & websites</h3>
      <div className='text-xs py-2 flex justify-between'>
        <div className='flex justify-between items-center w-7/12'>
          <div className='min-w-40 flex justify-between'>
            <p>Code</p>
            <p>8h 33min</p>
          </div>
          <div className="group relative custom-blue mt-3 w-1/3 h-1 rounded-md flex items-center bottom-1.5">
            <div className="custom-green h-1 rounded-md"
              style={{ width: '50%' }}>
            </div>
          </div>
        </div>
        <div className='w-5/12 flex justify-between ml-6'>
          <p>Code</p>
          <div className='flex gap-2 items-center'>
            <FontAwesomeIcon icon={ faAngleDown } />
            <div className='bg-[#4880C7] p-1.5 w-2 rounded-full'></div>
          </div>
        </div>
      </div>
      <div className='text-xs py-2 flex justify-between'>
        <div className='flex justify-between items-center w-7/12'>
          <div className='min-w-40 flex justify-between'>
            <p>localhost</p>
            <p>4h 54min</p>
          </div>
          <div className="group relative custom-blue mt-3 w-1/3 h-1 rounded-md flex items-center bottom-1.5">
            <div className="custom-green h-1 rounded-md"
              style={{ width: '50%' }}>
            </div>
          </div>
        </div>
        <div className='w-5/12 flex justify-between ml-6'>
          <p>Code</p>
          <div className='flex gap-2 items-center'>
            <FontAwesomeIcon icon={ faAngleDown } />
            <div className='bg-[#4880C7] p-1.5 w-2 rounded-full'></div>
          </div>
        </div>
      </div>
      <div className='text-xs py-2 flex justify-between'>
        <div className='flex justify-between items-center w-7/12'>
          <div className='min-w-40 flex justify-between'>
            <p>Code</p>
            <p>8h 33min</p>
          </div>
          <div className="group relative custom-blue mt-3 w-1/3 h-1 rounded-md flex items-center bottom-1.5">
            <div className="custom-green h-1 rounded-md"
              style={{ width: '50%' }}>
            </div>
          </div>
        </div>
        <div className='w-5/12 flex justify-between ml-6'>
          <p>Code</p>
          <div className='flex gap-2 items-center'>
            <FontAwesomeIcon icon={ faAngleDown } />
            <div className='bg-[#4880C7] p-1.5 w-2 rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppWebUsage