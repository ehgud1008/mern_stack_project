import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState('');

  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    //현재 페이지의 쿼리 스트링은 window.location.search 로 불러올 수 있음.
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchKeyword', searchKeyword);

    const searchQuery = urlParams.toString();
    navigate(`/searchListing?${searchQuery}`);
  }

  useEffect( () => {
    const urlParams = new URLSearchParams(window.location.search);

    const searchKeyword = urlParams.get('searchKeyword');
    if(searchKeyword) {
      setSearchKeyword(searchKeyword);
    }
  }, [location.search])
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <span className='text-slate-500'>My</span>
              <span className='text-slate-700'>Folio</span>
          </h1>
        </Link>
        <form onSubmit={handleSearchSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" className="bg-transparent focus:outline-none w-24 sm:w-64" placeholder='Search....'
                onChange={(e) => setSearchKeyword(e.target.value)} value={searchKeyword}/>
              <button>
                <FaSearch className="text-slate-600"/>
              </button>
        </form>
        <ul className='flex gap-4'>
          <Link to={"/"}>
            <li className='hidden sm:inline text-slate-700 hover:underline font-bold'>Home</li>
          </Link>
          <Link>
            <li className='hidden sm:inline text-slate-700 hover:underline font-bold'>About</li>
          </Link>

          <Link to={"/profile"}>
            { currentUser ? (
              <img src={currentUser.avatar} className='rounded-full h-7 w-7 object-cover' alt='profile' />
            ) : ( 
              <li className='text-slate-700 hover:underline font-bold'>로그인</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header