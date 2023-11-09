import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    SwiperCore.use([Navigation]);

    useEffect( () => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/getListing/${params._id}`)
    
                const data = await res.json();
    
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    onsole.log(data.message);
                    return;
                }
                
                setListing(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setError(true);
                setLoading(false);
            }

        }
        fetchListing();
    }, [params._id]);
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>로딩 중...</p>}
        {error && <p className='text-center my-7 text-2xl'>리스팅을 불러오지 못했습니다.</p>}

        {listing && !loading && !error && (
            <div>
                <Swiper navigation>
                    {listing.imageUrls.map( (url) => (
                        <SwiperSlide key={url}>
                            <div className='h-[550px]' style={ {background:`url(${url}) center no-repeat`, backgroundSize:'cover', }}>
                                
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        )}
    </main>
  )
}

export default Listing