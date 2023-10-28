import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>프로필</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} 
            className= "rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
            alt="profile" />
        <input type='text' id="userName" placeholder='이름' className='bolder p-3 rounded-lg' id='userName'/>
        <input type='text' id="email" placeholder='이메일' className='bolder p-3 rounded-lg' id='email'/>
        <input type='password' id="password" placeholder='비밀번호' className='bolder p-3 rounded-lg' id='password'/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">수정하기</button>

      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">계정 삭제</span>
        <span className="text-red-700 cursor-pointer">로그 아웃</span>
      </div>
    </div>
  )
}

export default Profile