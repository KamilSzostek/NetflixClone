import { GetServerSidePropsContext } from "next"
import { encrypt } from "./dataEncryption"

export function setCookie(name: string, value: string, days: number, isSecure = false, secret?: string){
    const date = new Date()
    date.setTime(date.getTime() + (days*24*60*60*1000))
    const expires = `; expires= ${date.toUTCString()}`
    document.cookie = `${name}=${isSecure ? encrypt(value, secret!) : value}${expires}; path=/`
}

export function getCookie(name: string){
    if(document.cookie){
        const cookiesArr = document.cookie.split(';')
        const cookie = cookiesArr.find(cookie => cookie.substring(0, name.length) == name)
        return cookie;
    }
    else return null
}

export function getCookieOnServerSide(name: string, contextCookie: string){
        const cookiesArr = contextCookie?.split(';')
        const cookie = cookiesArr?.find(cook => cook.substring(0, name.length) == name)
        return cookie
}

export function eraseCookie(name: string) { 
    if(document){
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}