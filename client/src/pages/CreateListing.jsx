import React from 'react';

export default function CreateListing () {
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className='text-3xl font-semibold text-center my-7'>리스팅 생성</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text' placeholder='이름' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
                    <textarea type='text' placeholder='설명' className='border p-3 rounded-lg' id='description' required/>
                    <input type='text' placeholder='주소' className='border p-3 rounded-lg' id='address' required/>
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sale' className='w-5' />
                            <span>매매</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5' />
                            <span>렌트</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' />
                            <span>주차장</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5' />
                            <span>가구 비치</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5' />
                            <span>제안</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type='number'  placeholder='0' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                            <p>침대</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number'  placeholder='0' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                            <p>화장실</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number'  placeholder='0' id='regularPrice' min='50' max='10000000' required className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>정가</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                        이미지 :
                        <span className='font-normal text-gray-600 ml-2'>
                            첫 번째 이미지가 표지가 됩니다. (최대 6장)
                        </span>
                    </p>
                    <div className='flex gap-4'>
                        <input className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple />
                        <button type='button' className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' >
                            등록
                        </button>
                    </div>
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                        등록
                    </button>
                </div>
            </form>
        </main>
    )
}