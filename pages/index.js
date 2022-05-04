import Head from 'next/head'
import Link from 'next/link'
import PostCard from '../components/post/PostCard'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Home(props) {

  const [flashSuccess , setFlashSuccess] = useState(props.flash);
  const [data , setData] = useState("");

  useEffect(()=>{
    fetch('/api/posts').then((response) => response.json()).then((data)=> setData(data))
  }, [])
  
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'> 

      <div className='container'>
        {flashSuccess ? 
          <div>{flashSuccess}</div> : null}
          <div className="container flex flex-row mb-3">
            <Link href="/posts/new">
              <button className='p-3 border-solid rounded-md border-2 border-black'>
                Create New Post
              </button>
            </Link> 
          </div>
          
          <div className='container border-2 rounded-md border-solid border-black'>
            {data ? data.data.map((thisData, index) => {
              return(
                <PostCard key={index} post={thisData} />
              )
            } ) : null}
          </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  let flash = ""

  if(context.query.flash){
    flash = context.query.flash
  }
  return{
    props:{
        flash:flash
    }
  }
}
