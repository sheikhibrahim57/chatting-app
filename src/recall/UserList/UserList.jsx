import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import Parson from '../../recall/Parson/Parson';

const UserList = () => {
  return (
    <div className='p-[30px]'>
      <div className='p-[20px] rounded-[20px] border-[rgba(0, 0, 0, 0.25)] border-b-4'>
        <div className="title flex justify-between">
          <div><h3 className='text-xl'>UserList</h3></div>
          <div className='text-xl'><BsThreeDotsVertical /></div>
        </div>
        <div><Parson/></div>
      </div>

      <div className='p-[20px] rounded-[20px] border-[rgba(0, 0, 0, 0.25)] border-b-4'>
        <div className="title flex justify-between">
          <div><h3 className='text-xl'>Blocked Users</h3></div>
          <div className='text-xl'><BsThreeDotsVertical /></div>
        </div>
        <div><Parson/></div>
      </div>
    </div>
  )
}

export default UserList