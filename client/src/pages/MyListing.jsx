import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MyListing = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [myListing, setMyListing] = useState( [] );
  const [showMyListing, setShowMyListing] = useState(false);
  const [myListingError, setMyListingError] = useState(false);

  const handleShowListing = async (check) => {
    try {
      setMyListingError(false);
      const res = await fetch(`/api/listing/getMyListing/${currentUser._id}`);
      const data = await res.json();
      
      if(data.success === false) {
        setMyListingError(true);
        return;
      }
      setMyListing(data);
      setShowMyListing(true);
    } catch (error) {
      setMyListingError(true);
    }
  }

  const handleHideListing = () => {
    setShowMyListing(false);
  }
  return (
    <div>
    {showMyListing ? (
      <button onClick={handleHideListing} className='text-green-600 w-full'>내 리스팅 숨기기</button>
      ) : (
      <button onClick={handleShowListing} className='text-green-600 w-full'>내 리스팅 보기</button>
    )}
    {showMyListing &&
      myListing &&
        myListing.length > 0 && 
          <div className='flex flex-col gap-4'>
            <h1 className='text-center my-7 text-2xl font-semibold'>내 리스팅 목록</h1>
            {myListing.map((listing) => (
              <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
                <Link to={`/listing/${listing._id}`}>
                  <img src={listing.imageUrls[0]} alt="thumbnail" className='h-16 w-16 object-contain'/>
                </Link>
                <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`}>
                  <p>{listing.name}</p>
                </Link>
                <div className='flex flex-col item-center p-2'>
                  <button className='text-red-600 uppercase p-1'>삭제</button>
                  <button className='text-blue-600 uppercase'>수정</button>
                </div>
              </div>
            ))}
        </div>
    }
    </div>
  )
}

export default MyListing

;