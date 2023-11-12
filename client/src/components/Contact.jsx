import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ( {listing} ) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');

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
    }, [listing.userRef]);

    const changeMessage = (e) => {
        setMessage(e.target.value)
   }
   
  return (
    <>
        {landlord && (
            <div className='flex flex-col gap-2'>
                {/* <p>연락처 <span>{landlord.username}</span></p> */}
                <textarea name='message' id='message' rows='4' value={message} placeholder='문의하실 내용을 입력해주세요.'
                        className='w-full border p-3 rounded-lg' onChange={changeMessage} />
                <Link to={`mailTo:${landlord.email}?subjext=Regarding${listing.name}&body=${message}`}
                    className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
                    전송
                </Link>
            </div>
        )}
    </>
  )
}

export default Contact