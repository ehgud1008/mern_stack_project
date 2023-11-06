import React, { useState } from 'react'

const MyListing = () => {
    const [listing, setListing] = useState({});
    const { currentUser, loading, error } = useSelector((state) => state.user);

    const handleShowListing = async () => {
        try {
          setShowMyListingError(false);
          const res = await fetch(`/api/listing/getMyListing/${currentUser._id}`);
          const data = res.json();
          
          if(data.success === false) {
            setShowMyListingError(true);
            return;
          }
        } catch (error) {
          setShowMyListingError(true);
        }
      }
    
  return (
    <div>
        <h1 className='text-3xl font-semibold text-center my-7'>내 리스팅</h1>
        <div className='flex'>
            
            <span id="name"></span>
        </div>
    </div>
  )
}

export default MyListing

;