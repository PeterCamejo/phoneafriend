import { fetcherFn  } from "../../lib/hooks"
import useSWR from "swr";
import {useEffect, useState} from 'react'
import connectDB from "../../lib/mongodb";
import {getUserByUsername} from "../../controllers/users"
import PostCard from "../../components/post/PostCard";

const ViewProfile = (props) =>{

    const {data} = useSWR(`/api/users/${props.user._id}/posts`, fetcherFn);
    const [posts , setPosts] = useState(data ? data : "");

    
    useEffect(()=>{

      setPosts(data);
  
    },[data])

    return(
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="container flex flex-col justify-center items-center xl:mh-1/3 xl:w-1/3">
                <h4 className="mb-3">Username: {props.user.username}</h4>
                <h4 className="self-start text-xl mb-1">{props.user.username}'s posts: </h4>
                <div className='container border-2 rounded-md border-solid'>
                    {posts ? posts.posts.map((post,index) => {
                    return(
                        <PostCard key={index} post={post} />
                    )
                    } ) : null}
                </div>
            </div>
        </div>
    )
}

export default ViewProfile

export async function getServerSideProps(context) {
    await connectDB();

    const user = await getUserByUsername(context.params.username);


    // let flash = ""
    // let flashError = ""
  
    // if(context.query.flash){
    //   flash = context.query.flash
    // }
    // if(context.query.flashError){
    //     flashError = context.query.flashError
    // }
    return{
      props:{
             user: JSON.parse(JSON.stringify(user[0])),
        //   flash:flash,
        //   flashError: flashError
      }
    }
  }