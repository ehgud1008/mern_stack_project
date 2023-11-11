import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

const Listing = () => {
    const params = useParams();
    const {currentUser} = useSelector( (state) => state.user )
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false);

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
                <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                    <p className='text-2xl font-semibold'>
                        {listing.name} - {' '}
                        {listing.offer
                            ? listing.discountPrice.toLocaleString('ko-KR')
                            : listing.regularPrice.toLocaleString('ko-KR')
                        } 
                        {listing.type === 'rent' && ' / 월'}
                    </p>
                    <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                        <FaMapMarkerAlt className='text-green-700' />
                        {listing.address}
                    </p>
                    <div className='flex gap-4'>
                        <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                            {listing.type === 'rent' ? '임대' : '매매'}
                        </p>
                        {listing.offer && (
                            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                {listing.discountPrice}￦ OFF
                            </p>
                        )}
                    </div>
                    <p className='text-slate-800'>
                    <span className='font-semibold text-black'>설명 - </span>
                    {listing.description}
                    </p>
                    <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <FaBed className='text-lg' />
                            {listing.bedrooms > 1
                            ? `${listing.bedrooms} 침실 `
                            : `${listing.bedrooms} 침실 `}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <FaBath className='text-lg' />
                            {listing.bathrooms > 1
                            ? `${listing.bathrooms} 화장실 `
                            : `${listing.bathrooms} 화장실 `}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <FaParking className='text-lg' />
                            {listing.parking ? '주차공간 있음' : '주차공간 없음'}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <FaChair className='text-lg' />
                            {listing.furnished ? '가구 딸림' : '가구배치 없음'}
                        </li>
                    </ul>
                    {currentUser && listing.userRef !== currentUser._id && !contact && (
                        <button onClick={ () => setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>문의하기</button>
                    )}
                    {contact && <Contact listing={listing} />}
                </div>
            </div>
        )}
    </main>
  )
}

export default Listing