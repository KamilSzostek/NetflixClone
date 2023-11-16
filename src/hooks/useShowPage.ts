import { useRouter } from "next/router"
import { Session } from "next-auth"
export const useShowPage = (token: Session | null) => {
    const router = useRouter()
    if(token)
        return true
    else {
        router.push('/')
    }
}