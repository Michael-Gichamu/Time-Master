import React from 'react'

const DistractionWebUsage = () => {
  return (
    <div className='custom-gray w-5/12 py-4 px-6 ml-4  mr-7 '>
      <h3>Top Distractions</h3>
      <div className='flex justify-between items-center py-2'>
        <p className='w-1/5'>bbc.com</p>
        <p>2h 18min</p>
        <div className="group relative bg-[#3D3F40] mt-3 w-1/3 h-1 rounded-md flex items-center bottom-1.5">
          <div className="bg-[#8261F4] h-1 rounded-md"
            style={{ width: '50%' }}>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <p>twitter.com</p>
        <p>1h 27min</p>
        <div className="group relative bg-[#3D3F40] mt-3 w-1/3 h-1 rounded-md flex items-center bottom-1.5">
          <div className="bg-[#8261F4] h-1 rounded-md"
            style={{ width: '50%' }}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DistractionWebUsage