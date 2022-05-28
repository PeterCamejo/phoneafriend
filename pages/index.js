import PostCard from '../components/post/PostCard'
import Flash from '../components/flash/Flash'
import FlashError from '../components/flash/FlashError'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import useSWR from 'swr'
import { fetcherFn } from '../lib/hooks'
import connectDB from '../lib/mongodb'

export default function Home(props) {

  const [flashSuccess , setFlashSuccess] = useState(props.flash);
  const [flashError, setFlashError] = useState(props.flashError);
  const {data} = useSWR('/api/posts', fetcherFn);
  const [posts , setPosts] = useState(data ? data : "");

  useEffect(()=>{

    setPosts(data);

  },[data])
  
  return (
    <div className='h-screen w-screen p-6 flex flex-col items-center justify-center'> 
      <div className='container flex flex-col justify-center h-1/3'>
          <p>Thanks for checking up on this project&apos;s progress!</p>
          <p>Remember to check out the <a className='text-sky-400 underline' href="https://github.com/PeterCamejo/phoneafriend"> Github repo</a> to see what features I&apos;ve already implemented and the features I&apos;m currently working on.</p>

          <p className='mt-6 font-semibold text-lg'><span className="text-sky-400 underline"><Link href="/users/register">Register</Link></span> an account to play with the app!</p>
      </div>
      <div className='container h-2/3'>
          <div className="container  mb-3">
            {flashSuccess && <Flash body={flashSuccess} />}
            {flashError && <FlashError body={flashError}/>} 

          </div>
          
          <div className='container border-2 rounded-md border-solid'>
            {posts ? posts.data.map((post,index) => {
              return(
                <PostCard key={index} post={post} />
              )
            } ) : null}
          </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  await connectDB();

  console.log(context.req);

  let flash = ""
  let flashError = ""
  
  if(context.query.flash){
    flash = context.query.flash
  }
  if(context.query.flashError){
    flashError = context.query.flashError
  }
  return{
    props:{
        flash:flash,
        flashError: flashError
    }
  }
}
