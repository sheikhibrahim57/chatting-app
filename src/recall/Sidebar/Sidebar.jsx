import React, { useState, createRef } from 'react'
import profile from '../../assets/profile-img.png'
import { IoHomeOutline } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { MdCloudUpload } from "react-icons/md";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const data = useSelector(state => state.user.userInfo)
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  const auth = getAuth();
  const navigate = useNavigate()
  const [upload, setupload] = useState()
  const [frofilepic, setProfilepic] = useState()
  const handleSingout = () => {
    signOut(auth).then(() => {
      console.log('sing out done');
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }).catch((error) => {
      console.log(error.code);
    });
  }

  const profileUpload = () => {
    setupload(true)
  }

  const onChange = (e) => {
    console.log(e);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropData;
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL  
        }).then(()=>{
          setupload(false);
          setCropData("");
          setImage("");

        })
        });
      });

    }
  };

  return (
    <div>
      {
        upload ?
          <div className='h-screen w-full bg-primary absolute top-0 left-0 flex justify-center items-center'>
            <div className='p-10 w-[500px]  rounded bg-white'>
              <h1 className='font-nun text-2xl font-bold mb-[20px]'>Upload your profile</h1>
              <input onChange={onChange} className='block' type="file" />
              <div
                className="img-preview w-[90px] h-[90px] rounded-full overflow-hidden mx-auto"
              />
              {
                 image &&
                 <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
              }
              
              <button onClick={getCropData} className='py-3 px-3 text-white bg-primary mt-3'>Upload</button>
              <button onClick={() => setupload(false)} className='py-3 px-3 text-white bg-red-500 ml-3'>Cancel</button>
            </div>
          </div>
          :
          <div className='bg-primary pt-[38px] pb-[47px] pl-[25px] w-full rounded-[20px] '>
            <div className='relative  w-full flex justify-center ml-[-15px]'>
              <div className='w-[100px] h-[100px] relative group'>
                <img className='rounded-full' src={data.photoURL} alt="" />
                <h4 className='mt-[8px] text-center text-[20px] font-bold'>{data.displayName}</h4>
                <div onClick={profileUpload} className='w-[0] group-hover:w-[100px] h-[100px] bg-[rgba(0,0,0,0.41)] absolute top-0 left-0 rounded-full flex justify-center items-center'>
                  <MdCloudUpload className='text-white' />
                </div>
              </div>
            </div>
            <div className='mt-[79px] bg-white py-[20px] rounded-l-lg relative after:absolute after:content-[""] 
            after:top-0 after:right-0 after:bg-primary after:z-[1] after:h-full after:w-[8px]
            after:rounded-l-lg '>
              <IoHomeOutline className='text-[46px] text-primary mx-auto ' />
            </div>
            <div className='mt-[79px]'>
              <FaFacebookMessenger className='text-[46px] text-[#BAD1FF] mx-auto ' />
            </div>
            <div className='mt-[79px]'>
              <FaRegBell className='text-[46px] text-[#BAD1FF] mx-auto ' />
            </div>
            <div className='mt-[79px]'>
              <IoSettingsOutline className='text-[46px] text-[#BAD1FF] mx-auto ' />
            </div>
            <div className='mt-[79px]'>
              <IoIosLogOut onClick={handleSingout} className='text-[46px] text-[#BAD1FF] mx-auto ' />
            </div>
          </div>
      }
    </div>
  )
}

export default Sidebar