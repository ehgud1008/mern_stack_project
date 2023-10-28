import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { app } from '../firebase.js';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const fileRef = useRef(null);

  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState( {} );
  console.log(filePercent);
  
  //firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect( () => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
    },
      (error) => { 
        setFileUploadError(true);
      },
      //콜백 함수
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL) => {
          setFormData( {...formData, avatar: downloadURL} );
        })
      }
    
    );

  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>프로필</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" 
              onChange={ (e) => setFile(e.target.files[0]) } ref={fileRef} hidden accept="image/*" />
        <img src={ formData.avatar || currentUser.avatar } onClick={ () => fileRef.current.click()}
            className= "rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
            alt="profile" />
        <p className='text-sm self-center'>
          {
            fileUploadError ? (
              <span className='text-red-500'>이미지 업로드 실패 (이미지는 2mb 이하 크기만 가능합니다)</span> 
            ) : filePercent > 0 && filePercent < 100 ? ( 
                <span className='text-slate-700'>{`업로드 ${filePercent}%`}</span> 
            ) : filePercent === 100 ? ( 
                <span className='text-green-700'>이미지 업로드 성공!</span>
            ) : (
              ''
            )
          }
        </p>
        <input type='text' id="userName" placeholder='이름' className='bolder p-3 rounded-lg'/>
        <input type='text' id="email" placeholder='이메일' className='bolder p-3 rounded-lg'/>
        <input type='password' id="password" placeholder='비밀번호' className='bolder p-3 rounded-lg'/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">수정하기</button>

      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">회원 탈퇴</span>
        <span className="text-red-500 cursor-pointer">로그 아웃</span>
      </div>
    </div>
  )
}

export default Profile