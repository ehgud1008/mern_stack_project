import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  //const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector( (state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,

    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      //setLoading(true);
      dispatch(signInStart());
    //현재 client는 5173 포트이기 때문에 3000으로 보내줘야함
    //vite.config.js 에서 /api에 대해 proxy 설정
    const res = await fetch('/api/auth/signIn', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(formData),
    }); 
    const data = await res.json();
    if(data.success === false){
      // setError(data.message);
      // setLoading(false);
      dispatch(signInFailure(data.message));
      return;
    }
    // setLoading(false);
    // setError(null);
    dispatch(signInSuccess(data));
    navigate('/');
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>로그인</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='이메일' className='bolder p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='비밀번호' className='bolder p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button 
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? '로딩중...' : '로그인'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>계정이 없으십니까?</p>
        <Link to={"/signUp"}>
          <span className='text-blue-700'>회원가입</span>
        </Link>
      </div>
      { error && <p className='text-red-500 mt-5'>{error}</p> }
    </div>
  )
}

export default SignIn