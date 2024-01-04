import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function Forgotpassword() {
    const auth = getAuth();
    const [email ,setEmail] = useState('');
    const [emaileorr ,setemaileorr] = useState('');
    const hendleEmail = (e) =>{
        setEmail(e.target.value);
        setemaileorr('');

    }
    const hendleforgotpassword = () =>{
        if(!email){
            setemaileorr('not email');
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
                setemaileorr('Email is invalid')
            }
        }
        if (email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))){
            sendPasswordResetEmail(auth, email)
            .then(() => {
            console.log('ok right');
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
        }

    }
  return (
    <div className='h-screen w-full bg-primary flex justify-center items-center'>
        <div className='bg-white p-[100px]'>
            <h1 className=' font-nun text-4xl font-bold'>Forgotpassword</h1>
            <div  className='relative mt-[60px]'>
                    <input type="email" onChange={hendleEmail} value={email} placeholder='Enter your Email' className='text-[#03014C] text-[20px] font-semibold font-open py-[26px] w-96 border-b-[1.72px] border-b-[#03014C] border-opacity-30 outline-none ' />
                    <p className='absolute top-[0px] left-[0px] font-nun font-semibold text-[14px] text-[#11175D] tracking-[1px]'>Email Address</p>

                    {
                    emaileorr &&
                    <p className='bg-red-500 text-white w-96 text-center'>{emaileorr}</p>

                    }
                
                </div>
                <div className='mt-[20px]'>
                    <button onClick={hendleforgotpassword} className='cursor-pointer py-[15px] px-[19px] rounded bg-primary font-nun font-semibold text-[20px] text-white '>Submit</button>   
                    <Link to='/login' className='ml-[20px] cursor-pointer py-[15px] px-[19px] rounded bg-primary font-nun font-semibold text-[20px] text-white '>Back to home</Link>   
                </div> 
        </div>
    </div>
  )
}

export default Forgotpassword