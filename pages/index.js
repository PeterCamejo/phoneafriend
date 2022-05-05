import Head from 'next/head'
import Link from 'next/link'
import PostCard from '../components/post/PostCard'
import Flash from '../components/Flash'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Home(props) {

  const [flashSuccess , setFlashSuccess] = useState(props.flash);
  const [data , setData] = useState("");

  useEffect(()=>{
    fetch('/api/posts').then((response) => response.json()).then((data)=> setData(data))
  }, [])
  
  return (
    <div className='h-screen w-screen p-6 flex flex-col items-center justify-center'> 
      <div className='container h-1/3'>
          <h1>Phone A Friend</h1>
          <p>Thanks for checking up on this project&apos;s progress!</p>
          <p>Remember to check out the <a className='text-sky-400 underline' href="https://github.com/PeterCamejo/phoneafriend"> Github repo</a> to see what features I&apos;ve already implemented and the features I&apos;m currently working on.</p>
      </div>
      <div className='container h-2/3'>
          <div className="container  mb-3">
            <Flash error={false} body={flashSuccess} />
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
