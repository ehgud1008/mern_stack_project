import { list } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';

const SearchListing = () => {
    const navigate = useNavigate();

    const [listingData, setListingData] = useState( {
        searchKeyword : '',
        type : 'all',
        parking : false,
        furnished : false,
        offer : false,
        sort : 'regularPrice',
        order : 'desc'
    } );

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect( () => {
        const urlParams = new URLSearchParams(location.search);

        const searchKeyword = urlParams.get('searchKeyword');
        const type = urlParams.get('type');
        const parking = urlParams.get('parking');
        const furnished = urlParams.get('furnished');
        const offer = urlParams.get('offer');
        const sort = urlParams.get('sort');
        const order = urlParams.get('order');
        
        if(searchKeyword || type || parking || furnished || offer || sort || order){
            setListingData({
                searchKeyword : searchKeyword || '',
                type : type || 'all',
                parking : parking === 'true' ? true : false,
                furnished : furnished === 'true' ? true : false,
                offer : offer === 'true' ? true : false,
                sort : sort || 'regularPrice',
                order : order || 'desc',
            });
        }

        const fetchListings = async () => {
            //에러나도 리스팅 없다고 보여주기 때문에 예외처리 x
            setLoading(true);
            setShowMore(false);
            
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/getSearchListings?${searchQuery}`);
            const data = await res.json();

            if(data.length > 8){
                setShowMore(true);
            }else{
                setShowMore(false);
            }
            setListings(data);
            setLoading(false);
        }
        
        fetchListings();

    }, [location.search]);

    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setListingData({...listingData, type: e.target.id});
        }
        if(e.target.id === 'searchKeyword'){
            setListingData({...listingData, searchKeyword : e.target.value});
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setListingData({...listingData, [e.target.id] : e.target.checked || e.target.checked === 'true' ? true : false});
        }

        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0];
            const order = e.target.value.split('_')[1]; 
            setListingData({...listingData, sort, order});
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams();
        urlParams.set('searchKeyword', listingData.searchKeyword);
        urlParams.set('type', listingData.type);
        urlParams.set('parking', listingData.parking);
        urlParams.set('furnished', listingData.furnished);
        urlParams.set('offer', listingData.offer);
        urlParams.set('sort', listingData.sort);
        urlParams.set('order', listingData.order);
        
        const searchQuery = urlParams.toString();

        navigate(`/searchListing?${searchQuery}`);

    }
    const showMoreListing = async () => {
        const listingIndex = listings.length;
        const startIndex = listingIndex;
        const urlParams = new URLSearchParams(location.search);

        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/listing/getSearchListings?${searchQuery}`);
        const data = await res.json();

        if(data.length < 9) {
            setShowMore(false);
        }
        
        setListings([...listings, ...data]);

    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSearchSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>검색어 : </label>
                    <input type='text' id='searchKeyword' placeholder='검색어를 입력해주세요.' 
                          className='border rounded-lg p-3 w-full' onChange={handleChange} value={listingData.searchKeyword}/>
                </div>
                <div className='flex gap-6 flex-wrap items-center'>
                    <label className='font-semibold'>타입 : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5' 
                            onChange={handleChange} checked={listingData.type === 'all'}/>
                        <span>임대 & 매매</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' 
                            onChange={handleChange} checked={listingData.type === 'rent'}/>
                        <span>임대</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' 
                            onChange={handleChange} checked={listingData.type === 'sale'}/>
                        <span>매매</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' 
                            onChange={handleChange} checked={listingData.offer}/>
                        <span>제안</span>
                    </div>
                </div>

                <div className='flex gap-6 flex-wrap items-center'>
                    <label className='font-semibold'>시설 : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' 
                            onChange={handleChange} checked={listingData.parking}/>
                        <span>주차공간</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' 
                            onChange={handleChange} checked={listingData.furnished}/>
                        <span>가구</span>
                    </div>
                </div>

                <div className='flex gap-6 items-center gap-2'>
                    <label className='font-semibold'>정렬 : </label>
                    <select id='sort_order' className='border rounded-lg p-2'
                        onChange={handleChange} defaultValue={'defaultSort'}>
                        <option value='regularPrice_asc'>가격 낮은순</option>
                        <option value='regularPrice_desc'>가격 높은순</option>
                        <option value='date_asc'>최신순</option>
                        <option value='date_desc'>오래된순</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>검색</button>
            </form>
        </div>
        <div className='flex-1'>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>검색 결과</h1>
            <div className='p-7 flex flex-wrap gap-4'>
                {!loading && listings.length === 0 && (
                    <p className='text-xl text-slate-700'>검색결과가 없습니다.</p>
                )}
                {loading && (
                    <p className='text-xl text-slate-700 text-center w-full'>로딩 중...</p>
                )}
                {!loading && listings && listings.map( (listing) => (
                    <ListingCard key={listing._id} listing={listing}/>
                ))}
                {showMore && (
                    <button onClick={ () => {
                        showMoreListing();
                    }} className='text-green-700 hover:underline p-7 text-center w-full'>더 보기</button>
                )}
            </div>
        </div>
    </div>
  )
}

export default SearchListing