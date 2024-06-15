import { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import img1 from '../../assets/group.png'


const BlockedUsers = () => {
    const db = getDatabase();
    const data = useSelector(state => state.user.userInfo);

    const [blockedUsers, setBlockedUsers] = useState([])
    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = [] 
            snapshot.forEach((item) => {
                console.log(item.val(), 'block');
                if (item.val().blockbyid == data.uid) {
                    arr.push({
                        id: item.key,
                        block: item.val().block,
                        blockid: item.val().blockid
                    })
                } else {
                    arr.push({
                        id: item.key,
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid
                    })
                }

            })
            
            setBlockedUsers(arr)
        });
    }, []);

    const hendelUnblock = (item)=>{
        console.log(item);
        set(push(ref(db, "friend/")),{
            sendername: item.block,
            senderid: item.blockid,
            receivername: data.displayName,
            receiverid: data.uid,
        }).then(() => {
            remove(ref(db, "block/" + item.id));
        });
    };

    return (
        <div className='p-[10px]'>
            <div className='p-[20px] rounded-[20px] border-[rgba(0, 0, 0, 0.25)] border-b-4'>
                <div className="title flex justify-between">
                    <div><h3 className='text-xl'>Blocked Users</h3></div>
                    <div className='text-xl'><BsThreeDotsVertical /></div>
                </div>

                <div className='mt-[20px] h-[400px] overflow-y-scroll'>
                    {
                        blockedUsers.map((item) => (
                            <div className="clint flex mt-[17px] justify-between">
                                <div>
                                    <img className='' src={img1} alt="" />
                                </div>
                                <div className='ml-[14px] mr-[1px]'>
                                    <h4 className='mt-[8px]'>{item.block}</h4>
                                    <h4 className='mt-[8px]'>{item.blockby}</h4>
                                    <p>Hi Guys, Wassup!</p>
                                </div>
                                <div>
                                    {
                                        item.blockid &&
                                        <button onClick={()=> hendelUnblock(item)} className='px-[22px] mt-[20px] rounded-md bg-[#5F35F5] text-white'>Unblock</button>
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

export default BlockedUsers