import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import Parson from '../../recall/Parson/Parson';
import img1 from '../../assets/group.png'
const GroupList = () => {

  const [show, setShow] = useState(false)
  const hendelGroup = () => {
    setShow(!show);
  };
  return (
    <div className='p-[10px]'>
      <div className='p-[20px] rounded-[20px] border-[rgba(0, 0, 0, 0.25)] border-b-4'>
        <div className="title flex justify-between">
          <div><h3 className='text-xl'>Groups List</h3></div>
          {
            show ? (
              <button onClick={hendelGroup} className='text-white bg-black p-3 rounded-lg'>Go Back</button>
            )
              :
              (
                <button onClick={hendelGroup} className='bg-[#5F35F5] text-white p-3 rounded-lg'>Create Group</button>
              )
          }

        </div>

        <div className='mt-[20px] h-[400px] overflow-y-scroll'>
          {
            show ? (
              <div>
                <p className='text-4xl'>Crate Your Group</p>
                <input type="text" placeholder='Input Your Group Name' className='text-[#03014C] my-2 text-[20px] font-semibold font-open p-[16px] w-96 border-[1px] rounded-md border-[#03014C] border-opacity-30 outline-none ' />
                <input type="email" placeholder='Input Your Mail' className='text-[#03014C] text-[20px] font-semibold font-open p-[16px] w-96 border-[1px] rounded-md border-[#03014C] border-opacity-30 outline-none ' />
                <button className='w-96 bg-[#000] text-white rounded-md p-[16px] mt-2 hover:bg-red-900'>Crate now</button>
              </div>
            )
              :
              (
                <div className="clint flex border-b-2 py-[12px] my-[12px] justify-between">
                  <div>
                    <img className='' src={img1} alt="" />
                  </div>
                  <div className='ml-[14px] mr-[1px]'>
                    <h4 className='mt-[8px]'>Friends Reunion</h4>
                    <p>Hi Guys, Wassup!</p>
                  </div>
                  <div>
                    <button className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>Join</button>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    </div>

  )
}

export default GroupList