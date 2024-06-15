import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
// import Parson from '../../recall/Parson/Parson';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import img1 from '../../assets/group.png'

const Friends = () => {
  const db = getDatabase();
  const data = useSelector(state => state.user.userInfo);
  const [friendList, setFriendList] = useState([])
  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverid || item.val().senderid) {
          arr.push({ ...item.val(), id: item.key })
        }

      })
      setFriendList(arr)
    });
  }, [])


  const hendleBlock = (item) => {
    console.log(item, 'ertet');
    if (data.uid == item.senderid) {
      set(push(ref(db, 'block/')), {
        block: item.receivername,
        blockid: item.receiverid,
        blockby: item.sendername,
        blockbyid: item.senderid
      }).then(()=>{
        remove(ref(db, 'friend/' + item.id ))
      })
    } else {
      set(push(ref(db, 'block/')), {
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid,
      }).then(()=>{
        remove(ref(db, 'friend/' + item.id ))
      })
    }
  }

  return (
    <div className='p-[10px]'>
      <div className='p-[20px] rounded-[20px] border-[rgba(0, 0, 0, 0.25)] border-b-4'>
        <div className="title flex justify-between">
          <div><h3 className='text-xl'>Friends</h3></div>
          <div className='text-xl'><BsThreeDotsVertical /></div>
        </div>
        <div className='mt-[20px] h-[400px] overflow-y-scroll'>
          {
            friendList.map((item) => (
              <div className="clint flex mt-[17px] justify-between">
                <div>
                  <img className='' src={img1} alt="" />
                </div>
                <div className='ml-[14px] mr-[1px]'>
                  <h4 className='mt-[8px]'>
                    {
                      data.uid == item.senderid ? item.receivername : item.sendername
                    }
                  </h4>
                  <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                  <button onClick={() => hendleBlock(item)} className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>Block</button>
                </div>
              </div>
            ))
          }

        </div>
      </div>



    </div>
  )
}

export default Friends