import {useEffect, useState} from 'react'

export const useLogInState = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem('newMember'))
            setLoggedIn(true)   
        else
            setLoggedIn(false)
    })
    return loggedIn
}