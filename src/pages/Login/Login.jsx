import React, { useState } from 'react'
import login from '../../assets/login.svg'
import { FcGoogle } from 'react-icons/fc';
import { PiEyeClosedDuotone } from 'react-icons/pi';
import { PiEyeDuotone } from 'react-icons/pi';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slice/userSlice';
 

const Login = () => { 
    const auth = getAuth();
    const navigate =useNavigate();
    const dispatch =useDispatch();
    const provider = new GoogleAuthProvider();
    const [email ,setEmail] = useState('');
    const hendleEmail = (e) =>{
        setEmail(e.target.value);
        setemaileorr('');

    }

    const [password ,setpassword] = useState('');
    const hendlepassword = (e) =>{
      setpassword(e.target.value);
      setpasswordeorr('');
      
    }

    const [emaileorr ,setemaileorr] = useState('');
    const [passwordeorr ,setpasswordeorr] = useState('');
    const [showpassword ,setshowpassword] = useState('');
    const [success ,setSuccess] = useState('');

    const hendlelogin = () =>{
        // console.log('ok');
        if(!email){
            setemaileorr('not email');  
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
                setemaileorr('Email is invalid')
            }
        }
        if(!password){
            setpasswordeorr('not password');
        }

        if (email && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) ) {
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                toast.success('Login success');
                console.log(user.user );
                dispatch(userLoginInfo(user.user))
                localStorage.setItem('userInfo',JSON.stringify(user.user))
                setTimeout(()=>{
                navigate('/home')
                        },4000)
                setEmail('');
                setpassword('');
                setemaileorr('');
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode.includes('auth/invalid-login-credentials')) {
                     setemaileorr('Email & Passworw Not macthing ');
                  }
            });
        }
    }

    const hendeleGoogle = (e) =>{
        console.log('right google');
        signInWithPopup(auth, provider)
        .then((result) => {
            // console.log('ok google done');
            toast.success('Login success');
            // navigate('/home')
            setTimeout(()=>{
                navigate('/home')
                    },4000)
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
        });

    }

  return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end'>
            <div className='mr-[69px] mt-[225px]'>
                <h2 className='font-nun text-[34.5px] font-bold text-[#11175D]'>Login to your account!</h2>
                
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
                
                <div onClick={hendeleGoogle} className='cursor-pointer flex items-center mt-[13px] py-[22px] pl-[29px]  w-[221px]   border-[1px] rounded-[8.6px] border-[#b3b3c9]'>
                    <div className=' font-open text-[13.34px] font-semibold'>
                        < FcGoogle />
                    </div>
                    <div>
                        <p className='text-[#000] font-open text-[13.34px] font-semibold ml-[10px]'>Login with Google</p>
                    </div>
                </div>
                <div  className='relative mt-[60px]'>
                    <input type="email" onChange={hendleEmail} value={email} placeholder='Enter your Email' className='text-[#03014C] text-[20px] font-semibold font-open py-[26px] w-96 border-b-[1.72px] border-b-[#03014C] border-opacity-30 outline-none ' />
                    <p className='absolute top-[0px] left-[0px] font-nun font-semibold text-[14px] text-[#11175D] tracking-[1px]'>Email Address</p>

                    {
                    emaileorr &&
                    <p className='bg-red-500 text-white w-96 text-center'>{emaileorr}</p>

                    }
                
                </div>
                
                <div  className='relative mt-[56px]'>
                <input type={showpassword ? 'text' : 'password'} onChange={hendlepassword} value={password} placeholder='Enter your password' className='text-[#03014C] text-[20px] font-semibold font-open py-[26px] w-96 border-b-[1.72px] border-b-[#03014C] border-opacity-30 outline-none ' />
                    <p className='absolute top-[0px] left-[0px] font-nun font-semibold text-[14px] text-[#11175D] tracking-[1px]'>Your password</p>
                
                    {
                        showpassword ?
                        <p onClick={()=>setshowpassword(!showpassword)} className='absolute top-[30px] right-[30px]'><PiEyeDuotone /></p>
                        :
                        <p onClick={()=>setshowpassword(!showpassword)} className='absolute top-[30px] right-[30px]'><PiEyeClosedDuotone /></p>
                    }


                    {
                    passwordeorr &&
                    <p className='bg-red-500 text-white w-96 text-center'>{passwordeorr}</p>

                    }
                
                </div>
                <div className='w-96 text-center mt-[52px]'>
                    <button onClick={hendlelogin} className='w-96 block cursor-pointer py-[19px] rounded-[8.7px] bg-primary font-nun font-semibold text-[20px] text-white '>Login to Continue</button>
                    <a className='text-[13px] font-open text-[#03014C] mt-[35px] '>Don’t have an account ? 
                    <span className='text-[13px] font-open font-bold text-[#EA6C00] cursor-pointer'><Link to='/registration'>Sign up</Link></span></a>
                    <div>
                        <Link to='/forgotpassword'className=' text-[13px] font-open text-[#03014C] mt-[35px] '>Forgot password</Link>
                    </div>
                </div>
                
            </div>
        </div>
        <div className='w-1/2'>
            <img className='h-fit w-full object-cover' src={login} alt="" />
        </div>
    </div>
  )
}

export default Login