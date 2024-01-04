import React from 'react'
import img1 from '../../assets/group.png'

const Parson = () => {
  return (
    <div>
        <div className="clint flex mt-[17px] justify-between">
        <div>
        <img className='' src={img1} alt="" />
        </div>
        <div className='ml-[14px] mr-[51px]'>
          <h4 className='mt-[8px]'>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div>
          <button className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>Join</button>
        </div>
      </div>

      <div className="clint flex border-y-2 py-[12px] my-[12px] justify-between">
        <div>
        <img className='' src={img1} alt="" />
        </div>
        <div className='ml-[14px] mr-[51px]'>
          <h4 className='mt-[8px]'>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div>
          <button className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>Join</button>
        </div>
      </div>

      <div className="clint flex justify-between">
        <div>
        <img className='' src={img1} alt="" />
        </div>
        <div className='ml-[14px] mr-[51px]'>
          <h4 className='mt-[8px]'>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div>
          <button className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>Join</button>
        </div>
      </div>
    </div>
  )
}

export default Parson