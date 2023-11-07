import { getCookie } from "./cookies"
import { IProfile } from "./interfaces"
export async function getActiveUser(){
    try{
        const id = getCookie('ActiveUserId')?.substring(13)
        if(id){
            const res = await fetch('/api/users')
            const users = await res.json()
            const user = users.find((user: IProfile) => user._id === id)
            return user
        }
    }
    catch(err){
        console.log(err);
    }
}