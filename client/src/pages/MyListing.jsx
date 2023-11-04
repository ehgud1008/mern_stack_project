import React, { useState } from 'react'

const MyListing = () => {
    const [listing, setListing] = useState({});
    const [formData, setFormData] = useState({});

    const getMyListing = async () => {
        const res = await fetch('/api/listing/getMyListing', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(formData),
        });

        const data = await res.json();

        if(data.success === false){}

        setFormData({ ...formData, [e.target.id] : e.target.value });
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