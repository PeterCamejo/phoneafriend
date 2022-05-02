import Head from 'next/head'
import Link from 'next/link'
import PostCard from '../components/post/PostCard'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Home() {

  const [data , setData] = useState("");

  useEffect(()=>{
    fetch('/api/posts').then((response) => response.json()).then((data)=> setData(data))
  }, [])
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'> 
     <Link href="/posts/new">
      <button className='p=3'>Create New Post</button>
     </Link> 
      
      <div className='container border-2 border-solid border-black'>
        {data ? data.data.map((thisData, index) => {
          return(
            <PostCard key={index} post={thisData} />
          )
        } ) : null}
      </div>
    </div>
  )
}
