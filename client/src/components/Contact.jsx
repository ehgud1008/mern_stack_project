import React, { useEffect, useState } from 'react'

const Contact = ( {listing} ) => {
    const [landlord, setLandlord] = useState(null);

    useEffect( () => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console(error.message);
            }
        }

        fetchLandlord();
    }, [listing.userRef])
  return (
    <>
        {landlord && (
            <div className=''>
                <p>연락처 <span>{landlord.username}</span></p>
            </div>
        )}
    </>
  )
}

export default Contact