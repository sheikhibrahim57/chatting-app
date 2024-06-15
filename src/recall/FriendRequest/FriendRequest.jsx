import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
// import Parson from '../../recall/Parson/Parson';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import img1 from '../../assets/group.png'


const FriendRequest = () => {
    const db = getDatabase();
    const data = useSelector(state => state.user.userInfo);

    const [friendRequestList, setFriendRequestList] = useState([])
    useEffect(() => {
        const friendrequestRef = ref(db, 'FrindRequest/');
        onValue(friendrequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                // console.log(item.val(), 'frind list' );
                if (item.val().receiverid == data.uid ) {
                    arr.push({...item.val(), id: item.key})  
                }
                
            })
            setFriendRequestList(arr)
        });
    }, [])

    const hendelaccept = (item)=>{
        console.log(item, 'item');
        set(push(ref(db, 'friend/')),{
            ...item
        }).then(()=>{
            remove(ref(db, 'FrindRequest/' + item.id))
        })
         
    }

    return (
        <div className='p-[10px]'>
            <div className='p-[20px] rounded-[20px] border-[rgba(0, 0, 0, 0.25)] border-b-4'>
                <div className="title flex justify-between">
                    <div><h3 className='text-xl'>Friend Request</h3></div>
                    <div className='text-xl'><BsThreeDotsVertical /></div>
                </div>

                <div className='mt-[20px] h-[400px] overflow-y-scroll'>
                    {
                        friendRequestList.map((item) => (
                            <div className="clint flex mt-[17px] justify-between">
                                <div>
                                    <img className='' src={img1} alt="" />
                                </div>
                                <div className='ml-[14px] mr-[1px]'>
                                    <h4 className='mt-[8px]'>{item.sendername}</h4>
                                    <p>Hi Guys, Wassup!</p>
                                </div>
                                <div>
                                    <button onClick={()=> hendelaccept(item)} className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>Accept</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* <div><Parson /></div> */}
            </div>

        </div>
    )
}

export default FriendRequest