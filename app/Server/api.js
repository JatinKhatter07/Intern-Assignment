export const fetchData=async()=>{
    let res=await fetch(`https://json-api-hjk4.onrender.com/blogs`);
    let data=await res.json();
    console.log(data)
    return data
    }


export const fetchSingleData=async(sno)=>{
    let res = await fetch(`https://json-api-hjk4.onrender.com/blogs/${sno}`);
    let data = await res.json();
    
    return data
  }


export const PostComment = async (postId, comment) => {
    console.log(postId, comment);
  
    const response = await fetch(`https://json-api-hjk4.onrender.com/blogs/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comments: [comment]
      }),
    });
  
    const newComment = await response.json();
  
    return newComment;
  };