import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingCard from '../components/ListingCard';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);
  useEffect( () => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/getSearchListings?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error.message);
      }
      
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/getSearchListings?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error.message);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/getSearchListings?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* Top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'><span className='text-slate-500'>Mern Stack</span> 프로젝트입니다</h1>
        <div className='text-gray-400 text-xl sm:text-sm'>
          Mongodb, Express, React, Nodejs 기반으로 만들었고,<br />부동산 매매/임대 거래를 할 수 있도록 만든 사이트입니다. 
        </div>
        <Link to={"/searchListing"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          <button>자세히 보기</button>
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {rentListings &&
          rentListings.length >0 &&
          rentListings.map( (listing) => (
              <SwiperSlide>
                <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}} className='h-[500px]' key={listing._id}>

                </div>
              </SwiperSlide>
            ))
        }
      </Swiper>
      {/* bottom */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings &&
          offerListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>제안 상품</h2>
                <Link to={'/searchListing?offer=true'} className='text-sm text-blue-800 hover:underline'>
                  더보기
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map( (listing) => (
                    <ListingCard listing={listing} key={listing._id}></ListingCard>
                  ))
                }
              </div>
            </div>
          )}

          {rentListings &&
          rentListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>임대 상품</h2>
                <Link to={'/searchListing?type=rent'} className='text-sm text-blue-800 hover:underline'>
                  더보기
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map( (listing) => (
                    <ListingCard listing={listing} key={listing._id}></ListingCard>
                  ))
                }
              </div>
            </div>
          )}

          {saleListings &&
          saleListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>매매 상품</h2>
                <Link to={'/searchListing?type=sale'} className='text-sm text-blue-800 hover:underline'>
                  더보기
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  saleListings.map( (listing) => (
                    <ListingCard listing={listing} key={listing._id}></ListingCard>
                  ))
                }
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Home