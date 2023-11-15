import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Session } from "next-auth"
export const useShowPage = (token: Session | null) => {
    const router = useRouter()
    const [showPage, setShowPage] = useState(false)
    useEffect(() => {token ? setShowPage(true) : router.push('/')}, [])
    return showPage
}