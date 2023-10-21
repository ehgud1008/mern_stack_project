import React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>회원가입</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='이름' className='bolder p-3 rounded-lg' id='userame' />
        <input type='text' placeholder='이메일' className='bolder p-3 rounded-lg' id='email' />
        <input type='password' placeholder='비밀번호' className='bolder p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>회원가입</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>계정이 있으십니까?</p>
        <Link to={"/signIn"}>
          <span className='text-blue-700'>로그인</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp