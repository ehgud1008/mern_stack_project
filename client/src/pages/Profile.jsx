import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { app } from '../firebase.js';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MyListing from './MyListing.jsx';

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState( {} );
  const [updateSucess, setUpdateSuccess] = useState(false);

  const [myListingError, setMyListingError] = useState(false);
  const [myListing, setMyListing] = useState( [] );
  const [showMyListing, setShowMyListing] = useState(false);

  const dispatch = useDispatch();
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var result = confirm("수정하시겠습니까??");
    if(result){
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/updateUser/${currentUser._id}`, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify(formData),
        });
  
        const data = await res.json();
        if(data.success === false){
          dispatch(updateUserFailure(data.message));
          return;
        }
  
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      } catch (error) {
        dispatch(updateUserFailure(error.message));
      }
    }
  }

  const handleDeleteUser = async () => {
    var result = confirm("회원탈퇴 하시겠습니까??");
    if(result){
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/deleteUser/${currentUser._id}`,{
          method : 'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    }
  }

  const handleSignout = async () => {
    var result = confirm("로그아웃 하시겠습니까??");
    if(result){
      try {
        dispatch(signOutUserStart());
        const res = await fetch('/api/auth/signOut');
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(data.message));
      }
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>프로필</h1>
      <form onSubmit={ handleSubmit } className='flex flex-col gap-4'>
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
        <input type='text' id="userName" placeholder='이름' maxLength='15' minLength='2' className='bolder p-3 rounded-lg' defaultValue={currentUser.userName} onChange = {handleChange}/>
        <input type='text' id="email" placeholder='이메일' minLength='1' className='bolder p-3 rounded-lg' defaultValue={currentUser.email} onChange = {handleChange}/>
        <input type='password' id="password" placeholder='비밀번호' className='bolder p-3 rounded-lg'/>
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{ loading ? 'Loading...' : '수정하기'}</button>
        <Link to={'/createListing'}  className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>
          리스팅 생성
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer" onClick={handleDeleteUser}>회원 탈퇴</span>
        <span className="text-red-500 cursor-pointer" onClick={handleSignout}>로그 아웃</span>
      </div>
      <p className='text-red-500 mt-5'>{ error ? error : ''}</p>
      <p className='text-blue-500 mt-5'>{updateSucess ? '업데이트 성공' : ''}</p>
      
      <p className='text-red-600 mt-5'>{myListingError ? '에러': ''}</p>
      <MyListing />
      
    </div>
  )

}

export default Profile