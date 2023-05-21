"use client"
import { PostComment, fetchSingleData } from '@/app/Server/api';
import React, { useEffect, useState } from 'react'

const PageID = ({params}) => {
    const [error, setError] = useState(false);
    const [data, setData]=useState("")
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({ name: null, email: null, content: null, storeData: false });
 const Blogno=params.id

 const onInputChange = (e) => {
    const { target } = e;
    setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));  
 }

 const handleComment=()=>{
    const { name, email, content } = formData;
    if (!name || !email || !content) {
        console.log(name, email, content)
        alert("please fill all fields")
        return;
      }
      const comment = {
        name,
        email,
        content
      };

      PostComment( Blogno , comment)
      .then((res) => {

            console.log(res)
            setComments(res.comments);
          formData.name = '';
          formData.email = '';
          formData.content = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }))
        })
 }


 const getData=async()=>{
    console.log("hi")
    const blogs=await fetchSingleData(Blogno)
    setData(blogs)
    console.log(blogs)
  }

  useEffect(()=>{
    if (data && data.comments) {
        setComments(data.comments);
      }
  
  },[data])

  
  useEffect(()=>{
    getData()
  
  },[])



  return (
    <div className=' h-fit'>
    <div className='w-3/4 my-10 mx-auto'>
    <p className='text-4xl font-bold tracking-tight p-5 m-auto text-center text-gray-900 sm:text-6xl'>
      {data.title}
    </p>
    <img className='m-auto' src={data.images && data.images[0]} alt='Banner Image' />
    <p className='mt-6 text-xl mx-auto leading-8 mb-8 text-gray-900'>{data.desc}</p>
    <img className='m-auto' src={data.images && data.images[1]} alt='image Ref 1' />
    <p className='mt-6 text-xl mx-auto leading-8 mb-8 text-gray-900'>{data.desc1}</p>
    <img className='m-auto' src={data.images && data.images[2]} alt='image Ref 1' />
    <p className='mt-6 text-xl mx-auto leading-8 mb-8 text-gray-900'>{data.desc2}</p>
    <div className="bg-white shadow-lg rounded-lg w-full p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" required value={formData.name} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Name" name="name" />
        <input type="email" required value={formData.email} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.content} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="content" placeholder="Comment" />
      </div>
      
        <button type="button" onClick={handleComment} style={{width:"fit-content"}} className="transition duration-500 ease hover:bg-red-600 inline-block bg-red-400 w-full text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer ">Post Comment</button>

    </div>

    <div>
        {
            comments.length > 0 && (
                <div>
                {comments.length > 0 && (
                  <div>
                    {comments.map((comment, index) => (
                      <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                        <p className="inline align-middle text-gray-700 font-medium text-lg">{comment.name}</p>
                        <p className="text-gray-500 text-sm">{comment.email}</p>
                        <p className="whitespace-pre-line text-gray-600 w-full">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
        }
    </div>
  </div>
  
    </div>
  )
}

export default PageID