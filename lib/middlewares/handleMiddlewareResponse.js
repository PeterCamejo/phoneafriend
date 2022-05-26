export default async function handleMiddlewareResponse(router, data){
                //failed isLoggedIn middleware
                if(data.notLoggedIn){
                    return router.push({    
                        pathname: `/users/login`,
                        query: {
                            flashError : 'Need to be logged in for that'
                        }
                    })
                }
                //failed is[Comment/Post]Author middleware
                if(data.notAuthor){
                    return router.push({    
                        pathname: '/',
                        query: {
                            flashError : 'You are not the author.'
                        }
                    })
                }

                //failed JOI validation
                if(data.failedValidation){
                    return router.push({
                        pathname:'/',
                        query:{
                            flashError: "Invalid form entries"
                        }
                    })
                }

                return;
}