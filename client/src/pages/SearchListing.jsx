import React from 'react'

const SearchListing = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>검색어 : </label>
                    <input type='text' id='searchKeyword' placeholder='검색어를 입력해주세요.' 
                          className='border rounded-lg p-3 w-full'/>
                </div>
                <div className='flex gap-6 flex-wrap items-center'>
                    <label className='font-semibold'>타입 : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5' />
                        <span>임대 & 매매</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' />
                        <span>임대</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' />
                        <span>매매</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' />
                        <span>제안</span>
                    </div>
                </div>

                <div className='flex gap-6 flex-wrap items-center'>
                    <label className='font-semibold'>시설 : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' />
                        <span>주차공간</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' />
                        <span>가구</span>
                    </div>
                </div>

                <div className='flex gap-6 items-center gap-2'>
                    <label className='font-semibold'>정렬 : </label>
                    <select id='sort' className='border rounded-lg p-2'>
                        <option>가격 높은순</option>
                        <option>가격 낮은순</option>
                        <option>최신순</option>
                        <option>오래된순</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>검색</button>
            </form>
        </div>
        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 m'>검색 결과</h1>
        </div>
    </div>
  )
}

export default SearchListing