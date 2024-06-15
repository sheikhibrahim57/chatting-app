import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
// import Parson from '../../recall/Parson/Parson';
import img1 from '../../assets/group.png'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
  const db = getDatabase();
  const data = useSelector(state => state.user.userInfo);
  console.log(data.displayName);
  const [userData, SetUserData] = useState([])
  const [frendRequestList, setFrendRequestList] = useState([])
  const [friendList, setFriendList] = useState([])
  useEffect(() => {
    const UserRef = ref(db, 'users/');
    onValue(UserRef, (snapshot) => {
      // console.log(snapshot.val(), 'snapshot');
      let arr = []
      snapshot.forEach((item) => {
        console.log(item.key, 'key');
        // arr.push(item.val());
        if (data.uid != item.key) {
          // arr.push(item.val());
          arr.push({ ...item.val(), userid: item.key });
        }
      })
      SetUserData(arr)
    });
  }, [])
  console.log(userData, 'userData');
  const handleFrindRequest = (item) => {
    console.log(item, 'paic');
    set(push(ref(db, 'FrindRequest/')), {
      sendername: data.displayName,
      senderid: data.uid,
      receivername: item.username,
      receiverid: item.userid
    });
  }

  useEffect(() => {
    const friendReqRef = ref(db, 'FrindRequest/');
    onValue(friendReqRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        // console.log(item.val());
        arr.push(item.val().receiverid + item.val().senderid);
      })
      setFrendRequestList(arr)
    });
  }, [])
  console.log(frendRequestList);

  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        // console.log(item.val());
        arr.push(item.val().receiverid + item.val().senderid);
      })
      setFriendList(arr)
    });
  }, [])

  return (
    <div className='p-[10px]'>
      <div className='p-[20px] rounded-[20px] border-[rgba(0, 0, 0, 0.25)] border-b-4'>
        <div className="title flex justify-between">
          <div><h3 className='text-xl'>User List</h3></div>
          <div className='text-xl'><BsThreeDotsVertical /></div>
        </div>
        <div className='mt-[20px] h-[400px] overflow-y-scroll'>
          {
            userData.map((item) => (
              <div className="clint flex mt-[17px] justify-between">
                <div>
                  <img className='' src={img1} alt="" />
                </div>
                <div className='ml-[14px] mr-[1px]'>
                  <h4 className='mt-[8px]'>{item.username}</h4>
                  <p>{item.email}</p>
                </div>
                <div>
                  {
                    friendList.includes(item.userid + data.uid) ||
                    friendList.includes(data.uid + item.userid)
                      ?
                      <button className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>friend</button>
                      :
                      <>
                        {
                          frendRequestList.includes(item.userid + data.uid) ||
                            frendRequestList.includes(data.uid + item.userid)
                            ?
                            <button className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>pending</button>
                            :
                            <button onClick={() => handleFrindRequest(item)} className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>+</button>
                        }
                      </>
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>


    </div>
  )
}

export default UserList