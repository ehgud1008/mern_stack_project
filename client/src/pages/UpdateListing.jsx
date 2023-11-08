import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { current } from '@reduxjs/toolkit';
import { useSelector} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
export default function UpdateListing () {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const params = useParams();

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls : [],
        name : '',
        description : '',
        address : '',
        type : 'rent',
        bedrooms : 1,
        bathrooms : 1,
        regularPrice : 50,
        discountPrice : 0,
        offer : false,
        parking : false,
        furnished : false,
    })
    const [uploadError, setUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect (() => {
        const fetchListing = async () => {
            const _id = params._id;
            const res = await fetch(`/api/listing/getListing/${_id}`);
            const data = await res.json();
            if(data.success === false){
                console.log(data.message);
                return;
            }
            setFormData(data);
        }
        fetchListing();
      }, []);
    
    const handleImageUpload = (e) => {
        if(files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            setUploadError(false);
            const promise = [];

            for(let i = 0; i < files.length; i ++ ){
                promise.push(storeImage(files[i]));
            }
            Promise.all(promise).then( (urls) => {
                setFormData( {
                    ...formData, 
                    imageUrls : formData.imageUrls.concat(urls),
                });
                console.log("!!! >>> " + formData.imageUrls);
                setUploadError(false);
                setUploading(false);
            }).catch((error) =>{
                setUploadError('이미지는 2MB 이하 사이즈로 업로드 해주세요.')
                setUploading(false);
            });
        }else{
            setUploadError('이미지는 최대 6장까지 업로드 가능합니다.');
            setUploading(false);
        }
    }

    const storeImage = async (image) => {
        return new Promise( (resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + image.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`업로드 ${progress}% `);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( (downloadUrl) => {
                        resolve(downloadUrl);
                    });
                }
            )
        });
    }
    const handleDeleteImage = (index) => {
        setFormData({
            ...formData,
            imageUrls : formData.imageUrls.filter( (_, i) => i !== index),
        });
    }

    const handleChange = (e) => {
        if(e.target.id === 'sale' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type : e.target.id
            });
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            });
        }

        if(e.target.type === 'number' || e.target.type === 'textarea' || e.target.type === 'text'){
            console.log(e.target.type);
            setFormData({
                ...formData,
                [e.target.id] : e.target.value,
            });
        }
    }   
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.imageUrls.length < 1 ) return setSubmitError('이미지는 최소 한장 이상 업로드 해주세요.')
            if(formData.regularPrice < formData.discountPrice) return setSubmitError('정상가는 할인가이상으로 입력해주세요')
            setSubmitLoading(true);
            setSubmitError(false);
            const res = await fetch(`/api/listing/updateMyListing/${params._id}`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    ...formData,
                    userRef : currentUser._id
                }),
            });
            const data = await res.json();

            setSubmitLoading(false);
            if(data.success === false){
                setSubmitError(data.message);
            }

            navigate(`/listing/${data._id}`);
        } catch (error) {
            setSubmitError(error.message);
            setSubmitLoading(false);
        }
    }
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className='text-3xl font-semibold text-center my-7'>리스팅 수정</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text' placeholder='이름' 
                        onChange={handleChange} value={formData.name}
                        className='border p-3 rounded-lg' id='name' maxLength='62' minLength='5' required />
                    <textarea type='text' placeholder='설명' 
                        onChange={handleChange} value={formData.description}
                        className='border p-3 rounded-lg' id='description' required/>
                    <input type='text' placeholder='주소' 
                        onChange={handleChange} value={formData.address}
                        className='border p-3 rounded-lg' id='address' required/>
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sale' className='w-5'
                                    onChange={handleChange} checked={formData.type === 'sale'} />
                            <span>매매</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5' 
                                onChange={handleChange} checked={formData.type === 'rent'}/>
                            <span>렌트</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5'
                                    onChange={handleChange} checked={formData.parking} />
                            <span>주차장</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5'
                                    onChange={handleChange} checked={formData.furnished} />
                            <span>가구 비치</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5'
                                    onChange={handleChange} checked={formData.offer} />
                            <span>제안</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type='number'  placeholder='0' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' 
                                    onChange={handleChange} value={formData.bedrooms}/>
                            <p>침대</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number'  placeholder='0' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' 
                                    onChange={handleChange} value={formData.bathrooms}/>
                            <p>화장실</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number'  placeholder='0' id='regularPrice' min='50' max='10000000' required className='p-3 border border-gray-300 rounded-lg' 
                                    onChange={handleChange} value={formData.regularPrice} />
                            <div className='flex flex-col items-center'>
                                <p>정가</p>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className='flex items-center gap-2'>
                                <input type='number'  placeholder='0' id='discountPrice' min='0' max='10000000' required className='p-3 border border-gray-300 rounded-lg' 
                                        onChange={handleChange} value={formData.discountPrice} />
                                <div className='flex flex-col items-center'>
                                    <p>할인가</p>
                                </div>
                            </div>
                        )}
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
                        <input onChange={ (e) => { setFiles(e.target.files) }} className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple />
                        <button disabled={uploading} onClick={ handleImageUpload } type='button' className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' >
                            {uploading ? '업로드 중입니다.' : '업로드'}
                        </button>
                    </div>
                    {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={index} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt="listing image" className="w-40 h-40 object-cover rounded-lg"></img>
                            <button type="button" onClick={ () => handleDeleteImage(index)} className='p-3 text-red-600 rounded-lg uppercase hover:opacity-75'>삭제</button>
                        </div>
                    ))}
                    <p className='text-red-500 text-sm'>{uploadError && uploadError}</p>
                    <button disabled={submitLoading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                        {submitLoading ? '리스팅 수정 중' : '수정' }
                    </button>
                    {submitError && <p className='text-red-500 text-sm'>{submitError}</p>}
                </div>
            </form>
        </main>
    )
}