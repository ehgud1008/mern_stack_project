import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {body, validation} from 'express-validator';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //유효성 체크
  const [validUserNameCheck, setValidUserNameCheck] = useState(false);
  const [validEmailCheck, setValidEmailCheck] = useState(false);
  const [validPasswordCheck, setValidPasswordCheck] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(validCheck(formData)) {
      return;
    }
    try {
      setLoading(true);
      //현재 client는 5173 포트이기 때문에 3000으로 보내줘야함
      //vite.config.js 에서 /api에 대해 proxy 설정
      const res = await fetch('/api/auth/signUp', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      }); 
      const data = await res.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signIn');
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    
  }

  const validCheck = (formData) => {
    var isCheck = false;
    const userNamePattern = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,15}$/i;
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordPattern = /^[a-zA-Z0-9]{2,15}$/i;

    
    console.log(userNamePattern.test(formData.userName));
    console.log(emailPattern.test(formData.email));
    console.log(passwordPattern.test(formData.password));

    if(!userNamePattern.test(formData.userName)) {
      setValidUserNameCheck(true);
      isCheck = true;
    }else{
      setValidUserNameCheck(false);
    }
    if(!emailPattern.test(formData.email)) {
      setValidEmailCheck(true);
      isCheck = true;
    }else{
      setValidEmailCheck(false);
    }
    if(!passwordPattern.test(formData.password)) {
      setValidPasswordCheck(true);
      isCheck = true;
    }else{
      setValidPasswordCheck(false);
    }
    return isCheck;
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>회원가입</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='이름' className='bolder p-3 rounded-lg' id='userName' onChange={handleChange}/>
        <p className='text-red-500 text-sm'>{ validUserNameCheck ? '이름은 2~15자 이내로 압력해주세요' : ''} </p>
        <input type='text' placeholder='이메일' className='bolder p-3 rounded-lg' id='email' onChange={handleChange}/>
        <p className='text-red-500 text-sm'>{ validEmailCheck ? '이메일 형식을 확인해주세요.' : ''} </p>
        <input type='password' placeholder='비밀번호' className='bolder p-3 rounded-lg' id='password' onChange={handleChange}/>
        <p className='text-red-500 text-sm'>{ validPasswordCheck ? '비밀번호는 2~15자 이내로 압력해주세요' : ''} </p>
        <button 
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? '로딩중...' : '회원 가입'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>계정이 있으십니까?</p>
        <Link to={"/signIn"}>
          <span className='text-blue-700'>로그인</span>
        </Link>
      </div>
      { error && <p className='text-red-500 mt-5'>{error}</p> }
    </div>
  )
}

export default SignUp