 import {useRouter} from 'next/router'
 
 const LogOutBtn = () =>{

    const router = useRouter();

    const handleLogout = async (e) =>{
        e.preventDefault();

        let response = await fetch('/api/users/logout', {
            method: 'POST'
        })

        let data = await response.json();

        if(data){
           await router.replace({
                pathname: '/',
                query:{
                    flash: data.data
                }
            })

            return router.reload();
        }

        return;
    }

    return(
            <button onClick={handleLogout}>Logout</button>
     )
 }

 export default LogOutBtn