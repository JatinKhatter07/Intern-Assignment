"use client"
import "./globals.css"
import Link from "next/link";

import React,{useState,useEffect} from "react"
import { fetchData } from "./Server/api";


export default function Home() {
  
  const [data,setData] =useState("");
  
  
  const scrolldown=()=>{
    window.scrollTo( { behavior:"smooth",top:550 })
  }

  const getData=async()=>{
    console.log("hi")
    const blogs=await fetchData()
    setData(blogs)
  }
  
  useEffect(()=>{
    getData()
  
  },[])

  return (
    <div className="Main_body">
    <div className="blog_heading">
      <h1>Welcome To My Blogs</h1>
      <h4 onClick={scrolldown}>Scroll Down To See All Blogs 🔽</h4>
      </div>
    
    <div className="Blogs_section">
  
{
data && data.map((elem)=>{
return (
<div className="blog_card" key={elem.id}>
<div class="max-w-sm rounded overflow-hidden  bg-white">
<Link href={`/Blogs/${elem.id}`}><img src={elem.images[0]} height={"100%"} width={"100%"}/></Link>
<div class="px-6 py-4">
<Link href={`/Blogs/${elem.id}`}><div class="font-bold text-xl mb-2" style={{fontSize:"18px"}}>{elem.title}</div></Link>
  <p class="text-gray-700 text-base">{elem.desc}</p>
</div>
<div class="px-6 py-4">
  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-10">{elem.created}</span>
  <span className="inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2"><Link href={`/Blogs/${elem.id}`}>Read More.</Link></span>
  
  
 
</div>
</div>

</div>
) })
}
</div>


  </div>
  )
}

{/* <span className="inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2"><Link href={`/Blogs/${elem.id}`}>Read More.</Link></span> */}