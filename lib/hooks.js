import useSWR from 'swr'

export const fetcherFn = (url) => fetch(url).then((r) => r.json());

export function useUser(){
    const {data , mutate} = useSWR('/api/user', fetcherFn)
    const loading = !data
    let user = data?.user;
    return [user, {mutate, loading}]

}