
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../../recall/Sidebar/Sidebar';
import GroupList from '../../recall/GroupList/GroupList';
import Friends from '../../recall/Friends/Friends';
import UserList from '../../recall/UserList/UserList';
import { userLoginInfo } from '../../slice/userSlice';
import BlockedUsers from '../../recall/BlockedUsers/BlockedUsers';
import MyGroups from '../../recall/MyGroups/MyGroups';
import FriendRequest from '../../recall/FriendRequest/FriendRequest';


const Home = () => {
  const auth = getAuth();
  const data = useSelector((state) => state.user.userInfo);
  const dispach = useDispatch();
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false)
  console.log(data);

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true)
      dispach(userLoginInfo(user));
      localStorage.setItem('userInfo', JSON.stringify(user))
    }
  });

  useEffect(() => {
    if (!data) {
      navigate('/login')
    }
  })

  return (
    <div>
      {
        verify ?
          <div className='flex p-[32px]'>
            <div className='w-2/12'>
              <Sidebar />
            </div>
            <div className='w-4/12'>
              <GroupList />
              <FriendRequest />
            </div>
            <div className='w-3/12'>
              <Friends />
              <MyGroups />
            </div>
            <div className='w-3/12'>
              <UserList />
              <BlockedUsers />
            </div>
          </div>
          :
          <>
            <div className='h-screen w-full bg-primary text-white'>
              <p className='font-nunito text-5xl mb-[20px]'>please verify your email</p>
              <button><Link to='/login'>Back to login</Link></button>
            </div>
          </>
      }
    </div>
  )
}

export default Home