import { useEffect } from "react"
import { useRouter } from "next/router"
import { IUser } from "@/helpers/interfaces"

export const useConfigureAccountNavGuard = (emailHandler?: (email: string) => void) => {
    const router = useRouter()
    useEffect(() => {
        const email = sessionStorage.getItem('newMember')
        fetch('/api/users').then(res => res.json()).then(data => {
            const user: IUser = data.find((user: IUser ) => user.email === email)
            const isAccountPaid = user?.isMembershipPaid
            email ? (isAccountPaid ? emailHandler && emailHandler(email) : router.push('/signup/planform')) : router.push('/')
        })
    }, [])
}