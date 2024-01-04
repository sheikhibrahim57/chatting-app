import React, { useState } from 'react'
import registration from '../../assets/registration.svg'
import { PiEyeClosedDuotone } from 'react-icons/pi';
import { PiEyeDuotone } from 'react-icons/pi';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const auth = getAuth();
  const navigate =useNavigate();
  const [email ,setEmail] = useState('');
  const hendleEmail = (e) =>{
    setEmail(e.target.value);
    setemaileorr('');

  }

  const [fullName ,setfullName] = useState('');
  const hendlefullName = (e) =>{
    setfullName(e.target.value);
    setfullNameeorr('');
  }

  const [password ,setpassword] = useState('');
  const hendlepassword = (e) =>{
    setpassword(e.target.value);
    setpasswordeorr('');
  }

  const [emaileorr ,setemaileorr] = useState('');
  const [fullNameeorr ,setfullNameeorr] = useState('');
  const [passwordeorr ,setpasswordeorr] = useState('');
  const [showpassword ,setshowpassword] = useState('');
  const [success ,setSuccess] = useState('');

  const hendlesubmit = () =>{
   
    if(!email){
        setemaileorr('not email');
    }else{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
            setemaileorr('Email is invalid')
        }
    }


    if(!fullName){
        setfullNameeorr('not name');
    }
    if(!password){
        setpasswordeorr('not password');
    }
    else if(!/(?=.*[a-z])/.test(password)){
        setpasswordeorr('small string')
    }
    else if(!/(?=.*[A-Z])/.test(password)){
        setpasswordeorr('Upper string')
    }
    else if(!/(?=.*[0-9])/.test(password)){
        setpasswordeorr('Number')
    }
    else if(!/(?=.*[!@#$%^&*])/.test(password)){
        setpasswordeorr('special character')
    }
    else if(!/(?=.{8,10})/.test(password)){
        setpasswordeorr('8 character or Length')
    }
   
    if (email && fullName && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) ) {
        createUserWithEmailAndPassword(auth, email, password)

        .then((user) => {   
            updateProfile(auth.currentUser, {
                displayName: fullName,
                photoURL: "./src/assets/profile.png"
              }).then(() =>{
                sendEmailVerification(auth.currentUser)
                console.log(user, 'user');
                toast.success('Registration success Please verify your account');
                setEmail('');
                setfullName('');
                setpassword('');
                setemaileorr('');
                setTimeout(()=>{
                navigate('/login')
                    },4000)
            })
            }).catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode.includes('auth/email-already-in-use')) {
                    setemaileorr('Email & Passworw macthing ');
                    }
        });
      
    }
  }

  
  
    return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end'>
            <div className='mr-[69px] mt-[225px]'>
                <h2 className='font-nun text-[34.5px] font-bold text-[#11175D]'>Get started with easily register</h2>
                <p className='text-[#000] font-nun text-[20.6px] font-normal mt-[13px]'>Free register and you can enjoy it</p>
                {/* <p className='text-center bg-green-500 text-white w-96'>{success}</p> */}
                {/* <ToastContainer/> */}

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    />


                <div  className='relative mt-[60px]'>
                    <input type="email" onChange={hendleEmail} value={email} className='py-[26px] px-[52px] w-96 border-[1.72px] border-[#11175D] rounded-[8.6px] opacity-30 outline-none' />
                    <p className='absolute px-[18px] top-[-10px] left-[34px] bg-white font-nun font-semibold text-[14px] text-[#11175D] tracking-[1px]'>Email Address</p>
                    {
                    emaileorr &&
                    <p className='text-center bg-red-500 text-white w-96'>{emaileorr}</p>

                    }
                </div>
                <div  className='relative mt-[56px]'>
                    <input type="text" onChange={hendlefullName} value={fullName} className='py-[26px] px-[52px] w-96 border-[1.72px] border-[#11175D] rounded-[8.6px] opacity-30 outline-none' />
                    <p className='absolute px-[18px] top-[-10px] left-[34px] bg-white font-nun font-semibold text-[14px] text-[#11175D] tracking-[1px]'>Ful name</p>
                    {
                    fullNameeorr &&
                    <p className='text-center bg-red-500 text-white w-96'>{fullNameeorr}</p>

                    }
                
                </div>
                <div  className='relative mt-[56px]'>
                    <input type={showpassword ? 'text' : 'password'} onChange={hendlepassword} value={password} className='py-[26px] px-[52px] w-96 border-[1.72px] border-[#11175D] rounded-[8.6px] opacity-30 outline-none' />
                    <p className='absolute px-[18px] top-[-10px] left-[34px] bg-white font-nun font-semibold text-[14px] text-[#11175D] tracking-[1px]'>Password</p>
                    
                    {
                        showpassword ?
                        <p onClick={()=>setshowpassword(!showpassword)} className='absolute top-[30px] right-[130px]'><PiEyeDuotone /></p>
                        :
                        <p onClick={()=>setshowpassword(!showpassword)} className='absolute top-[30px] right-[130px]'><PiEyeClosedDuotone /></p>
                    }

                    {/* <div>
                        <p className='absolute top-[25px] right-[70px]'>off</p>
                    </div> */}
                    {
                    passwordeorr &&
                    <p className='text-center bg-red-500 text-white w-96'>{passwordeorr}</p>

                    }
                
                </div>
                <div className='w-96 text-center mt-[52px]'>
                    <button onClick={hendlesubmit} className='block cursor-pointer py-[19px] rounded-[86px] w-96 bg-primary font-nun font-semibold text-[20px] text-white ' >Sign up</button>

                    <p className='text-[13px] font-open text-[#03014C] mt-[35px]'>Already  have an account ? 
                    <span className='text-[13px] font-open font-bold text-[#EA6C00] cursor-pointer'><Link to='/login'>Sign In</Link></span></p>
                
                </div>
            </div>
        </div>
        <div className='w-1/2'>
            <img className='h-full w-full object-cover' src={registration} alt="" />
        </div>
    </div>
  )
}

export default Registration