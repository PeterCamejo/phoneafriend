import User from '../models/User'

export async function getUserById(id){
    const user = await User.findById(id);
    return user;
}